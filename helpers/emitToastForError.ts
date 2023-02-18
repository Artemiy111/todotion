import { useToast } from 'vue-toastification'
import { FetchError } from 'ofetch'

const toast = useToast()

export const emitToastForError = (error: unknown) => {
  if (error instanceof FetchError) toast.error(error.data.message)
  else if (error instanceof Error) toast.error(error.message)
  else if (typeof error === 'string') toast.error(error)
}
