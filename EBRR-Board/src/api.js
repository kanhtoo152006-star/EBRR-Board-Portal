const BASE = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const HEADERS = {
    apikey : KEY,
    Authorization : `Bearer ${KEY}`,
}

export const REST = `${BASE}/rest/v1`