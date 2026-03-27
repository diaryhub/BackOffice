import { useEffect, useState } from 'react'
import { getBanners, createBanner, updateBanner, deleteBanner, type Banner, type BannerRequest } from '../api/banner'

const emptyForm: BannerRequest = {
  name: '',
  startTime: '',
  endTime: '',
  cost: 0,
  imageUrl: null,
}

export default function BannerPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [selected, setSelected] = useState<Banner | null>(null)
  const [form, setForm] = useState<BannerRequest>(emptyForm)
  const [mode, setMode] = useState<'create' | 'edit' | null>(null)

  const load = () => getBanners().then(setBanners)

  useEffect(() => { load() }, [])

  const openCreate = () => {
    setForm(emptyForm)
    setMode('create')
    setSelected(null)
  }

  const toDatetimeLocal = (iso: string) => iso.slice(0, 16)

  const openEdit = (banner: Banner) => {
    setForm({
      name: banner.name,
      startTime: toDatetimeLocal(banner.startTime),
      endTime: toDatetimeLocal(banner.endTime),
      cost: banner.cost,
      imageUrl: banner.imageUrl,
    })
    setMode('edit')
    setSelected(banner)
  }

  const toIso = (dt: string) => dt ? new Date(dt).toISOString() : dt

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.startTime || !form.endTime) return
    const payload = { ...form, startTime: toIso(form.startTime), endTime: toIso(form.endTime) }
    if (mode === 'create') await createBanner(payload)
    else if (mode === 'edit' && selected) await updateBanner(selected.id, payload)
    setMode(null)
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('삭제하시겠습니까?')) return
    await deleteBanner(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">배너 관리</h2>
        <button onClick={openCreate} className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors cursor-pointer">
          + 새 배너
        </button>
      </div>

      {mode && (
        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-5 space-y-3">
          <h3 className="text-sm font-medium text-gray-700">{mode === 'create' ? '배너 등록' : '배너 수정'}</h3>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="배너명"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">시작일시</label>
              <input
                type="datetime-local"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.startTime}
                onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">종료일시</label>
              <input
                type="datetime-local"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.endTime}
                onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))}
              />
            </div>
          </div>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="비용 (재화)"
            value={form.cost}
            onChange={e => setForm(f => ({ ...f, cost: parseInt(e.target.value) || 0 }))}
          />
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="이미지 URL (선택)"
            value={form.imageUrl ?? ''}
            onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value || null }))}
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setMode(null)} className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">취소</button>
            <button onClick={handleSubmit} className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer">저장</button>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-12">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">배너명</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">기간</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-20">비용</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase w-24">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {banners.map(b => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{b.id}</td>
                <td className="px-4 py-3 text-gray-900">{b.name}</td>
                <td className="px-4 py-3 text-gray-500">{b.startTime} ~ {b.endTime}</td>
                <td className="px-4 py-3 text-gray-900">{b.cost}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => openEdit(b)} className="text-indigo-600 hover:text-indigo-800 text-xs cursor-pointer">수정</button>
                  <button onClick={() => handleDelete(b.id)} className="text-red-500 hover:text-red-700 text-xs cursor-pointer">삭제</button>
                </td>
              </tr>
            ))}
            {banners.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">배너가 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
