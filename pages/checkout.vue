<template>
  <div class="bg-warm-ivory min-h-screen py-6">
    <div class="page-container max-w-5xl">

      <!-- Progress indicator -->
      <div class="mb-8">
        <div class="step-indicator justify-center">
          <div v-for="(step, idx) in steps" :key="step" class="flex items-center">
            <div class="flex flex-col items-center gap-1">
              <div class="step-dot" :class="getStepClass(idx)">
                <svg v-if="currentStep > idx" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span v-else>{{ idx + 1 }}</span>
              </div>
              <span class="text-[10px] font-ui text-mid-gray whitespace-nowrap">{{ step }}</span>
            </div>
            <div v-if="idx < steps.length - 1" class="step-line w-12 md:w-20 mx-2 mb-4" :class="currentStep > idx ? 'completed' : ''" />
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Form area -->
        <div class="lg:col-span-2 space-y-5">

          <!-- Step 1: Address -->
          <div v-show="currentStep === 0" class="bg-white rounded-2xl shadow-soft border border-border-gray p-6">
            <h2 class="font-ui font-semibold text-charcoal text-base mb-5">Delivery Address</h2>
            <form class="space-y-4" @submit.prevent="nextStep" novalidate aria-label="Delivery address form">
              
              <!-- Saved Addresses -->
              <div v-if="auth.user?.addresses && auth.user.addresses.length > 0 && !showNewAddressForm" class="space-y-4">
                <div class="space-y-3">
                  <div
                    v-for="addr in auth.user.addresses"
                    :key="addr._id"
                    class="rounded-xl border-2 transition-all overflow-hidden"
                    :class="selectedAddressId === addr._id ? 'border-deep-plum' : 'border-border-gray'"
                  >
                    <!-- Address row -->
                    <label
                      class="flex items-start gap-3 p-4 cursor-pointer"
                      :class="selectedAddressId === addr._id ? 'bg-rose-blush/40' : 'hover:border-dusty-rose'"
                    >
                      <input type="radio" :value="addr._id" v-model="selectedAddressId" class="mt-1 text-deep-plum" @change="cancelEdit" />
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-ui font-semibold text-charcoal">{{ addr.fullName }}</p>
                        <p class="text-xs text-mid-gray font-ui">{{ addr.line1 }}<span v-if="addr.line2">, {{ addr.line2 }}</span></p>
                        <p class="text-xs text-mid-gray font-ui">{{ addr.city }}, {{ addr.state }} - {{ addr.pincode }}</p>
                        <p class="text-xs text-mid-gray font-ui mt-1">Phone: {{ addr.phone }}</p>
                      </div>
                      <!-- Edit button -->
                      <button
                        type="button"
                        class="shrink-0 text-[11px] font-ui font-bold text-deep-plum hover:text-dusty-rose transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-rose-blush/30"
                        :aria-label="`Edit address for ${addr.fullName}`"
                        @click.prevent="startEditAddress(addr)"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit
                      </button>
                    </label>

                    <!-- Inline Edit Form (expands under the address row) -->
                    <Transition name="expand">
                      <div v-if="editingAddressId === addr._id" class="border-t border-rose-blush/30 bg-warm-ivory/60 p-4 space-y-3">
                        <p class="text-xs font-bold font-ui text-deep-plum uppercase tracking-wider mb-3">Edit Address</p>
                        <div class="grid sm:grid-cols-2 gap-3">
                          <AppInput v-model="editForm.fullName" label="Full Name" placeholder="Full name" required :error="editErrors.fullName" @input="editErrors.fullName = ''" />
                          <AppInput v-model="editForm.phone" label="Phone" type="tel" placeholder="10-digit mobile" required :error="editErrors.phone" @input="editErrors.phone = ''" />
                        </div>
                        <AppInput v-model="editForm.line1" label="Address Line 1" placeholder="House No, Building, Street" required :error="editErrors.line1" @input="editErrors.line1 = ''" />
                        <AppInput v-model="editForm.line2" label="Address Line 2 (Optional)" placeholder="Landmark, Area" />
                        <div class="grid sm:grid-cols-3 gap-3">
                          <AppInput
                            v-model="editForm.pincode"
                            label="PIN Code"
                            placeholder="6-digit PIN"
                            maxlength="6"
                            required
                            :error="editErrors.pincode"
                            :hint="editPincodeLoading ? 'Auto-detecting City & State...' : ''"
                            @input="editErrors.pincode = ''"
                          />
                          <AppInput
                            v-model="editForm.city"
                            label="City"
                            placeholder="Auto-filled from PIN Code"
                            required
                            :disabled="true"
                            :error="editErrors.city"
                          />
                          <AppInput
                            v-model="editForm.state"
                            label="State"
                            placeholder="Auto-filled from PIN Code"
                            required
                            :disabled="true"
                          />
                        </div>
                        <div class="flex gap-2 pt-1">
                          <AppButton type="button" size="sm" :loading="savingEdit" @click="saveEditAddress(addr._id)">Save Changes</AppButton>
                          <AppButton type="button" size="sm" variant="secondary" @click="cancelEdit">Cancel</AppButton>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
                <button type="button" @click="showNewAddressForm = true; cancelEdit()" class="text-sm font-semibold text-deep-plum hover:underline">+ Add a new address</button>
                <AppButton type="button" :full="true" @click="proceedWithSavedAddress" class="mt-4">Continue to Confirmation</AppButton>
              </div>

              <!-- New Address Form -->
              <div v-else class="space-y-4">
                <button v-if="auth.user?.addresses && auth.user.addresses.length > 0" type="button" @click="showNewAddressForm = false" class="text-xs font-semibold text-charcoal/50 hover:text-deep-plum mb-2">← Back to saved addresses</button>
                <div class="grid sm:grid-cols-2 gap-4">
                  <AppInput v-model="form.fullName" label="Full Name" placeholder="Enter full name" required :error="errors.fullName" @blur="form.fullName = capitalizeWords(form.fullName)" @input="errors.fullName = ''" />
                  <AppInput v-model="form.phone" label="Phone Number" type="tel" placeholder="10-digit mobile number" required :error="errors.phone" @input="errors.phone = ''" />
                </div>
                <AppInput v-model="form.email" label="Email Address" type="email" placeholder="Enter email address" required :error="errors.email" @input="errors.email = ''" />
                <AppInput v-model="form.line1" label="Address Line 1" placeholder="House No, Building, Street" required :error="errors.line1" @blur="form.line1 = capitalizeWords(form.line1)" @input="errors.line1 = ''" />
                <AppInput v-model="form.line2" label="Address Line 2 (Optional)" placeholder="Landmark, Area" @blur="form.line2 = capitalizeWords(form.line2)" />
                <div class="grid sm:grid-cols-3 gap-4">
                  <AppInput
                    v-model="form.pincode"
                    label="PIN Code"
                    placeholder="6-digit PIN code"
                    maxlength="6"
                    required
                    :error="errors.pincode"
                    :hint="pincodeLoading ? 'Auto-detecting City & State...' : ''"
                    @input="errors.pincode = ''"
                  />
                  <AppInput
                    v-model="form.city"
                    label="City"
                    placeholder="Auto-filled from PIN Code"
                    required
                    :disabled="true"
                    :error="errors.city"
                  />
                  <AppInput
                    v-model="form.state"
                    label="State"
                    placeholder="Auto-filled from PIN Code"
                    required
                    :disabled="true"
                  />
                </div>
                <AppButton type="submit" :full="true" :loading="savingAddress">Save & Continue</AppButton>
              </div>
            </form>
          </div>

          <!-- Step 2: Confirmation -->
          <div v-show="currentStep === 1" class="bg-white rounded-2xl shadow-soft border border-border-gray p-4 sm:p-6 animate-slide-up">
            <h2 class="font-ui font-semibold text-charcoal text-base mb-5">Confirm Your Order</h2>
            
            <p class="text-sm font-ui text-charcoal/80 mb-6 leading-relaxed">
              Please take a moment to review your shipping details. Choose a payment method and confirm your order.
            </p>

            <div class="bg-warm-ivory/50 rounded-xl p-4 border border-rose-blush/20 mb-6">
              <div class="flex items-start justify-between gap-2 mb-2">
                <h3 class="text-xs font-bold text-deep-plum uppercase tracking-wider">Shipping To</h3>
                <!-- Change address button: takes user back to Step 1 -->
                <button
                  type="button"
                  class="text-[11px] font-ui font-bold text-deep-plum hover:text-dusty-rose flex items-center gap-1 transition-colors"
                  @click="currentStep = 0"
                  aria-label="Change delivery address"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Change
                </button>
              </div>
              <p class="text-sm font-ui text-charcoal">{{ form.fullName }}</p>
              <p class="text-xs text-mid-gray font-ui mt-1">{{ form.line1 }}<span v-if="form.line2">, {{ form.line2 }}</span></p>
              <p class="text-xs text-mid-gray font-ui">{{ form.city }}, {{ form.state }} - {{ form.pincode }}</p>
              <p class="text-xs text-mid-gray font-ui mt-1">Phone: {{ form.phone }}</p>
            </div>

            <h3 class="text-sm font-ui font-semibold text-charcoal mb-3">Shipping Method</h3>

            <!-- Free shipping threshold callout -->
            <div v-if="amountNeededForFreeShipping > 0" class="p-3.5 bg-amber-50/90 border border-amber-200 rounded-xl text-xs font-ui text-amber-900 flex items-center justify-between gap-2 mb-4 shadow-xs">
              <div class="flex items-center gap-2">
                <span class="text-base">🚚</span>
                <span>Add <strong class="font-bold text-amber-950">{{ formatPrice(amountNeededForFreeShipping) }}</strong> more to unlock <strong>FREE Shipping</strong></span>
              </div>
              <NuxtLink to="/products" class="text-deep-plum font-bold hover:underline shrink-0 text-xs">Add Items +</NuxtLink>
            </div>

            <div class="space-y-3 mb-6" role="radiogroup" aria-label="Shipping options">

              <label
                v-for="option in shippingOptions"
                :key="option.id"
                class="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all"
                :class="selectedShipping === option.id ? 'border-deep-plum bg-rose-blush/40' : 'border-border-gray hover:border-dusty-rose'"
              >
                <div class="flex items-center gap-3">
                  <input type="radio" :value="option.id" v-model="selectedShipping" class="text-deep-plum" :aria-label="option.name" />
                  <div>
                    <p class="text-sm font-ui font-semibold text-charcoal">{{ option.name }}</p>
                    <p class="text-xs text-mid-gray font-ui">{{ option.desc }}</p>
                  </div>
                </div>
                <span class="text-sm font-ui font-semibold" :class="option.price === 0 ? 'text-green-600' : 'text-charcoal'">
                  {{ option.price === 0 ? 'FREE' : formatPrice(option.price) }}
                </span>
              </label>
            </div>

            <h3 class="text-sm font-ui font-semibold text-charcoal mb-3">Payment Method</h3>
            <div class="space-y-3 mb-4" role="radiogroup" aria-label="Payment methods">
              <label
                v-for="option in paymentOptions"
                :key="option.id"
                class="flex items-center justify-between p-4 rounded-xl border-2 transition-all"
                :class="option.disabled ? 'border-border-gray bg-gray-50 cursor-not-allowed opacity-60' : (selectedPayment === option.id ? 'border-deep-plum bg-rose-blush/40 cursor-pointer' : 'border-border-gray hover:border-dusty-rose cursor-pointer')"
              >
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    :value="option.id"
                    v-model="selectedPayment"
                    class="text-deep-plum"
                    :aria-label="option.name"
                    :disabled="option.disabled"
                  />
                  <div>
                    <p class="text-sm font-ui font-semibold text-charcoal">{{ option.name }}</p>
                    <p class="text-xs text-mid-gray font-ui">{{ option.desc }}</p>
                  </div>
                </div>
              </label>
            </div>

             <!-- Trust badges -->
            <div class="mt-4 flex flex-wrap gap-3 items-center">
              <div v-for="b in ['🔒 SSL Secured', '✅ PCI Compliant', '🏦 100% Safe']" :key="b" class="text-xs font-ui text-mid-gray flex items-center gap-1">{{ b }}</div>
            </div>

            <div class="flex flex-col-reverse sm:flex-row gap-3 mt-6">
              <AppButton variant="secondary" class="w-full sm:w-auto" @click="currentStep = 0">Back</AppButton>
              <AppButton :full="true" :loading="placing" @click="placeOrder" class="w-full sm:w-auto">
                {{ selectedPayment === 'cod' ? 'Confirm Order' : 'Proceed to Payment' }} – {{ formatPrice(orderTotal) }}
              </AppButton>
            </div>
          </div>
        </div>

        <!-- Order summary sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-soft border border-border-gray p-5 sticky top-24">
            <h2 class="font-ui font-semibold text-charcoal mb-4">Your Order</h2>
            <div class="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
              <div v-for="item in checkoutItems" :key="`${item.productId}-${item.size}`" class="flex gap-3">
                <img
                  :src="item.product.variants[0]?.images[0]"
                  :alt="item.product.name"
                  class="w-12 h-14 object-cover rounded-lg shrink-0"
                  width="48" height="56"
                />
                <div class="min-w-0">
                  <p class="text-xs font-ui font-medium text-charcoal line-clamp-2">{{ item.product.name }}</p>
                  <p class="text-[10px] text-mid-gray font-ui">{{ item.variantColor }} · {{ item.size }} · Qty {{ item.quantity }}</p>
                  <p class="text-xs font-semibold text-charcoal font-ui">{{ formatPrice(item.product.price * item.quantity) }}</p>
                </div>
              </div>
            </div>
            <div class="border-t border-border-gray mt-4 pt-4 space-y-2 text-sm font-ui">
              <div class="flex justify-between text-mid-gray">
                <span>Subtotal</span><span>{{ formatPrice(checkoutSubtotal) }}</span>
              </div>
              <div v-if="checkoutDiscount" class="flex justify-between text-green-600">
                <span>Discount</span><span>−{{ formatPrice(checkoutDiscount) }}</span>
              </div>
              <div class="flex justify-between text-mid-gray">
                <span>Shipping</span>
                <span :class="shippingFee === 0 ? 'text-green-600 font-semibold' : ''">{{ shippingFee === 0 ? 'FREE' : formatPrice(shippingFee) }}</span>
              </div>
              <p v-if="amountNeededForFreeShipping > 0" class="text-xs text-amber-700 font-ui font-medium">
                Add {{ formatPrice(amountNeededForFreeShipping) }} more for free shipping
              </p>
              <p v-else-if="checkoutSubtotal > 0" class="text-xs text-green-600 font-ui font-medium">
                🎉 You unlocked FREE Shipping!
              </p>
              <div v-if="cart.giftWrap" class="flex justify-between text-mid-gray">

                <span>Gift Wrapper</span>
                <span>{{ formatPrice(59) }}</span>
              </div>
              <div v-if="codHandlingFee > 0" class="flex justify-between text-amber-700">
                <span>COD Handling Fee</span>
                <span>{{ formatPrice(codHandlingFee) }}</span>
              </div>
              <div class="flex justify-between font-bold text-charcoal border-t pt-2">
                <span>Total</span><span>{{ formatPrice(orderTotal) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Payment Processing Overlay: blocks UI while verifying Razorpay payment -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="processingPayment" class="fixed inset-0 z-[300] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-6" role="status" aria-live="polite">
        <div class="w-16 h-16 rounded-full border-4 border-rose-blush border-t-deep-plum animate-spin" />
        <div class="text-center">
          <p class="font-serif text-xl text-deep-plum font-semibold">Processing your payment…</p>
          <p class="text-xs text-mid-gray font-ui mt-1">Please don't close this page.</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { formatPrice, isValidPincode, isValidPhone, isValidEmail, capitalizeWords } from '~/utils/formatters'

definePageMeta({ layout: 'checkout', middleware: ['auth-redirect'] })

const router = useRouter()
const cart = useCartStore()
const ui = useUIStore()
const auth = useAuthStore()
const route = useRoute()

const isBuyNow = computed(() => route.query.buyNow === 'true')
const buyNowItem = ref<any>(null)

const checkoutItems = computed(() => {
  if (isBuyNow.value && buyNowItem.value) return [buyNowItem.value]
  return cart.items
})

const checkoutSubtotal = computed(() => {
  return checkoutItems.value.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0)
})

const checkoutDiscount = computed(() => {
  if (isBuyNow.value) return 0
  return cart.appliedDiscount
})

const currentStep = ref(0)
const orderCompleted = ref(false) // set true when navigating to thank-you; prevents false abandon tracking
const steps = ['Address', 'Confirmation']
const placing = ref(false)
const processingPayment = ref(false) // shows full-screen overlay during Razorpay verify-payment
const selectedShipping = ref('standard')
const selectedPayment = ref('razorpay')

const selectedAddressId = ref('')
const showNewAddressForm = ref(false)
const savingAddress = ref(false)

const form = reactive({ fullName: '', phone: '', email: '', line1: '', line2: '', pincode: '', city: '', state: '' })
const errors = reactive({ fullName: '', phone: '', email: '', line1: '', pincode: '', city: '' })

// ── Pincode Lookup Auto-Fill ──────────────────────────────────────────────────
const { fetchPincodeDetails, loading: pincodeLoading } = usePincodeLookup()
const { fetchPincodeDetails: fetchEditPincodeDetails, loading: editPincodeLoading } = usePincodeLookup()

watch(() => form.pincode, async (newPin) => {
  const clean = newPin ? newPin.trim() : ''
  if (clean.length === 6) {
    const res = await fetchPincodeDetails(clean)
    if (res) {
      form.city = res.city
      form.state = res.state
      errors.pincode = ''
      errors.city = ''
    } else {
      errors.pincode = 'Invalid or unserviceable PIN code'
    }
  }
})

// ── Edit Address ─────────────────────────────────────────────────────────────
const editingAddressId = ref<string | null>(null)
const savingEdit = ref(false)
const editForm = reactive({ fullName: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '' })
const editErrors = reactive({ fullName: '', phone: '', line1: '', pincode: '', city: '' })

watch(() => editForm.pincode, async (newPin) => {
  const clean = newPin ? newPin.trim() : ''
  if (clean.length === 6) {
    const res = await fetchEditPincodeDetails(clean)
    if (res) {
      editForm.city = res.city
      editForm.state = res.state
      editErrors.pincode = ''
      editErrors.city = ''
    } else {
      editErrors.pincode = 'Invalid or unserviceable PIN code'
    }
  }
})

const startEditAddress = (addr: any) => {
  // Toggle: clicking Edit on the already-open one closes it
  if (editingAddressId.value === addr._id) {
    cancelEdit()
    return
  }
  editingAddressId.value = addr._id
  editForm.fullName = addr.fullName || ''
  editForm.phone = addr.phone || ''
  editForm.line1 = addr.line1 || ''
  editForm.line2 = addr.line2 || ''
  editForm.city = addr.city || ''
  editForm.state = addr.state || ''
  editForm.pincode = addr.pincode || ''
  // Clear previous errors
  Object.keys(editErrors).forEach(k => (editErrors as any)[k] = '')
}

const cancelEdit = () => {
  editingAddressId.value = null
}

const saveEditAddress = async (addressId: string) => {
  // Basic validation
  editErrors.fullName = editForm.fullName.trim() ? '' : 'Required'
  editErrors.phone = isValidPhone(editForm.phone) ? '' : 'Enter a valid 10-digit phone'
  editErrors.line1 = editForm.line1.trim() ? '' : 'Required'
  editErrors.pincode = isValidPincode(editForm.pincode) ? '' : 'Enter a valid PIN code'
  editErrors.city = editForm.city.trim() ? '' : 'Required'

  const hasErrors = Object.values(editErrors).some(v => v)
  if (hasErrors) return

  savingEdit.value = true
  try {
    await auth.updateAddress(addressId, {
      fullName: capitalizeWords(editForm.fullName.trim()),
      phone: editForm.phone.trim(),
      line1: capitalizeWords(editForm.line1.trim()),
      line2: capitalizeWords(editForm.line2.trim()),
      city: capitalizeWords(editForm.city.trim()),
      state: editForm.state,
      pincode: editForm.pincode.trim(),
    })
    ui.addToast('success', 'Address updated!')
    cancelEdit()
    // If the edited address is currently selected, refresh the form data too
    if (selectedAddressId.value === addressId) {
      proceedWithSavedAddress()
      currentStep.value = 0 // Stay on step 1 so they can review
    }
  } catch (err: any) {
    ui.addToast('error', 'Failed to update address. Please try again.')
  } finally {
    savingEdit.value = false
  }
}


const prefillForm = () => {
  if (auth.isLoggedIn && auth.user) {
    if (!form.fullName) form.fullName = auth.user.name || ''
    if (!form.email) form.email = auth.user.email || ''
    if (!form.phone) form.phone = auth.user.phone || ''
    
    if (auth.user.addresses && auth.user.addresses.length > 0) {
      const defaultAddr = auth.user.addresses.find(a => a.isDefault) || auth.user.addresses[0]
      selectedAddressId.value = defaultAddr._id
      showNewAddressForm.value = false
    } else {
      showNewAddressForm.value = true
    }
  }
}

onMounted(async () => {
  await cart.fetchCart()
  prefillForm()

  // Fast-track: if user already has a saved address pre-selected, skip step 1 automatically
  if (auth.isLoggedIn && auth.user?.addresses?.length && selectedAddressId.value) {
    proceedWithSavedAddress()
  }

  if (isBuyNow.value) {
    try {
      const stored = sessionStorage.getItem('ve_buy_now_item')
      if (stored) buyNowItem.value = JSON.parse(stored)
    } catch (e) {}
  }
  // Track that user has reached the checkout page
  const itemsCount = checkoutItems.value.length
  const total = orderTotal.value
  if (itemsCount > 0) {
    trackCheckoutStarted(itemsCount, total)
  }
})

// Track abandonment when user navigates away without completing the order
onBeforeRouteLeave(() => {
  if (!orderCompleted.value && checkoutItems.value.length > 0) {
    const stepName = currentStep.value === 0 ? 'address' : 'confirmation'
    trackCheckoutAbandoned(checkoutItems.value.length, orderTotal.value, stepName)
  }
})

watch(() => auth.isLoggedIn, () => {
  prefillForm()
})

const hasTestProduct = computed(() => {
  return checkoutItems.value.some((item: any) => item.product?.name?.toLowerCase().includes('test'))
})

const shippingOptions = computed(() => [
  {
    id: 'standard',
    name: 'Standard Delivery',
    desc: '3–5 business days',
    price: (checkoutSubtotal.value >= 499 || hasTestProduct.value) ? 0 : 40,
  },
  {
    id: 'express',
    name: 'Express Delivery',
    desc: '1–2 business days (Metro cities)',
    price: 149,
  },
])

const amountNeededForFreeShipping = computed(() => {
  if (hasTestProduct.value || checkoutSubtotal.value >= 499) return 0
  return 499 - checkoutSubtotal.value
})

const shippingFee = computed(() => shippingOptions.value.find(o => o.id === selectedShipping.value)?.price ?? 0)

const codHandlingFee = computed(() => selectedPayment.value === 'cod' ? 10 : 0)
const orderTotal = computed(() => checkoutSubtotal.value - checkoutDiscount.value + shippingFee.value + cart.giftWrapCost + codHandlingFee.value)

const codEligible = computed(() => {
  return orderTotal.value >= 299 && checkoutItems.value.every((item: any) => item.product?.isCodAvailable !== false)
})

watch(codEligible, (eligible) => {
  if (!eligible && selectedPayment.value === 'cod') {
    selectedPayment.value = 'razorpay'
  }
})

const paymentOptions = computed(() => [
  {
    id: 'cod',
    name: 'Cash on Delivery (COD)',
    desc: codEligible.value ? 'Pay in cash at delivery (+₹10 handling fee)' : 'COD available only for orders above ₹299',
    disabled: !codEligible.value,
  },
  {
    id: 'razorpay',
    name: 'Online Payment',
    desc: 'Cards, UPI, Netbanking, wallets',
    disabled: false,
  },
])

const getStepClass = (idx: number) => {
  if (currentStep.value > idx) return 'completed'
  if (currentStep.value === idx) return 'active'
  return 'pending'
}

const validate = () => {
  let ok = true
  errors.fullName = form.fullName.trim() ? '' : 'Full name is required'
  errors.phone = isValidPhone(form.phone) ? '' : 'Enter a valid 10-digit phone number'
  errors.email = isValidEmail(form.email) ? '' : 'Enter a valid email address'
  errors.line1 = form.line1.trim() ? '' : 'Address is required'
  errors.pincode = isValidPincode(form.pincode) ? '' : 'Enter a valid PIN code'
  errors.city = form.city.trim() ? '' : 'City is required'
  for (const v of Object.values(errors)) { if (v) { ok = false; break } }
  return ok
}

const proceedWithSavedAddress = () => {
  if (!selectedAddressId.value) {
    ui.addToast('error', 'Please select an address')
    return
  }
  const addr = auth.user?.addresses?.find(a => a._id === selectedAddressId.value)
  if (addr) {
    form.fullName = addr.fullName
    form.email = addr.email || auth.user?.email || ''
    form.phone = addr.phone
    form.line1 = addr.line1
    form.line2 = addr.line2 || ''
    form.city = addr.city
    form.state = addr.state
    form.pincode = addr.pincode
  }
  currentStep.value = 1
}

const nextStep = async () => { 
  form.fullName = capitalizeWords(form.fullName.trim())
  form.line1 = capitalizeWords(form.line1.trim())
  form.line2 = capitalizeWords(form.line2.trim())
  form.city = capitalizeWords(form.city.trim())

  if (validate()) {
    if (showNewAddressForm.value && auth.isLoggedIn) {
      try {
        savingAddress.value = true
        await auth.addAddress({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          line1: form.line1,
          line2: form.line2,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        })
        if (!auth.user?.phone) {
          await auth.updateProfile({ phone: form.phone })
        }
      } catch (err: any) {
        ui.addToast('error', 'Failed to save address. Proceeding anyway.')
      } finally {
        savingAddress.value = false
      }
    }
    currentStep.value = 1 
  }
}

const sendAbandonedNotification = async (reason: string) => {
  try {
    const orderItems = checkoutItems.value.map(item => ({
      productId: item.productId,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      variantColor: item.variantColor || '',
      color: item.variantColor || '',
      size: item.size || 'Standard',
      sku: (() => {
        const variant = item.product?.variants?.find((v: any) => v.color === item.variantColor)
        return variant?.skuPerSize?.[item.size] || variant?.sku || item.product?.sku || ''
      })()
    }))

    if (cart.giftWrap) {
      orderItems.push({
        productId: '00000000-0000-0000-0000-000000000000',
        name: 'Gift Wrapper',
        price: 59,
        quantity: 1,
        image: '/gift-wrap.png',
        variantColor: '',
        color: '',
        size: 'Standard',
        sku: 'GIFT-WRAP'
      })
    }

    const shippingAddress = {
      name: form.fullName.trim(),
      line1: form.line1.trim(),
      line2: form.line2.trim() || '',
      city: form.city.trim(),
      state: form.state,
      pincode: form.pincode.trim(),
      phone: form.phone.trim(),
    }

    const notificationPayload = {
      items: orderItems,
      shippingAddress,
      total: orderTotal.value,
      reason,
      guestInfo: !auth.isLoggedIn ? {
        name: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim()
      } : undefined
    }

    const config = useRuntimeConfig()
    await $fetch(`${config.public.apiBase}/orders/notify-abandoned`, {
      method: 'POST',
      body: notificationPayload,
      headers: auth.isLoggedIn ? {
        Authorization: `Bearer ${auth.token}`
      } : {}
    })
  } catch (err) {
    console.error('Failed to send abandoned notification:', err)
  }
}

const placeOrder = async () => {
  if (!auth.isLoggedIn) {
    ui.openAuthModal()
    return
  }
  if (checkoutItems.value.length === 0) {
    ui.addToast('error', 'Your order is empty.')
    return
  }
  placing.value = true
  try {
    const orderItems = checkoutItems.value.map((item: any) => ({
      productId: item.productId,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.variants?.find((v: any) => v.color === item.variantColor)?.images?.[0] || item.product.variants?.[0]?.images?.[0] || '',
      size: item.size || 'Standard',
      color: item.variantColor || '',
      variantColor: item.variantColor || '',
      isReturnable: item.product?.isReturnable !== false,
      sku: (() => {
        const variant = item.product?.variants?.find((v: any) => v.color === item.variantColor)
        return variant?.skuPerSize?.[item.size] || variant?.sku || item.product?.sku || ''
      })()
    }))

    if (cart.giftWrap) {
      orderItems.push({
        productId: '00000000-0000-0000-0000-000000000000',
        name: 'Gift Wrapper',
        price: 59,
        quantity: 1,
        image: '/gift-wrap.png',
        size: 'Standard',
        color: '',
        variantColor: '',
        sku: 'GIFT-WRAP'
      })
    }

    const shippingAddress = {
      name: form.fullName.trim(),
      line1: form.line1.trim(),
      line2: form.line2.trim() || '',
      city: form.city.trim(),
      state: form.state,
      pincode: form.pincode.trim(),
      phone: form.phone.trim(),
    }

    const payload = {
      items: orderItems,
      shippingAddress,
      paymentMethod: selectedPayment.value,
      shippingMethod: selectedShipping.value,
      subtotal: checkoutSubtotal.value + cart.giftWrapCost,
      shippingFee: shippingFee.value,
      discount: checkoutDiscount.value,
      total: orderTotal.value,
      couponCode: !isBuyNow.value ? (cart.couponCode || null) : null,
      guestInfo: !auth.isLoggedIn ? {
        name: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim()
      } : undefined
    }

    if (selectedPayment.value === 'cod') {
      const res = await auth.placeOrder(payload)
      if (res.success) {
        if (!isBuyNow.value) {
          await cart.clearCart()  // await so backend is empty before thank-you fetchCart runs
        } else {
          sessionStorage.removeItem('ve_buy_now_item')
        }
        ui.addToast('success', 'Order placed successfully! 🎉')
        orderCompleted.value = true
        router.push(`/thank-you?order=${res.orderId}`)
      } else {
        throw new Error(res.message || 'Failed to place order')
      }
      placing.value = false
    } else {
      // Razorpay Flow
      const config = useRuntimeConfig()
      const rzpOrder = await auth.createRazorpayOrder(orderTotal.value)

      const options = {
        key: config.public.razorpayKeyId,
        amount: Math.round(orderTotal.value * 100),
        currency: "INR",
        name: "Van Elvina",
        description: "Order Payment",
        order_id: rzpOrder.id,
        handler: async function (response: any) {
          // Show blocking overlay immediately on payment success to prevent navigating away
          processingPayment.value = true
          placing.value = true
          try {
            const verifyPayload = {
              ...payload,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
            const res = await auth.verifyPayment(verifyPayload)
            if (res.success) {
              if (!isBuyNow.value) {
                await cart.clearCart()  // await so backend is empty before thank-you fetchCart runs
              } else {
                sessionStorage.removeItem('ve_buy_now_item')
              }
              ui.addToast('success', 'Payment successful! Order placed! 🎉')
              orderCompleted.value = true
              router.push(`/thank-you?order=${res.orderId}`)
            } else {
              throw new Error(res.message || 'Payment verification failed')
            }
          } catch (err: any) {
            console.error('Verify payment error:', err)
            ui.addToast('error', err.data?.message || err.message || 'Payment verification failed')
          } finally {
            processingPayment.value = false
            placing.value = false
          }
        },
        prefill: {
          name: form.fullName.trim(),
          email: form.email.trim() || '',
          contact: (() => {
            const clean = form.phone.replace(/\D/g, '')
            return clean.length === 10 ? '91' + clean : clean
          })()
        },
        theme: {
          color: "#2A1B18" // Deep Cocoa
        },
        modal: {
          ondismiss: function() {
            placing.value = false
            ui.addToast('error', 'Payment was cancelled')
            sendAbandonedNotification('Payment modal dismissed/cancelled by user')
          }
        }
      }

      // @ts-ignore
      const rzp1 = new window.Razorpay(options)
      rzp1.on('payment.failed', function (response: any) {
        placing.value = false
        ui.addToast('error', response.error?.description || 'Payment failed')
        sendAbandonedNotification(`Payment failed: ${response.error?.description || 'Unknown reason'}`)
      })
      rzp1.open()
    }
  } catch (err: any) {
    console.error('Checkout error:', err)
    ui.addToast('error', err.data?.message || err.message || 'Failed to place order. Please try again.')
    placing.value = false
  }
}

const indianStates = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu & Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal']

useSeoMeta({ title: 'Checkout – Van Elvina', description: 'Secure checkout for Van Elvina innerwear. Multiple payment options available.' })
</script>

<style scoped>
/* Expand / collapse transition for the inline edit address form */
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.28s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.22s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 600px;
  opacity: 1;
}
</style>
