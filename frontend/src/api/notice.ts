import client from './client'

export interface Notice {
  id: number
  title: string
  content: string
  createdAt: string
}

export interface NoticeRequest {
  title: string
  content: string
}

export const getNotices = () => client.get<Notice[]>('/api/notices').then(r => r.data)
export const getNotice = (id: number) => client.get<Notice>(`/api/notices/${id}`).then(r => r.data)
export const createNotice = (data: NoticeRequest) => client.post<Notice>('/api/notices', data).then(r => r.data)
export const updateNotice = (id: number, data: NoticeRequest) => client.put<Notice>(`/api/notices/${id}`, data).then(r => r.data)
export const deleteNotice = (id: number) => client.delete(`/api/notices/${id}`)
