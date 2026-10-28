import { defineStore } from 'pinia'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: Array<{ product: string; type: string; similarity: number }>
  error?: boolean
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    isOpen: false,
    messages: [] as ChatMessage[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    toggle() {
      this.isOpen = !this.isOpen
    },

    async sendMessage(text: string) {
      const trimmed = text.trim()
      if (!trimmed || this.loading) return

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: trimmed,
      }
      this.messages.push(userMsg)
      this.loading = true
      this.error = null

      const config = useRuntimeConfig()
      // chatbotApiBase is set only in dev to hit local Express on port 5000.
      // In production it falls back to the standard apiBase (Supabase edge fn).
      const chatbotBase = (config.public.chatbotApiBase as string) || config.public.apiBase

      try {
        const data = await $fetch<{ answer: string; sources?: ChatMessage['sources'] }>(
          `${chatbotBase}/chatbot/message`,
          {
            method: 'POST',
            body: { message: trimmed },
          }
        )

        const assistantMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: data.answer || 'Sorry, I could not generate an answer.',
          sources: data.sources,
        }
        this.messages.push(assistantMsg)
      } catch (err: any) {
        const assistantErr: ChatMessage = {
          id: `e-${Date.now()}`,
          role: 'assistant',
          content:
            err?.data?.error ||
            'Sorry, the assistant is unavailable right now. Please try again.',
          error: true,
        }
        this.messages.push(assistantErr)
        this.error = assistantErr.content
      } finally {
        this.loading = false
      }
    },

    retryLast() {
      const lastErr = [...this.messages].reverse().find((m) => m.error)
      if (!lastErr) return
      const errIdx = this.messages.indexOf(lastErr)
      const userMsg = errIdx > 0 ? this.messages[errIdx - 1] : null
      if (userMsg?.role !== 'user') return
      const textToRetry = userMsg.content
      this.messages.splice(errIdx - 1, 2)
      this.sendMessage(textToRetry)
    },

    clearMessages() {
      this.messages = []
      this.error = null
    },
  },
})
