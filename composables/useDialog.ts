// composables/useDialog.ts
// Replaces native alert(), confirm(), prompt() with a themed modal dialog.
// Usage:
//   const { $alert, $confirm, $prompt } = useDialog()
//   await $alert('Something went wrong.')
//   const ok = await $confirm('Delete this item?')
//   const reason = await $prompt('Why?', { placeholder: 'Optional...' })

import { ref, shallowRef } from 'vue'

type DialogType = 'alert' | 'confirm' | 'prompt'

interface DialogState {
  open: boolean
  type: DialogType
  title: string
  message: string
  placeholder: string
  inputValue: string
  resolve: ((v: any) => void) | null
}

const state = ref<DialogState>({
  open: false,
  type: 'alert',
  title: '',
  message: '',
  placeholder: '',
  inputValue: '',
  resolve: null,
})

function openDialog(
  type: DialogType,
  message: string,
  opts: { title?: string; placeholder?: string } = {}
): Promise<any> {
  return new Promise((resolve) => {
    state.value = {
      open: true,
      type,
      title: opts.title ?? (type === 'alert' ? 'Notice' : type === 'confirm' ? 'Confirm' : 'Enter Details'),
      message,
      placeholder: opts.placeholder ?? '',
      inputValue: '',
      resolve,
    }
  })
}

function settle(value: any) {
  state.value.open = false
  const res = state.value.resolve
  state.value.resolve = null
  // slight delay so close animation can play before resolving
  setTimeout(() => res?.(value), 150)
}

export function useDialog() {
  const $alert = (message: string, opts?: { title?: string }) =>
    openDialog('alert', message, opts)

  const $confirm = (message: string, opts?: { title?: string }): Promise<boolean> =>
    openDialog('confirm', message, opts)

  const $prompt = (message: string, opts?: { title?: string; placeholder?: string }): Promise<string | null> =>
    openDialog('prompt', message, opts)

  return { $alert, $confirm, $prompt, _state: state, _settle: settle }
}
