import mongoose from 'mongoose'
import { Nitro } from 'nitropack'

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig()
  try {
    await mongoose.connect(config.MONGO_URI)
    console.log('mongo connected')
  } catch (e) {
    console.log('mongo could not connect', (e as Error).message)
  }
}
