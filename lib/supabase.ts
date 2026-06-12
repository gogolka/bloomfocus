import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client (anon key) — for reads protected by public RLS
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Lazy admin client — created on first use so it always reads current env vars.
// Falls back to anon key if service role key is missing.
let _admin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (_admin) return _admin

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  _admin = createClient(url, serviceKey || anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  return _admin
}

// Backwards-compatible proxy so existing `supabaseAdmin.from(...)` calls keep working
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseAdmin()
    const value = (client as any)[prop]
    return typeof value === 'function' ? value.bind(client) : value
  },
})
