import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? '').trim()
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()

if (!supabaseUrl) {
  console.error('VITE_SUPABASE_URL is missing. Create .env.local in the project root.')
  throw new Error('Supabase URL is required')
}
if (!supabaseAnonKey) {
  console.error('VITE_SUPABASE_ANON_KEY is missing. Create .env.local in the project root.')
  throw new Error('Supabase anon key is required')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
