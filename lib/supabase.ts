import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client (anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// "Admin" client. The sb_secret_ service key currently returns "Invalid API key",
// so we use the anon key. RLS policies on `orders` explicitly allow the operations
// the API routes need (insert/update/select), so anon is sufficient and valid.
let _admin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (_admin) return _admin
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  _admin = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  return _admin
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseAdmin()
    const value = (client as any)[prop]
    return typeof value === 'function' ? value.bind(client) : value
  },
})
