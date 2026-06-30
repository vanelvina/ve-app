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
                  <label
                    v-for="addr in auth.user.addresses"
                    :key="addr._id"
                    class="flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all"
                    :class="selectedAddressId === addr._id ? 'border-deep-plum bg-rose-blush/40' : 'border-border-gray hover:border-dusty-rose'"
                  >
                    <input type="radio" :value="addr._id" v-model="selectedAddressId" class="mt-1 text-deep-plum" />
                    <div>
                      <p class="text-sm font-ui font-semibold text-charcoal">{{ addr.fullName }}</p>
                      <p class="text-xs text-mid-gray font-ui">{{ addr.line1 }}<span v-if="addr.line2">, {{ addr.line2 }}</span></p>
                      <p class="text-xs text-mid-gray font-ui">{{ addr.city }}, {{ addr.state }} - {{ addr.pincode }}</p>
                      <p class="text-xs text-mid-gray font-ui mt-1">Phone: {{ addr.phone }}</p>
                    </div>
                  </label>
                </div>
                <button type="button" @click="showNewAddressForm = true" class="text-sm font-semibold text-deep-plum hover:underline">+ Add a new address</button>
                <AppButton type="button" :full="true" @click="proceedWithSavedAddress" class="mt-4">Continue to Confirmation</AppButton>
              </div>

              <!-- New Address Form -->
              <div v-else class="space-y-4">
                <button v-if="auth.user?.addresses && auth.user.addresses.length > 0" type="button" @click="showNewAddressForm = false" class="text-xs font-semibold text-charcoal/50 hover:text-deep-plum mb-2">← Back to saved addresses</button>
                <div class="grid sm:grid-cols-2 gap-4">
                  <AppInput v-model="form.fullName" label="Full Name" placeholder="Priya Sharma" required :error="errors.fullName" @blur="form.fullName = capitalizeWords(form.fullName)" />
                  <AppInput v-model="form.phone" label="Phone Number" type="tel" placeholder="9876543210" required :error="errors.phone" />
                </div>
                <AppInput v-model="form.email" label="Email Address" type="email" placeholder="priya@email.com" required :error="errors.email" />
                <AppInput v-model="form.line1" label="Address Line 1" placeholder="House No, Building, Street" required :error="errors.line1" @blur="form.line1 = capitalizeWords(form.line1)" />
                <AppInput v-model="form.line2" label="Address Line 2 (Optional)" placeholder="Landmark, Area" @blur="form.line2 = capitalizeWords(form.line2)" />
                <div class="grid sm:grid-cols-3 gap-4">
                  <AppInput v-model="form.pincode" label="PIN Code" placeholder="400001" maxlength="6" required :error="errors.pincode" />
                  <AppInput v-model="form.city" label="City" placeholder="Mumbai" required :error="errors.city" @blur="form.city = capitalizeWords(form.city)" />
                  <div>
                    <label class="block text-sm font-ui font-medium text-charcoal mb-1.5" for="state-select">State <span class="text-dusty-rose">*</span></label>
                    <select id="state-select" v-model="form.state" class="input-base" required aria-required="true">
                      <option value="">Select State</option>
                      <option v-for="state in indianStates" :key="state" :value="state">{{ state }}</option>
                    </select>
                  </div>
                </div>
                <AppButton type="submit" :full="true" :loading="savingAddress">Save & Continue</AppButton>
              </div>
            </form>
          </div>

          <!-- Step 2: Confirmation -->
          <div v-show="currentStep === 1" class="bg-white rounded-2xl shadow-soft border border-border-gray p-6 animate-slide-up">
            <h2 class="font-ui font-semibold text-charcoal text-base mb-5">Confirm Your Order</h2>
            
            <p class="text-sm font-ui text-charcoal/80 mb-6 leading-relaxed">
              Please take a moment to review your shipping details. When you're ready, click "Proceed to Payment" to securely complete your purchase via Razorpay. All payment methods including UPI, Cards, and Netbanking are supported.
            </p>

            <div class="bg-warm-ivory/50 rounded-xl p-4 border border-rose-blush/20 mb-6">
              <h3 class="text-xs font-bold text-deep-plum uppercase tracking-wider mb-2">Shipping To</h3>
              <p class="text-sm font-ui text-charcoal">{{ form.fullName }}</p>
              <p class="text-xs text-mid-gray font-ui mt-1">{{ form.line1 }}<span v-if="form.line2">, {{ form.line2 }}</span></p>
              <p class="text-xs text-mid-gray font-ui">{{ form.city }}, {{ form.state }} - {{ form.pincode }}</p>
              <p class="text-xs text-mid-gray font-ui mt-1">Phone: {{ form.phone }}</p>
            </div>

            <h3 class="text-sm font-ui font-semibold text-charcoal mb-3">Shipping Method</h3>
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

            <!-- Trust badges -->
            <div class="mt-4 flex flex-wrap gap-3 items-center">
              <div v-for="b in ['🔒 SSL Secured', '✅ PCI Compliant', '🏦 100% Safe']" :key="b" class="text-xs font-ui text-mid-gray flex items-center gap-1">{{ b }}</div>
            </div>

            <div class="flex gap-3 mt-6">
              <AppButton variant="secondary" @click="currentStep = 0">Back</AppButton>
              <AppButton :full="true" :loading="placing" @click="placeOrder">Proceed to Payment – {{ formatPrice(orderTotal) }}</AppButton>
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
                <span :class="shippingFee === 0 ? 'text-green-600' : ''">{{ shippingFee === 0 ? 'FREE' : formatPrice(shippingFee) }}</span>
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
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { formatPrice, isValidPincode, isValidPhone, isValidEmail, capitalizeWords } from '~/utils/formatters'

definePageMeta({ layout: 'checkout' })

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
const selectedShipping = ref('standard')
const selectedPayment = ref('razorpay')

const selectedAddressId = ref('')
const showNewAddressForm = ref(false)
const savingAddress = ref(false)

const form = reactive({ fullName: '', phone: '', email: '', line1: '', line2: '', pincode: '', city: '', state: '' })
const errors = reactive({ fullName: '', phone: '', email: '', line1: '', pincode: '', city: '' })

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
  auth.init()
  await cart.fetchCart()
  prefillForm()
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

const allFreeShippingProducts = computed(() => {
  return checkoutItems.value.length > 0 && checkoutItems.value.every((item: any) => item.product.isFreeShipping === true)
})

const shippingOptions = computed(() => [
  { 
    id: 'standard', 
    name: 'Standard Delivery', 
    desc: '3–5 business days', 
    price: (checkoutSubtotal.value >= 999 || allFreeShippingProducts.value) ? 0 : 79 
  },
  { 
    id: 'express', 
    name: 'Express Delivery', 
    desc: '1–2 business days (Metro cities)', 
    price: 149 
  },
])


const shippingFee = computed(() => shippingOptions.value.find(o => o.id === selectedShipping.value)?.price ?? 0)
const orderTotal = computed(() => checkoutSubtotal.value - checkoutDiscount.value + shippingFee.value)

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
      size: item.size || 'Standard'
    }))

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

    await $fetch('/api/orders/notify-abandoned', {
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
      image: item.product.variants[0]?.images[0] || '',
      size: item.size || 'Standard'
    }))

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
      subtotal: checkoutSubtotal.value,
      shippingFee: shippingFee.value,
      discount: checkoutDiscount.value,
      total: orderTotal.value,
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
          cart.clearCart()
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
          try {
            placing.value = true
            const verifyPayload = {
              ...payload,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
            const res = await auth.verifyPayment(verifyPayload)
            if (res.success) {
              if (!isBuyNow.value) {
                cart.clearCart()
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
