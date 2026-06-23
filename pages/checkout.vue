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
              <div class="grid sm:grid-cols-2 gap-4">
                <AppInput v-model="form.fullName" label="Full Name" placeholder="Priya Sharma" required :error="errors.fullName" />
                <AppInput v-model="form.phone" label="Phone Number" type="tel" placeholder="9876543210" required :error="errors.phone" />
              </div>
              <AppInput v-model="form.email" label="Email Address" type="email" placeholder="priya@email.com" required :error="errors.email" />
              <AppInput v-model="form.line1" label="Address Line 1" placeholder="House No, Building, Street" required :error="errors.line1" />
              <AppInput v-model="form.line2" label="Address Line 2 (Optional)" placeholder="Landmark, Area" />
              <div class="grid sm:grid-cols-3 gap-4">
                <AppInput v-model="form.pincode" label="PIN Code" placeholder="400001" maxlength="6" required :error="errors.pincode" />
                <AppInput v-model="form.city" label="City" placeholder="Mumbai" required :error="errors.city" />
                <div>
                  <label class="block text-sm font-ui font-medium text-charcoal mb-1.5" for="state-select">State <span class="text-dusty-rose">*</span></label>
                  <select id="state-select" v-model="form.state" class="input-base" required aria-required="true">
                    <option value="">Select State</option>
                    <option v-for="state in indianStates" :key="state" :value="state">{{ state }}</option>
                  </select>
                </div>
              </div>
              <AppButton type="submit" size="lg" :full="true">Continue to Shipping</AppButton>
            </form>
          </div>

          <!-- Step 2: Shipping -->
          <div v-show="currentStep === 1" class="bg-white rounded-2xl shadow-soft border border-border-gray p-6">
            <h2 class="font-ui font-semibold text-charcoal text-base mb-5">Shipping Method</h2>
            <div class="space-y-3" role="radiogroup" aria-label="Shipping options">
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
            <div class="flex gap-3 mt-6">
              <AppButton variant="secondary" @click="currentStep = 0">Back</AppButton>
              <AppButton :full="true" size="lg" @click="currentStep = 2">Continue to Payment</AppButton>
            </div>
          </div>

          <!-- Step 3: Payment -->
          <div v-show="currentStep === 2" class="bg-white rounded-2xl shadow-soft border border-border-gray p-6">
            <h2 class="font-ui font-semibold text-charcoal text-base mb-5">Payment Method</h2>
            <div class="space-y-3" role="radiogroup" aria-label="Payment methods">
              <label
                v-for="method in paymentMethods"
                :key="method.id"
                class="flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all"
                :class="selectedPayment === method.id ? 'border-deep-plum bg-rose-blush/40' : 'border-border-gray hover:border-dusty-rose'"
              >
                <input type="radio" :value="method.id" v-model="selectedPayment" class="text-deep-plum" :aria-label="method.name" />
                <span class="text-lg" aria-hidden="true">{{ method.icon }}</span>
                <div>
                  <p class="text-sm font-ui font-semibold text-charcoal">{{ method.name }}</p>
                  <p class="text-xs text-mid-gray font-ui">{{ method.desc }}</p>
                </div>
              </label>
            </div>

            <!-- Card fields (conditionally shown) -->
            <div v-if="selectedPayment === 'card'" class="mt-4 space-y-3 p-4 bg-light-gray rounded-xl">
              <AppInput v-model="cardNumber" label="Card Number" placeholder="1234 5678 9012 3456" maxlength="19" />
              <div class="grid grid-cols-2 gap-3">
                <AppInput v-model="cardExpiry" label="Expiry" placeholder="MM/YY" maxlength="5" />
                <AppInput v-model="cardCvv" label="CVV" placeholder="123" maxlength="3" />
              </div>
            </div>

            <!-- Trust badges -->
            <div class="mt-4 flex flex-wrap gap-3 items-center">
              <div v-for="b in ['🔒 SSL Secured', '✅ PCI Compliant', '🏦 100% Safe']" :key="b" class="text-xs font-ui text-mid-gray flex items-center gap-1">{{ b }}</div>
            </div>

            <div class="flex gap-3 mt-6">
              <AppButton variant="secondary" @click="currentStep = 1">Back</AppButton>
              <AppButton :full="true" size="lg" :loading="placing" @click="placeOrder">Place Order – {{ formatPrice(orderTotal) }}</AppButton>
            </div>
          </div>
        </div>

        <!-- Order summary sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-soft border border-border-gray p-5 sticky top-24">
            <h2 class="font-ui font-semibold text-charcoal mb-4">Your Order</h2>
            <div class="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
              <div v-for="item in cart.items" :key="`${item.productId}-${item.size}`" class="flex gap-3">
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
                <span>Subtotal</span><span>{{ formatPrice(cart.subtotal) }}</span>
              </div>
              <div v-if="cart.appliedDiscount" class="flex justify-between text-green-600">
                <span>Discount</span><span>−{{ formatPrice(cart.appliedDiscount) }}</span>
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
import { formatPrice, isValidPincode, isValidPhone, isValidEmail } from '~/utils/formatters'

definePageMeta({ layout: 'checkout' })

const router = useRouter()
const cart = useCartStore()
const ui = useUIStore()
const auth = useAuthStore()

const currentStep = ref(0)
const steps = ['Address', 'Shipping', 'Payment']
const placing = ref(false)
const selectedShipping = ref('standard')
const selectedPayment = ref('upi')
const cardNumber = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')

const form = reactive({ fullName: '', phone: '', email: '', line1: '', line2: '', pincode: '', city: '', state: '' })
const errors = reactive({ fullName: '', phone: '', email: '', line1: '', pincode: '', city: '' })

const prefillForm = () => {
  if (auth.isLoggedIn && auth.user) {
    if (!form.fullName) form.fullName = auth.user.name || ''
    if (!form.email) form.email = auth.user.email || ''
  }
}

onMounted(() => {
  prefillForm()
})

watch(() => auth.isLoggedIn, () => {
  prefillForm()
})

const shippingOptions = [
  { id: 'standard', name: 'Standard Delivery', desc: '3–5 business days', price: cart.subtotal >= 999 ? 0 : 79 },
  { id: 'express', name: 'Express Delivery', desc: '1–2 business days (Metro cities)', price: 149 },
]

const paymentMethods = [
  { id: 'upi', icon: '💳', name: 'UPI', desc: 'Google Pay, PhonePe, Paytm, BHIM' },
  { id: 'card', icon: '🏦', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay, Amex' },
  { id: 'netbanking', icon: '🌐', name: 'Net Banking', desc: 'All major Indian banks' },
  { id: 'cod', icon: '💵', name: 'Cash on Delivery', desc: 'Available in select PIN codes' },
]

const shippingFee = computed(() => shippingOptions.find(o => o.id === selectedShipping.value)?.price ?? 0)
const orderTotal = computed(() => cart.subtotal - cart.appliedDiscount + shippingFee.value)

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

const nextStep = () => { if (validate()) currentStep.value = 1 }

const placeOrder = async () => {
  if (cart.items.length === 0) {
    ui.addToast('error', 'Your cart is empty.')
    return
  }
  placing.value = true
  try {
    const orderItems = cart.items.map(item => ({
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
      subtotal: cart.subtotal,
      shippingFee: shippingFee.value,
      discount: cart.appliedDiscount,
      total: orderTotal.value,
    }

    if (selectedPayment.value === 'cod') {
      const res = await auth.placeOrder(payload)
      if (res.success) {
        cart.clearCart()
        ui.addToast('success', 'Order placed successfully! 🎉')
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
              cart.clearCart()
              ui.addToast('success', 'Payment successful! Order placed! 🎉')
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
          contact: form.phone.trim()
        },
        theme: {
          color: "#8A4F5A" // deep-plum
        },
        modal: {
          ondismiss: function() {
            placing.value = false
            ui.addToast('error', 'Payment was cancelled')
          }
        }
      }

      // @ts-ignore
      const rzp1 = new window.Razorpay(options)
      rzp1.on('payment.failed', function (response: any) {
        placing.value = false
        ui.addToast('error', response.error?.description || 'Payment failed')
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
