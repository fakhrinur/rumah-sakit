import { Activity, BedDouble, Stethoscope, TrendingDown, TrendingUp, Users } from 'lucide-react'
import { formatAngka } from '../data/mock.js'

const ikon = { users: Users, activity: Activity, bed: BedDouble, stethoscope: Stethoscope }

const tone = {
  brand: { kotak: 'bg-brand-50 text-brand-600 ring-brand-100', garis: 'from-brand-500 to-brand-400' },
  sky: { kotak: 'bg-sky-50 text-sky-600 ring-sky-100', garis: 'from-sky-500 to-sky-400' },
  amber: { kotak: 'bg-amber-50 text-amber-600 ring-amber-100', garis: 'from-amber-500 to-amber-400' },
  violet: {
    kotak: 'bg-violet-50 text-violet-600 ring-violet-100',
    garis: 'from-violet-500 to-violet-400',
  },
}

export default function StatCard({ item, delay = 0 }) {
  const Icon = ikon[item.icon] ?? Activity
  const warna = tone[item.tone] ?? tone.brand
  const naik = item.trend >= 0

  return (
    <div
      className="card animate-fade-up group relative overflow-hidden p-5 transition hover:-translate-y-0.5 hover:shadow-md"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${warna.garis}`} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{item.label}</p>
          <p className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900">
              {formatAngka(item.value)}
            </span>
            <span className="text-xs font-medium text-slate-400">{item.unit}</span>
          </p>
        </div>
        <span className={`grid size-11 shrink-0 place-items-center rounded-xl ring-1 ${warna.kotak}`}>
          <Icon className="size-5" />
        </span>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs">
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold ${
            naik ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}
        >
          {naik ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
          {Math.abs(item.trend).toFixed(1)}%
        </span>
        <span className="truncate text-slate-400">{item.trendLabel}</span>
      </div>
    </div>
  )
}
