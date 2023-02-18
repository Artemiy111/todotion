import { useToast } from 'vue-toastification'
import { FetchError } from 'ofetch'

const toast = useToast()

const hasMessage = (error: unknown): error is { message: string } => {
  return (
    error !== null &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

export const emitToastForError = (error: unknown) => {
  if (error instanceof FetchError && typeof error.data?.message === 'string')
    toast.error(error.data.message)
  else if (hasMessage(error)) toast.error(error.message)
  else if (typeof error === 'string') toast.error(error)
}
