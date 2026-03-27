import { useEffect, useState } from 'react'
import { getVersions, createVersion, updateVersion, deleteVersion, type GameVersion, type VersionRequest } from '../api/version'

const emptyForm: VersionRequest = { version: '', patchNote: '', releaseDate: '' }

export default function VersionPage() {
  const [versions, setVersions] = useState<GameVersion[]>([])
  const [selected, setSelected] = useState<GameVersion | null>(null)
  const [form, setForm] = useState<VersionRequest>(emptyForm)
  const [mode, setMode] = useState<'create' | 'edit' | null>(null)

  const load = () => getVersions().then(setVersions)
  useEffect(() => { load() }, [])

  const openCreate = () => {
    setForm(emptyForm)
    setMode('create')
    setSelected(null)
  }

  const openEdit = (v: GameVersion) => {
    setForm({ version: v.version, patchNote: v.patchNote, releaseDate: v.releaseDate })
    setMode('edit')
    setSelected(v)
  }

  const handleSubmit = async () => {
    if (!form.version.trim() || !form.releaseDate) return
    if (mode === 'create') await createVersion(form)
    else if (mode === 'edit' && selected) await updateVersion(selected.id, form)
    setMode(null)
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('삭제하시겠습니까?')) return
    await deleteVersion(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">버전 관리</h2>
        <button onClick={openCreate} className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors cursor-pointer">
          + 새 버전
        </button>
      </div>

      {mode && (
        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-5 space-y-3">
          <h3 className="text-sm font-medium text-gray-700">{mode === 'create' ? '버전 등록' : '버전 수정'}</h3>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="버전 (예: 1.2.0)"
            value={form.version}
            onChange={e => setForm(f => ({ ...f, version: e.target.value }))}
          />
          <div>
            <label className="block text-xs text-gray-500 mb-1">출시일</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.releaseDate}
              onChange={e => setForm(f => ({ ...f, releaseDate: e.target.value }))}
            />
          </div>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
            placeholder="패치노트"
            value={form.patchNote}
            onChange={e => setForm(f => ({ ...f, patchNote: e.target.value }))}
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-24">버전</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-28">출시일</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">패치노트</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase w-24">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {versions.map(v => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{v.id}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{v.version}</td>
                <td className="px-4 py-3 text-gray-500">{v.releaseDate}</td>
                <td className="px-4 py-3 text-gray-500 whitespace-pre-line">{v.patchNote}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => openEdit(v)} className="text-indigo-600 hover:text-indigo-800 text-xs cursor-pointer">수정</button>
                  <button onClick={() => handleDelete(v.id)} className="text-red-500 hover:text-red-700 text-xs cursor-pointer">삭제</button>
                </td>
              </tr>
            ))}
            {versions.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">버전 정보가 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
