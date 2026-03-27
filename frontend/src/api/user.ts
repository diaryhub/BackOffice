import client from './client'

export interface User {
  id: number
  nickname: string
  email: string
  currency: number
  createdAt: string
}

export const getUsers = () => client.get<User[]>('/api/users').then(r => r.data)
export const grantCurrency = (id: number, amount: number) =>
  client.post<User>(`/api/users/${id}/currency/grant`, { amount }).then(r => r.data)
export const revokeCurrency = (id: number, amount: number) =>
  client.post<User>(`/api/users/${id}/currency/revoke`, { amount }).then(r => r.data)
