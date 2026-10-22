import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

export default function Layout() {
  const [sidebarTerbuka, setSidebarTerbuka] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar open={sidebarTerbuka} onClose={() => setSidebarTerbuka(false)} />

      <div className="flex min-h-screen flex-col lg:pl-72">
        <Topbar onMenu={() => setSidebarTerbuka(true)} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200/80 px-4 py-4 text-center text-xs text-slate-400 sm:px-6 lg:px-8">
          © 2026 RS Sehat Sentosa · Sistem Informasi Rumah Sakit v1.0
        </footer>
      </div>
    </div>
  )
}
