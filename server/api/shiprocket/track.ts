/**
 * GET /api/shiprocket/track?awb=XXXXXXXXXX
 *
 * Server-side proxy for Shiprocket tracking.
 * Keeps credentials off the client. Returns a normalised tracking payload.
 */

const SHIPROCKET_BASE = 'https://apiv2.shiprocket.in/v1/external'

// Module-level token cache (same pattern as serviceability.ts)
let cachedToken: string | null = null
let tokenExpiresAt: number = 0

async function getToken(email: string, password: string): Promise<string | null> {
  const now = Date.now()
  if (cachedToken && now < tokenExpiresAt) return cachedToken

  const res = await $fetch<any>(`${SHIPROCKET_BASE}/auth/login`, {
    method: 'POST',
    body: { email, password },
  }).catch(() => null)

  if (!res?.token) return null

  cachedToken = res.token
  tokenExpiresAt = now + 9 * 24 * 60 * 60 * 1000
  return cachedToken
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const awb = String(query.awb || '').trim()

  if (!awb) {
    throw createError({ statusCode: 400, statusMessage: 'AWB code is required' })
  }

  const config = useRuntimeConfig()
  const email = config.shiprocketEmail
  const password = config.shiprocketPassword

  if (!email || !password) {
    // Credentials not configured — return a graceful empty state
    return {
      success: false,
      awb,
      events: [],
      message: 'Tracking not configured. Please contact support.',
    }
  }

  try {
    const token = await getToken(email, password)
    if (!token) {
      return { success: false, awb, events: [], message: 'Could not authenticate with shipping provider.' }
    }

    const data = await $fetch<any>(`${SHIPROCKET_BASE}/courier/track/shipment/${awb}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).catch((err: any) => {
      if (err?.status === 401) { cachedToken = null; tokenExpiresAt = 0 }
      return null
    })

    if (!data) {
      return { success: false, awb, events: [], message: 'Unable to fetch tracking information.' }
    }

    const trackingData = data?.tracking_data || {}
    const shipmentTrack = trackingData?.shipment_track?.[0] || {}
    const raw: any[] = trackingData?.track_activities || []

    const events = raw.map((e: any) => ({
      date: e.date || '',
      activity: e.activity || e.status || '',
      location: e.location || e.city || '',
      statusLabel: e['sr-status-label'] || e.status || '',
    }))

    return {
      success: true,
      awb,
      currentStatus: shipmentTrack.current_status || trackingData.shipment_status || '',
      courierName: shipmentTrack.courier_name || '',
      expectedDelivery: shipmentTrack.expected_delivery_date || shipmentTrack.etd || null,
      deliveredDate: shipmentTrack.delivered_date || null,
      originCity: shipmentTrack.origin || '',
      destinationCity: shipmentTrack.destination || '',
      events,
    }
  } catch (err: any) {
    console.error('[Track] error:', err?.message || err)
    return { success: false, awb, events: [], message: 'Tracking information temporarily unavailable.' }
  }
})
