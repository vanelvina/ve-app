/**
 * Server-side Shiprocket serviceability check.
 *
 * Keeps credentials and auth token completely off the client.
 * Token is cached in memory for up to 9 days (Shiprocket tokens live 10 days).
 *
 * GET /api/shiprocket/serviceability?pincode=<6-digit-delivery-pincode>
 */

const PICKUP_PINCODE = '431001'
const SHIPROCKET_BASE = 'https://apiv2.shiprocket.in/v1/external'

// In-memory token cache (survives process restarts via env but resets on cold starts)
let cachedToken: string | null = null
let tokenExpiresAt: number = 0 // Unix ms

async function getShiprocketToken(email: string, password: string): Promise<string> {
  const now = Date.now()
  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken
  }

  const res = await $fetch<{ token: string }>(`${SHIPROCKET_BASE}/auth/login`, {
    method: 'POST',
    body: { email, password },
  })

  if (!res?.token) throw new Error('Shiprocket auth failed — no token returned')

  cachedToken = res.token
  // Cache for 9 days (10-day expiry with 1-day buffer)
  tokenExpiresAt = now + 9 * 24 * 60 * 60 * 1000
  return cachedToken
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const deliveryPincode = String(query.pincode || '').trim()

  // Basic validation
  if (!deliveryPincode || !/^\d{6}$/.test(deliveryPincode)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid pincode' })
  }

  const config = useRuntimeConfig()
  const email = config.shiprocketEmail
  const password = config.shiprocketPassword

  if (!email || !password) {
    // Credentials not configured — return a graceful fallback
    return {
      serviceable: true,
      courier: null,
      etd: null,
      message: 'Delivery available. Exact estimate will be confirmed after order.',
    }
  }

  try {
    const token = await getShiprocketToken(email, password)

    const data = await $fetch<any>(
      `${SHIPROCKET_BASE}/courier/serviceability/`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
        query: {
          pickup_postcode: PICKUP_PINCODE,
          delivery_postcode: deliveryPincode,
          weight: 0.5,        // typical weight for innerwear in kg
          cod: 0,             // prepaid only
          declared_value: 500,
        },
      }
    )

    // Shiprocket returns available_courier_companies array sorted by ETD
    const couriers: any[] = data?.data?.available_courier_companies || []

    if (!couriers.length) {
      return {
        serviceable: false,
        courier: null,
        etd: null,
        message: 'Delivery not available at this pincode.',
      }
    }

    // Pick the fastest available courier
    const best = couriers[0]
    const courierName: string = best.courier_name || ''
    const etdRaw: string = best.etd || ''           // format: "2025-01-10 00:00:00"
    const minDays: number = best.min_etd || null
    const maxDays: number = best.max_etd || null

    // Build a human-friendly ETD string
    let etdDisplay: string | null = null
    if (minDays && maxDays) {
      etdDisplay = minDays === maxDays
        ? `${minDays} business day${minDays === 1 ? '' : 's'}`
        : `${minDays}–${maxDays} business days`
    } else if (etdRaw) {
      // Parse the date string and compute days from today
      const etdDate = new Date(etdRaw)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const diffMs = etdDate.getTime() - today.getTime()
      const diffDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
      etdDisplay = `${diffDays} business day${diffDays === 1 ? '' : 's'}`
    }

    return {
      serviceable: true,
      courier: courierName,
      etd: etdDisplay,
      message: null,
    }
  } catch (err: any) {
    // If Shiprocket is unreachable or returns an error, fail gracefully
    console.error('[Shiprocket] serviceability error:', err?.message || err)

    // If token was rejected (401) reset cache so next call re-authenticates
    if (err?.status === 401 || err?.statusCode === 401) {
      cachedToken = null
      tokenExpiresAt = 0
    }

    return {
      serviceable: true,
      courier: null,
      etd: null,
      message: 'Delivery available. Exact estimate will be confirmed after order.',
    }
  }
})
