import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  BedDouble,
  CheckCircle2,
  Eye,
  EyeOff,
  HeartPulse,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react'
import { DEMO_ACCOUNTS, useAuth } from '../lib/auth.jsx'

const fitur = [
  { icon: Users, teks: 'Rekam medis elektronik terintegrasi' },
  { icon: Stethoscope, teks: 'Penjadwalan dokter & poli otomatis' },
  { icon: BedDouble, teks: 'Monitoring ketersediaan bed real-time' },
]

function PanelMerek() {
  return (
    <div className="relative hidden overflow-hidden bg-slate-950 p-12 lg:flex lg:flex-col lg:justify-between">
      {/* dekorasi */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-24 size-[28rem] rounded-full bg-brand-500/25 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-sky-500/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className="relative flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-900/50 ring-1 ring-white/20">
          <svg viewBox="0 0 24 24" className="size-7 text-white" aria-hidden="true">
            <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <div className="leading-tight">
          <p className="text-sm font-extrabold tracking-[0.14em] text-white">RS SEHAT SENTOSA</p>
          <p className="text-xs text-brand-200/80">Sistem Informasi Rumah Sakit</p>
        </div>
      </div>

      <div className="relative max-w-md animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-brand-200 backdrop-blur">
          <Sparkles className="size-3.5" /> Terakreditasi Paripurna KARS
        </span>

        <h2 className="mt-5 text-4xl leading-[1.15] font-extrabold tracking-tight text-white">
          Satu platform untuk
          <span className="bg-gradient-to-r from-brand-300 to-sky-300 bg-clip-text text-transparent">
            {' '}
            seluruh layanan
          </span>{' '}
          rumah sakit.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          Kelola pendaftaran pasien, jadwal dokter, rekam medis, hingga stok farmasi dalam satu
          dashboard terpadu.
        </p>

        <ul className="mt-8 space-y-3">
          {fitur.map(({ icon: Icon, teks }) => (
            <li key={teks} className="flex items-center gap-3 text-sm text-slate-300">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <Icon className="size-4 text-brand-300" />
              </span>
              {teks}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative flex items-center gap-6 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-4 text-brand-400" /> Data terenkripsi
        </span>
        <span className="inline-flex items-center gap-1.5">
          <HeartPulse className="size-4 text-brand-400" /> IGD 24 jam
        </span>
      </div>
    </div>
  )
}

export default function Login() {
  const { login, isLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const tujuan = location.state?.from || '/'

  const [form, setForm] = useState({ email: '', password: '', ingat: true })
  const [tampilSandi, setTampilSandi] = useState(false)
  const [error, setError] = useState('')
  const [fieldError, setFieldError] = useState({})

  if (isAuthenticated) return <Navigate to={tujuan} replace />

  const ubah = (key) => (event) => {
    setForm((data) => ({ ...data, [key]: event.target.value }))
    setError('')
    setFieldError((data) => ({ ...data, [key]: '' }))
  }

  const isiDemo = (akun) => {
    setForm({ email: akun.email, password: akun.password, ingat: true })
    setError('')
    setFieldError({})
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const salah = {}
    if (!form.email.trim()) salah.email = 'Email wajib diisi.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) salah.email = 'Format email tidak valid.'
    if (!form.password) salah.password = 'Kata sandi wajib diisi.'
    else if (form.password.length < 6) salah.password = 'Kata sandi minimal 6 karakter.'

    if (Object.keys(salah).length > 0) {
      setFieldError(salah)
      return
    }

    try {
      await login(form.email, form.password)
      navigate(tujuan, { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[1.05fr_1fr]">
      <PanelMerek />

      <div className="flex min-h-screen flex-col justify-center px-5 py-10 sm:px-10 lg:px-16 xl:px-24">
        {/* Logo versi mobile */}
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-md">
            <svg viewBox="0 0 24 24" className="size-6 text-white" aria-hidden="true">
              <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold tracking-wide text-slate-900">RS SEHAT SENTOSA</p>
            <p className="text-[11px] text-slate-500">Sistem Informasi Rumah Sakit</p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md animate-fade-up">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Selamat datang kembali 👋
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Masuk untuk mengakses dashboard rumah sakit.
          </p>

          {error && (
            <div
              role="alert"
              className="animate-fade-in mt-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              <AlertCircle className="mt-0.5 size-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={ubah('email')}
                  placeholder="nama@sehatsentosa.id"
                  aria-invalid={Boolean(fieldError.email)}
                  className={`h-12 w-full rounded-xl border bg-white pr-3.5 pl-11 text-sm text-slate-800 transition placeholder:text-slate-400 focus:ring-4 focus:outline-none ${
                    fieldError.email
                      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-brand-400 focus:ring-brand-500/10'
                  }`}
                />
              </div>
              {fieldError.email && <p className="mt-1.5 text-xs text-rose-600">{fieldError.email}</p>}
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Kata Sandi
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-brand-700 transition hover:text-brand-800 hover:underline"
                >
                  Lupa sandi?
                </button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={tampilSandi ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={ubah('password')}
                  placeholder="••••••••"
                  aria-invalid={Boolean(fieldError.password)}
                  className={`h-12 w-full rounded-xl border bg-white pr-12 pl-11 text-sm text-slate-800 transition placeholder:text-slate-400 focus:ring-4 focus:outline-none ${
                    fieldError.password
                      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-brand-400 focus:ring-brand-500/10'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setTampilSandi((nilai) => !nilai)}
                  className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label={tampilSandi ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {tampilSandi ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
                </button>
              </div>
              {fieldError.password && (
                <p className="mt-1.5 text-xs text-rose-600">{fieldError.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={form.ingat}
                  onChange={(e) => setForm((d) => ({ ...d, ingat: e.target.checked }))}
                  className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500/30"
                />
                Ingat saya di perangkat ini
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:from-brand-700 hover:to-brand-600 focus-visible:ring-4 focus-visible:ring-brand-500/30 focus-visible:outline-none active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Memverifikasi…
                </>
              ) : (
                <>
                  Masuk ke Dashboard
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-4">
            <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Akun demo — klik untuk mengisi
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {DEMO_ACCOUNTS.map((akun) => (
                <button
                  key={akun.email}
                  type="button"
                  onClick={() => isiDemo(akun)}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left transition hover:border-brand-300 hover:bg-brand-50/60 focus-ring"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-brand-600" />
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold text-slate-800">
                      {akun.role}
                    </span>
                    <span className="block truncate text-[11px] text-slate-500">{akun.email}</span>
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-400">
              Sandi demo: <code className="font-mono text-slate-600">admin123</code> ·{' '}
              <code className="font-mono text-slate-600">dokter123</code>
            </p>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            © 2026 RS Sehat Sentosa. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </div>
  )
}
