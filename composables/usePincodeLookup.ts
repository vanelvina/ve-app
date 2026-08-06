import { ref } from 'vue'

export const indianStatesList = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jammu & Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

export function normalizeStateName(rawState: string): string {
  if (!rawState) return ''
  const clean = rawState.trim().toLowerCase()

  // Common aliases / variations
  if (clean.includes('delhi')) return 'Delhi'
  if (clean.includes('jammu')) return 'Jammu & Kashmir'
  if (clean.includes('pondicherry') || clean.includes('puducherry')) return 'Tamil Nadu'
  if (clean.includes('orissa')) return 'Odisha'

  const found = indianStatesList.find(
    (s) => s.toLowerCase() === clean || clean.includes(s.toLowerCase()) || s.toLowerCase().includes(clean)
  )

  return found || rawState
}

export function usePincodeLookup() {
  const loading = ref(false)
  const error = ref('')

  async function fetchPincodeDetails(pincode: string) {
    const cleanPin = pincode.trim()
    if (!/^[1-9][0-9]{5}$/.test(cleanPin)) {
      error.value = ''
      return null
    }

    loading.value = true
    error.value = ''

    try {
      const res = await $fetch<{ success: boolean; city?: string; state?: string; message?: string }>(
        `/api/pincode/${cleanPin}`,
        { silent: true } as any
      )

      if (res.success && res.city && res.state) {
        const state = normalizeStateName(res.state)
        return {
          city: res.city,
          state,
        }
      } else {
        error.value = res.message || 'Invalid PIN code'
        return null
      }
    } catch (err: any) {
      error.value = 'Failed to lookup PIN code'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchPincodeDetails,
  }
}
