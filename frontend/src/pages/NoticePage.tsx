import { useEffect, useState } from 'react'
import { getNotices, createNotice, updateNotice, deleteNotice, type Notice, type NoticeRequest } from '../api/notice'

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [selected, setSelected] = useState<Notice | null>(null)
  const [form, setForm] = useState<NoticeRequest>({ title: '', content: '' })
  const [mode, setMode] = useState<'create' | 'edit' | null>(null)

  const load = () => getNotices().then(setNotices)

  useEffect(() => { load() }, [])

  const openCreate = () => {
    setForm({ title: '', content: '' })
    setMode('create')
    setSelected(null)
  }

  const openEdit = (notice: Notice) => {
    setForm({ title: notice.title, content: notice.content })
    setMode('edit')
    setSelected(notice)
  }

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) return
    if (mode === 'create') await createNotice(form)
    else if (mode === 'edit' && selected) await updateNotice(selected.id, form)
    setMode(null)
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('삭제하시겠습니까?')) return
    await deleteNotice(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">공지사항 관리</h2>
        <button onClick={openCreate} className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors cursor-pointer">
          + 새 공지
        </button>
      </div>

      {mode && (
        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-5 space-y-3">
          <h3 className="text-sm font-medium text-gray-700">{mode === 'create' ? '공지 작성' : '공지 수정'}</h3>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="제목"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          />
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 h-28 resize-none"
            placeholder="내용"
            value={form.content}
            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">제목</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32">등록일</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase w-24">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {notices.map(n => (
              <tr key={n.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{n.id}</td>
                <td className="px-4 py-3 text-gray-900">{n.title}</td>
                <td className="px-4 py-3 text-gray-500">{n.createdAt}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => openEdit(n)} className="text-indigo-600 hover:text-indigo-800 text-xs cursor-pointer">수정</button>
                  <button onClick={() => handleDelete(n.id)} className="text-red-500 hover:text-red-700 text-xs cursor-pointer">삭제</button>
                </td>
              </tr>
            ))}
            {notices.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">공지사항이 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
