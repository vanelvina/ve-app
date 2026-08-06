import { defineEventHandler, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const pincode = getRouterParam(event, 'pincode')?.trim()

  if (!pincode || !/^[1-9][0-9]{5}$/.test(pincode)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid pincode format. Must be a 6-digit Indian PIN code.',
    })
  }

  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
      headers: {
        'User-Agent': 'VanElvina-App/1.0',
      },
    })

    if (!res.ok) {
      return { success: false, message: 'Pincode lookup service unavailable' }
    }

    const data = await res.json()

    if (Array.isArray(data) && data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
      const po = data[0].PostOffice[0]
      const city = po.District || po.Block || po.Name || ''
      const state = po.State || ''

      return {
        success: true,
        city: city.trim(),
        state: state.trim(),
        pincode,
      }
    }

    return {
      success: false,
      message: 'Pincode not found. Please verify your 6-digit PIN code.',
    }
  } catch (err: any) {
    return {
      success: false,
      message: 'Failed to fetch pincode details.',
    }
  }
})
