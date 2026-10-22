import { NavLink } from 'react-router-dom'
import {
  CalendarDays,
  ChartColumn,
  LayoutDashboard,
  Pill,
  Stethoscope,
  Users,
  X,
} from 'lucide-react'
import { useAuth } from '../lib/auth.jsx'

export const menu = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/pasien', label: 'Data Pasien', icon: Users },
  { to: '/dokter', label: 'Dokter', icon: Stethoscope },
  { to: '/jadwal', label: 'Jadwal Praktik', icon: CalendarDays },
  { to: '/farmasi', label: 'Farmasi', icon: Pill },
  { to: '/laporan', label: 'Laporan', icon: ChartColumn },
]

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-950/40 ring-1 ring-white/20">
        <svg viewBox="0 0 24 24" className="size-6 text-white" aria-hidden="true">
          <path
            d="M12 5v14M5 12h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="leading-tight">
        <p className="text-sm font-extrabold tracking-wide text-white">RS SEHAT SENTOSA</p>
        <p className="text-[11px] font-medium text-brand-200/80">Sistem Informasi Rumah Sakit</p>
      </div>
    </div>
  )
}

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const initials = (user?.name || 'Pengguna')
    .replace(/^(dr\.|Dra\.|Ns\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <>
      {/* Latar gelap untuk mobile */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-brand-950 transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-xl text-slate-400 transition hover:bg-white/10 hover:text-white focus-ring lg:hidden"
            aria-label="Tutup menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="px-6 pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Menu Utama
        </p>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {menu.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition focus-ring ${
                  isActive
                    ? 'bg-brand-500/15 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute left-0 h-5 w-1 rounded-r-full bg-brand-400 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <Icon
                    className={`size-5 transition ${isActive ? 'text-brand-300' : 'text-slate-500 group-hover:text-brand-300'}`}
                  />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="m-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
              <p className="truncate text-[11px] text-slate-400">{user?.role}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              title="Keluar"
              className="grid size-9 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-rose-500/15 hover:text-rose-300 focus-ring"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="m16 17 5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
              <span className="sr-only">Keluar</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
