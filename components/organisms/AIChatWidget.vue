<template>
  <!-- Teleport to body so z-index stacking context is clean -->
  <Teleport to="body">

    <!-- ── Floating trigger button ─────────────────────────────── -->
    <Transition name="chat-btn">
      <button
        v-if="!chat.isOpen"
        id="ai-chat-trigger"
        class="chat-fab"
        aria-label="Open Van Elvina AI Shopping Assistant"
        @click="openChat"
      >
        <!-- Sparkle / AI icon -->
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z"
            fill="currentColor"
          />
          <path
            d="M5 17L5.55 19.5L8 20L5.55 20.5L5 23L4.45 20.5L2 20L4.45 19.5L5 17Z"
            fill="currentColor"
            opacity="0.7"
          />
          <path
            d="M19 2L19.55 4.5L22 5L19.55 5.5L19 8L18.45 5.5L16 5L18.45 4.5L19 2Z"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
        <span class="chat-fab-label">Ask AI</span>
      </button>
    </Transition>

    <!-- ── Chat panel ──────────────────────────────────────────── -->
    <Transition name="chat-panel">
      <div
        v-if="chat.isOpen"
        id="ai-chat-panel"
        class="chat-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Van Elvina AI Shopping Assistant"
      >
        <!-- Header -->
        <div class="chat-header">
          <div class="flex items-center gap-2.5">
            <div class="chat-header-icon">
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h2 class="text-sm font-ui font-semibold text-white leading-tight">Van Elvina Assistant</h2>
              <p class="text-[10px] text-white/60 font-ui">AI-powered shopping help</p>
            </div>
          </div>
          <button
            class="w-7 h-7 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close AI chat"
            @click="chat.close()"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Message list -->
        <div
          ref="messageListRef"
          class="chat-messages scrollbar-hide"
          aria-live="polite"
          aria-relevant="additions"
        >
          <!-- Welcome state (no messages yet) -->
          <div v-if="chat.messages.length === 0" class="chat-welcome">
            <div class="chat-welcome-icon">
              <svg class="w-7 h-7 text-dusty-rose" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="currentColor" />
                <path d="M5 17L5.55 19.5L8 20L5.55 20.5L5 23L4.45 20.5L2 20L4.45 19.5L5 17Z" fill="currentColor" opacity="0.5" />
              </svg>
            </div>
            <p class="text-sm font-ui font-medium text-deep-plum mt-2">Hi there! 👋</p>
            <p class="text-xs text-charcoal/60 font-ui mt-1 leading-relaxed">
              I'm your Van Elvina shopping assistant. Ask me anything about our products, fabrics, sizing, or care instructions.
            </p>

            <!-- Suggested questions -->
            <div class="chat-suggestions">
              <p class="text-[10px] font-ui font-semibold text-charcoal/40 uppercase tracking-wider mb-2">Try asking</p>
              <div class="flex flex-col gap-1.5">
                <button
                  v-for="q in SUGGESTED_QUESTIONS"
                  :key="q"
                  class="chat-suggestion-chip"
                  @click="sendSuggestion(q)"
                >{{ q }}</button>
              </div>
            </div>
          </div>

          <!-- Conversation messages -->
          <template v-else>
            <div
              v-for="msg in chat.messages"
              :key="msg.id"
              class="chat-msg-row"
              :class="msg.role === 'user' ? 'chat-msg-row--user' : 'chat-msg-row--assistant'"
            >
              <!-- Assistant avatar -->
              <div v-if="msg.role === 'assistant'" class="chat-msg-avatar" aria-hidden="true">
                <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" />
                </svg>
              </div>

              <!-- Bubble -->
              <div
                class="chat-bubble"
                :class="{
                  'chat-bubble--user': msg.role === 'user',
                  'chat-bubble--assistant': msg.role === 'assistant' && !msg.error,
                  'chat-bubble--error': msg.error,
                }"
              >
                <!-- Text — rendered as plain text, never innerHTML -->
                <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ msg.content }}</p>

                <!-- Error retry -->
                <button
                  v-if="msg.error"
                  class="mt-2 text-xs font-ui font-semibold text-dusty-rose underline hover:text-deep-plum transition-colors"
                  @click="chat.retryLast()"
                >Try again →</button>
              </div>
            </div>

            <!-- Typing indicator -->
            <div v-if="chat.loading" class="chat-msg-row chat-msg-row--assistant">
              <div class="chat-msg-avatar" aria-hidden="true">
                <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" />
                </svg>
              </div>
              <div class="chat-bubble chat-bubble--assistant">
                <span class="sr-only">Assistant is thinking</span>
                <div class="flex gap-1 items-center py-0.5" aria-hidden="true">
                  <span class="typing-dot" style="animation-delay: 0ms" />
                  <span class="typing-dot" style="animation-delay: 150ms" />
                  <span class="typing-dot" style="animation-delay: 300ms" />
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Input area -->
        <div class="chat-input-area">
          <div class="chat-input-wrapper">
            <textarea
              ref="inputRef"
              v-model="inputText"
              class="chat-textarea"
              placeholder="Ask about products, fabric, sizing…"
              rows="1"
              maxlength="1000"
              :disabled="chat.loading"
              aria-label="Message the Van Elvina assistant"
              @keydown.enter.exact.prevent="handleEnter"
              @keydown.enter.shift.exact="() => {}"
              @input="autoResize"
            />
            <button
              class="chat-send-btn"
              :disabled="!inputText.trim() || chat.loading"
              aria-label="Send message"
              @click="handleSend"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p class="text-[10px] text-charcoal/30 font-ui text-center mt-1.5">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </Transition>

  </Teleport>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'

const SUGGESTED_QUESTIONS = [
  'What is the best bra for everyday wear?',
  'Which fabric is this product made from?',
  'What sizes are available?',
  'What are the wash care instructions?',
  'Can you help me find a suitable product?',
]

const chat = useChatStore()
const inputRef = ref<HTMLTextAreaElement | null>(null)
const messageListRef = ref<HTMLDivElement | null>(null)
const inputText = ref('')

function openChat() {
  chat.open()
  nextTick(() => {
    inputRef.value?.focus()
  })
}

async function handleSend() {
  const text = inputText.value.trim()
  if (!text || chat.loading) return
  inputText.value = ''
  await nextTick()
  if (inputRef.value) {
    inputRef.value.style.height = 'auto'
  }
  await chat.sendMessage(text)
}

function handleEnter() {
  handleSend()
}

function sendSuggestion(question: string) {
  inputText.value = question
  handleSend()
}

function autoResize(e: Event) {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 96) + 'px'
}

// Auto-scroll to bottom whenever messages change
watch(
  () => chat.messages.length,
  async () => {
    await nextTick()
    if (messageListRef.value) {
      messageListRef.value.scrollTop = messageListRef.value.scrollHeight
    }
  }
)

// Focus input when panel opens
watch(
  () => chat.isOpen,
  async (open) => {
    if (open) {
      await nextTick()
      inputRef.value?.focus()
    }
  }
)
</script>

<style scoped>
/* ── Floating Action Button ──────────────────────────────── */
.chat-fab {
  position: fixed;
  bottom: 5rem; /* above mobile bottom bar */
  right: 1.25rem;
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 1rem 0.625rem 0.75rem;
  background-color: #2A1B18;
  color: #fff;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(42, 27, 24, 0.25);
  transition: background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;
  -webkit-tap-highlight-color: transparent;
}
.chat-fab:hover {
  background-color: #3d2620;
  box-shadow: 0 6px 20px rgba(42, 27, 24, 0.35);
}
.chat-fab:active {
  transform: scale(0.96);
}
.chat-fab:focus-visible {
  outline: 2px solid #CBA39E;
  outline-offset: 3px;
}
.chat-fab-label {
  font-family: "Publica Sans Regular", system-ui, sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}
@media (min-width: 768px) {
  .chat-fab {
    bottom: 1.75rem;
  }
}

/* ── Chat Panel ──────────────────────────────────────────── */
.chat-panel {
  position: fixed;
  bottom: 5.5rem;
  right: 1rem;
  z-index: 60;
  width: calc(100vw - 2rem);
  max-width: 22rem;
  height: 70dvh;
  max-height: 560px;
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 20px 60px rgba(42, 27, 24, 0.18), 0 4px 16px rgba(42, 27, 24, 0.10);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(203, 163, 158, 0.2);
}
@media (min-width: 768px) {
  .chat-panel {
    bottom: 1.75rem;
    right: 1.5rem;
    max-width: 24rem;
    height: 600px;
    max-height: 80vh;
  }
}

/* ── Header ─────────────────────────────────────────────── */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  background: linear-gradient(135deg, #2A1B18 0%, #3d2620 100%);
  flex-shrink: 0;
}
.chat-header-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ── Message list ────────────────────────────────────────── */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Welcome state */
.chat-welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.5rem 0.25rem;
}
.chat-welcome-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #FAF3E8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chat-suggestions {
  width: 100%;
  margin-top: 1.25rem;
  text-align: left;
}
.chat-suggestion-chip {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  background: #FCFAF7;
  border: 1px solid #E8E8E8;
  border-radius: 0.75rem;
  font-family: "Publica Sans Regular", system-ui, sans-serif;
  font-size: 0.75rem;
  color: #2C2523;
  text-align: left;
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease;
  -webkit-tap-highlight-color: transparent;
}
.chat-suggestion-chip:hover {
  background: #FAF3E8;
  border-color: #CBA39E;
}

/* Message rows */
.chat-msg-row {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}
.chat-msg-row--user {
  flex-direction: row-reverse;
}
.chat-msg-avatar {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: #2A1B18;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Bubbles */
.chat-bubble {
  padding: 0.625rem 0.875rem;
  border-radius: 1rem;
  max-width: 80%;
  font-family: "Publica Sans Regular", system-ui, sans-serif;
}
.chat-bubble--user {
  background: #2A1B18;
  color: #fff;
  border-bottom-right-radius: 0.25rem;
}
.chat-bubble--assistant {
  background: #FAF3E8;
  color: #2C2523;
  border-bottom-left-radius: 0.25rem;
}
.chat-bubble--error {
  background: #FEF2F2;
  color: #991B1B;
  border: 1px solid #FECACA;
  border-bottom-left-radius: 0.25rem;
}

/* Typing dots */
.typing-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #CBA39E;
  animation: typingBounce 1s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .typing-dot { animation: none; opacity: 0.6; }
}
@keyframes typingBounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
  40%           { transform: translateY(-5px); opacity: 1; }
}

/* ── Input area ──────────────────────────────────────────── */
.chat-input-area {
  padding: 0.75rem 0.875rem 0.875rem;
  border-top: 1px solid #F0EBE8;
  flex-shrink: 0;
  background: #fff;
}
.chat-input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  background: #FCFAF7;
  border: 1px solid #E8E8E8;
  border-radius: 0.875rem;
  padding: 0.5rem 0.5rem 0.5rem 0.875rem;
  transition: border-color 150ms ease;
}
.chat-input-wrapper:focus-within {
  border-color: #CBA39E;
}
.chat-textarea {
  flex: 1;
  resize: none;
  border: none;
  background: transparent;
  font-family: "Publica Sans Regular", system-ui, sans-serif;
  font-size: 0.875rem;
  color: #2C2523;
  line-height: 1.5;
  outline: none;
  max-height: 6rem;
  overflow-y: auto;
}
.chat-textarea::placeholder {
  color: #9E9E9E;
}
.chat-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.chat-send-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #2A1B18;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 150ms ease, opacity 150ms ease, transform 150ms ease;
  -webkit-tap-highlight-color: transparent;
}
.chat-send-btn:hover:not(:disabled) {
  background: #3d2620;
}
.chat-send-btn:active:not(:disabled) {
  transform: scale(0.92);
}
.chat-send-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.chat-send-btn:focus-visible {
  outline: 2px solid #CBA39E;
  outline-offset: 2px;
}

/* ── Transitions ─────────────────────────────────────────── */
.chat-btn-enter-active,
.chat-btn-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.chat-btn-enter-from,
.chat-btn-leave-to {
  opacity: 0;
  transform: scale(0.85) translateY(8px);
}

.chat-panel-enter-active {
  transition: opacity 250ms ease, transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
}
.chat-panel-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}
.chat-panel-enter-from,
.chat-panel-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}
</style>
