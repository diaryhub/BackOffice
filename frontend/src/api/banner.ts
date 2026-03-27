import client from './client'

export interface Banner {
  id: number
  name: string
  startTime: string
  endTime: string
  cost: number
  imageUrl: string | null
}

export interface BannerRequest {
  name: string
  startTime: string
  endTime: string
  cost: number
  imageUrl: string | null
}

export const getBanners = () => client.get<Banner[]>('/api/banners').then(r => r.data)
export const createBanner = (data: BannerRequest) => client.post<Banner>('/api/banners', data).then(r => r.data)
export const updateBanner = (id: number, data: BannerRequest) => client.put<Banner>(`/api/banners/${id}`, data).then(r => r.data)
export const deleteBanner = (id: number) => client.delete(`/api/banners/${id}`)
