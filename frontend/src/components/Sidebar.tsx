import { NavLink } from 'react-router-dom'

const menus = [
  { path: '/notices', label: '공지사항' },
  { path: '/users', label: '유저 관리' },
  { path: '/banners', label: '배너 관리' },
  { path: '/versions', label: '버전 관리' },
]

export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-5 border-b border-gray-200">
        <h1 className="text-base font-bold text-gray-900">Game BackOffice</h1>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menus.map(m => (
          <NavLink
            key={m.path}
            to={m.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {m.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
