import { useEffect, useState } from 'react'
import { getUsers, grantCurrency, revokeCurrency, type User } from '../api/user'

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([])
  const [selected, setSelected] = useState<User | null>(null)
  const [amount, setAmount] = useState('')
  const [mode, setMode] = useState<'grant' | 'revoke' | null>(null)

  const load = () => getUsers().then(setUsers)

  useEffect(() => { load() }, [])

  const openModal = (user: User, m: 'grant' | 'revoke') => {
    setSelected(user)
    setMode(m)
    setAmount('')
  }

  const handleSubmit = async () => {
    if (!selected || !amount) return
    const n = parseInt(amount)
    if (isNaN(n) || n <= 0) return
    if (mode === 'grant') await grantCurrency(selected.id, n)
    else if (mode === 'revoke') await revokeCurrency(selected.id, n)
    setMode(null)
    load()
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">유저 관리</h2>
      </div>

      {mode && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 space-y-4">
            <h3 className="text-sm font-medium text-gray-900">
              {mode === 'grant' ? '재화 지급' : '재화 회수'} — {selected.nickname}
            </h3>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="수량 입력"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setMode(null)} className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">취소</button>
              <button onClick={handleSubmit} className={`px-3 py-1.5 text-sm text-white rounded-md cursor-pointer ${mode === 'grant' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-500 hover:bg-red-600'}`}>확인</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-12">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">닉네임</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">이메일</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-24">재화</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32">가입일</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase w-28">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{u.id}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{u.nickname}</td>
                <td className="px-4 py-3 text-gray-500">{u.email}</td>
                <td className="px-4 py-3 text-gray-900">{u.currency.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-500">{u.createdAt.slice(0, 10)}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => openModal(u, 'grant')} className="text-indigo-600 hover:text-indigo-800 text-xs cursor-pointer">지급</button>
                  <button onClick={() => openModal(u, 'revoke')} className="text-red-500 hover:text-red-700 text-xs cursor-pointer">회수</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">유저가 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
