import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import PrivateRoute from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'
import NoticePage from './pages/NoticePage'
import UserPage from './pages/UserPage'
import BannerPage from './pages/BannerPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <main className="flex-1 p-8 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Navigate to="/notices" replace />} />
                    <Route path="/notices" element={<NoticePage />} />
                    <Route path="/users" element={<UserPage />} />
                    <Route path="/banners" element={<BannerPage />} />
                  </Routes>
                </main>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
