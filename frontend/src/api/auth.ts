import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8081'

export const login = async (username: string, password: string): Promise<string> => {
  const res = await axios.post<{ token: string }>(`${BASE}/api/auth/login`, { username, password })
  return res.data.token
}
