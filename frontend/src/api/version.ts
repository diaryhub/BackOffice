import client from './client'

export interface GameVersion {
  id: number
  version: string
  patchNote: string
  releaseDate: string
}

export interface VersionRequest {
  version: string
  patchNote: string
  releaseDate: string
}

export const getVersions = () => client.get<GameVersion[]>('/api/versions').then(r => r.data)
export const createVersion = (data: VersionRequest) => client.post<GameVersion>('/api/versions', data).then(r => r.data)
export const updateVersion = (id: number, data: VersionRequest) => client.put<GameVersion>(`/api/versions/${id}`, data).then(r => r.data)
export const deleteVersion = (id: number) => client.delete(`/api/versions/${id}`)
