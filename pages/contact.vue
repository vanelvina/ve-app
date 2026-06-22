<template>
  <div class="min-h-screen bg-warm-ivory text-charcoal font-sans selection:bg-rose-blush selection:text-deep-plum py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto space-y-12">
      
      <!-- Top header decorative badge -->
      <div class="text-center space-y-3">
        <span class="text-xs uppercase tracking-[0.25em] text-deep-plum font-bold font-ui">Atelier Support</span>
        <h1 class="text-3xl md:text-5xl font-serif font-bold text-deep-plum tracking-wide">Contact Us</h1>
        <div class="w-12 h-0.5 bg-deep-plum mx-auto"></div>
      </div>

      <!-- Main Card: Form + details grid -->
      <div class="bg-white rounded-3xl border border-rose-blush/30 shadow-premium p-6 md:p-10 space-y-10 relative overflow-hidden">
        <div class="absolute inset-0.5 rounded-[22px] border border-dashed border-rose-blush/20 pointer-events-none"></div>

        <!-- 1. SHARE FEEDBACK FORM -->
        <div class="relative z-10 space-y-6">
          <div class="space-y-2">
            <h2 class="text-lg md:text-xl font-serif font-bold text-deep-plum uppercase tracking-wider">Share Feedback</h2>
            <p class="text-xs md:text-sm text-charcoal/70 leading-relaxed">
              To share feedback and suggestions on how we could improve ourselves, write to us at 
              <a href="mailto:support@vanelvina.com" class="text-deep-plum font-bold hover:underline">support@vanelvina.com</a> 
              or fill the form below.
            </p>
          </div>

          <form @submit.prevent="submitFeedback" class="space-y-4 text-xs font-ui">
            <!-- Name -->
            <div class="space-y-1">
              <label class="block font-bold text-[10px] text-charcoal/50 uppercase tracking-wider">
                Your Name <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.name" 
                type="text" 
                placeholder="Your full name" 
                required
                class="w-full px-4 py-3 border border-charcoal/20 bg-warm-ivory/10 rounded-xl text-xs focus:outline-none focus:border-deep-plum focus:ring-1 focus:ring-deep-plum/20 transition-all placeholder:text-charcoal/40"
              />
            </div>

            <!-- Email & Phone Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="block font-bold text-[10px] text-charcoal/50 uppercase tracking-wider">
                  Your Email <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  placeholder="Your email id" 
                  required
                  class="w-full px-4 py-3 border border-charcoal/20 bg-warm-ivory/10 rounded-xl text-xs focus:outline-none focus:border-deep-plum focus:ring-1 focus:ring-deep-plum/20 transition-all placeholder:text-charcoal/40"
                />
              </div>
              <div class="space-y-1">
                <label class="block font-bold text-[10px] text-charcoal/50 uppercase tracking-wider">
                  Your Phone <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="form.phone" 
                  type="tel" 
                  placeholder="Your phone" 
                  required
                  class="w-full px-4 py-3 border border-charcoal/20 bg-warm-ivory/10 rounded-xl text-xs focus:outline-none focus:border-deep-plum focus:ring-1 focus:ring-deep-plum/20 transition-all placeholder:text-charcoal/40"
                />
              </div>
            </div>

            <!-- Query Type -->
            <div class="space-y-1">
              <label class="block font-bold text-[10px] text-charcoal/50 uppercase tracking-wider">
                Query Type <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select 
                  v-model="form.queryType" 
                  required
                  class="w-full px-4 py-3 border border-charcoal/20 bg-warm-ivory/10 rounded-xl text-xs focus:outline-none focus:border-deep-plum focus:ring-1 focus:ring-deep-plum/20 transition-all appearance-none cursor-pointer text-charcoal"
                >
                  <option value="" disabled>Select your query type</option>
                  <option value="Order Status">Order Status</option>
                  <option value="Return/Refund">Return / Refund</option>
                  <option value="Product Feedback">Product Feedback</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Collaboration">Collaboration</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-charcoal/40">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Message -->
            <div class="space-y-1">
              <label class="block font-bold text-[10px] text-charcoal/50 uppercase tracking-wider">
                Your Message <span class="text-red-500">*</span>
              </label>
              <textarea 
                v-model="form.message" 
                rows="5" 
                placeholder="Your message" 
                required
                class="w-full px-4 py-3 border border-charcoal/20 bg-warm-ivory/10 rounded-xl text-xs focus:outline-none focus:border-deep-plum focus:ring-1 focus:ring-deep-plum/20 transition-all placeholder:text-charcoal/40"
              ></textarea>
            </div>

            <p class="text-[10px] text-charcoal/45 font-medium">* Required Field</p>

            <div class="pt-2">
              <button 
                type="submit" 
                :disabled="submitting"
                class="w-full sm:w-auto px-8 py-3.5 bg-deep-plum hover:bg-deep-plum/95 text-white font-bold tracking-wider text-xs uppercase rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-premium disabled:opacity-50 disabled:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{{ submitting ? 'Sending...' : 'Send Feedback' }}</span>
                <svg v-if="!submitting" class="w-4 h-4 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div class="border-t border-rose-blush/20 my-6"></div>

        <!-- 2. CONTACT US DIRECT DETAILS -->
        <div class="relative z-10 space-y-6">
          <h2 class="text-lg md:text-xl font-serif font-bold text-deep-plum uppercase tracking-wider">Contact Us</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <!-- Time / Hours -->
            <div class="flex items-start gap-4 p-4 rounded-2xl hover:bg-warm-ivory/30 transition-colors group">
              <div class="w-10 h-10 rounded-full bg-rose-blush/25 text-deep-plum flex items-center justify-center shadow-soft shrink-0">
                <svg class="w-5 h-5 fill-none stroke-current" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="space-y-1">
                <h4 class="text-[10px] font-bold uppercase tracking-wider text-charcoal/40">Availability</h4>
                <p class="font-bold text-deep-plum text-sm">Monday to Sunday</p>
                <p class="text-xs text-charcoal/60">24 Hours / 7 Days a week</p>
              </div>
            </div>

            <!-- Phone Number -->
            <div class="flex items-start gap-4 p-4 rounded-2xl hover:bg-warm-ivory/30 transition-colors group">
              <div class="w-10 h-10 rounded-full bg-rose-blush/25 text-deep-plum flex items-center justify-center shadow-soft shrink-0">
                <svg class="w-5 h-5 fill-none stroke-current" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.188-4.166-7-7l1.293-.97c.363-.271.527-.834.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div class="space-y-1">
                <h4 class="text-[10px] font-bold uppercase tracking-wider text-charcoal/40">Phone Number</h4>
                <p class="font-bold text-deep-plum text-sm">+91 87885 66695</p>
                <p class="text-xs text-charcoal/60">Call or message anytime</p>
              </div>
            </div>

            <!-- Email Address -->
            <div class="flex items-start gap-4 p-4 rounded-2xl hover:bg-warm-ivory/30 transition-colors group">
              <div class="w-10 h-10 rounded-full bg-rose-blush/25 text-deep-plum flex items-center justify-center shadow-soft shrink-0">
                <svg class="w-5 h-5 fill-none stroke-current" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div class="space-y-1">
                <h4 class="text-[10px] font-bold uppercase tracking-wider text-charcoal/40">Email Support</h4>
                <p class="font-bold text-deep-plum text-sm">support@vanelvina.com</p>
                <p class="text-xs text-charcoal/60">Typical response under 1hr</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const uiStore = useUIStore()

// SEO Configuration
useHead({
  title: 'Contact Us — Van Elvina',
  meta: [
    { name: 'description', content: 'Get in touch with Van Elvina customer care. We are available 24*7 via phone +91 87885 66695 or email support@vanelvina.com.' }
  ]
})

const form = ref({
  name: '',
  email: '',
  phone: '',
  queryType: '',
  message: ''
})

const submitting = ref(false)

const submitFeedback = async () => {
  submitting.value = true
  try {
    const data = await $fetch<any>(`${config.public.apiBase}/inquiries`, {
      method: 'POST',
      body: form.value
    })
    
    if (data.success) {
      uiStore.addToast('success', 'Thank you! Your feedback has been received.')
      // Reset form
      form.value = {
        name: '',
        email: '',
        phone: '',
        queryType: '',
        message: ''
      }
    }
  } catch (error: any) {
    console.error('Feedback submit error:', error)
    uiStore.addToast('error', error.data?.message || 'Failed to submit feedback. Please try again.')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.shadow-premium {
  box-shadow: 0 20px 40px -15px rgba(138, 79, 90, 0.12);
}
.shadow-soft {
  box-shadow: 0 4px 14px -4px rgba(138, 79, 90, 0.05);
}
</style>
