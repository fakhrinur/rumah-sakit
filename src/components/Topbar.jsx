import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, UserRound } from 'lucide-react'
import { useAuth } from '../lib/auth.jsx'
import { menu } from './Sidebar.jsx'

const judulHalaman = {
  '/': { judul: 'Dashboard', sub: 'Ringkasan operasional rumah sakit hari ini' },
  '/pasien': { judul: 'Data Pasien', sub: 'Kelola data pasien dan rekam medis' },
  '/dokter': { judul: 'Dokter', sub: 'Daftar dokter dan jadwal praktik' },
  '/jadwal': { judul: 'Jadwal Praktik', sub: 'Jadwal dokter per poli minggu ini' },
  '/farmasi': { judul: 'Farmasi', sub: 'Stok obat dan ketersediaan apotek' },
  '/laporan': { judul: 'Laporan', sub: 'Statistik kunjungan dan pendapatan' },
}

const tanggalHariIni = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date())

export default function Topbar({ onMenu }) {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [profilTerbuka, setProfilTerbuka] = useState(false)
  const profilRef = useRef(null)

  const info = judulHalaman[pathname] ?? {
    judul: menu.find((item) => item.to === pathname)?.label ?? 'Dashboard',
    sub: '',
  }

  useEffect(() => {
    function handleClick(event) {
      if (profilRef.current && !profilRef.current.contains(event.target)) {
        setProfilTerbuka(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const initials = (user?.name || 'Pengguna')
    .replace(/^(dr\.|Dra\.|Ns\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenu}
          className="grid size-10 shrink-0 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-ring lg:hidden"
          aria-label="Buka menu"
        >
          <Menu className="size-5" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-bold text-slate-900 sm:text-lg">{info.judul}</h1>
          <p className="hidden truncate text-xs text-slate-500 sm:block">{info.sub}</p>
        </div>

        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Cari pasien, dokter, obat…"
            className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pr-3 pl-9 text-sm text-slate-700 transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:outline-none xl:w-80"
          />
        </div>

        <p className="hidden text-xs font-medium text-slate-500 xl:block">{tanggalHariIni}</p>

        <button
          type="button"
          className="relative grid size-10 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-ring"
          aria-label="Notifikasi"
        >
          <Bell className="size-5" />
          <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        <div className="relative" ref={profilRef}>
          <button
            type="button"
            onClick={() => setProfilTerbuka((nilai) => !nilai)}
            className="flex items-center gap-2 rounded-xl p-1 pr-2 transition hover:bg-slate-100 focus-ring"
            aria-expanded={profilTerbuka}
            aria-haspopup="menu"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white">
              {initials}
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block max-w-36 truncate text-sm font-semibold text-slate-800">
                {user?.name}
              </span>
              <span className="block text-[11px] text-slate-500">{user?.role}</span>
            </span>
            <ChevronDown
              className={`hidden size-4 text-slate-400 transition-transform sm:block ${
                profilTerbuka ? 'rotate-180' : ''
              }`}
            />
          </button>

          {profilTerbuka && (
            <div
              role="menu"
              className="animate-scale-in absolute right-0 mt-2 w-60 origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10"
            >
              <div className="border-b border-slate-100 bg-slate-50/60 px-4 py-3">
                <p className="truncate text-sm font-semibold text-slate-900">{user?.name}</p>
                <p className="truncate text-xs text-slate-500">{user?.unit}</p>
              </div>
              <div className="p-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setProfilTerbuka(false)
                    navigate('/pasien')
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  role="menuitem"
                >
                  <UserRound className="size-4" /> Profil Saya
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  role="menuitem"
                >
                  <Settings className="size-4" /> Pengaturan
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                  role="menuitem"
                >
                  <LogOut className="size-4" /> Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
