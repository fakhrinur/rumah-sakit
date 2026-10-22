import { useMemo, useState } from 'react'
import { CalendarDays, MapPin, Search, Star, Stethoscope, Users } from 'lucide-react'
import Badge from '../components/Badge.jsx'
import { dokter as dataDokter } from '../data/mock.js'

const inisial = (nama) =>
  nama
    .replace(/^(dr\.|Dra\.|Ns\.)\s*/i, '')
    .replace(/,.*$/, '')
    .split(' ')
    .slice(0, 2)
    .map((kata) => kata[0])
    .join('')
    .toUpperCase()

export default function Dokter() {
  const [cari, setCari] = useState('')
  const [filter, setFilter] = useState('Semua')

  const hasil = useMemo(() => {
    const kata = cari.trim().toLowerCase()
    return dataDokter.filter((item) => {
      const cocokKata =
        !kata ||
        item.nama.toLowerCase().includes(kata) ||
        item.spesialis.toLowerCase().includes(kata) ||
        item.poli.toLowerCase().includes(kata)
      const cocokFilter = filter === 'Semua' || item.status === filter
      return cocokKata && cocokFilter
    })
  }, [cari, filter])

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Dokter & Tenaga Medis</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            {dataDokter.length} dokter terdaftar di 6 poli spesialis
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={cari}
            onChange={(event) => setCari(event.target.value)}
            placeholder="Cari dokter atau spesialis…"
            className="h-10 w-full rounded-xl border border-slate-200 bg-white pr-3 pl-9 text-sm shadow-sm transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {['Semua', 'Aktif', 'Cuti'].map((opsi) => (
          <button
            key={opsi}
            type="button"
            onClick={() => setFilter(opsi)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              filter === opsi
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {opsi}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {hasil.map((item, index) => (
          <article
            key={item.id}
            className="card animate-fade-up overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className={`h-20 bg-gradient-to-r ${item.warna} relative`}>
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 20%, rgba(255,255,255,.6) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />
              <span className="absolute top-3 right-3 rounded-full bg-white/20 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
                {item.id}
              </span>
            </div>

            <div className="px-5 pb-5">
              <div className="relative z-10 -mt-7 flex items-end justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-white text-lg font-extrabold text-slate-800 shadow-md ring-1 ring-slate-200">
                  {inisial(item.nama)}
                </span>
                <Badge status={item.status} />
              </div>

              <h3 className="mt-3 text-sm font-bold text-slate-900">{item.nama}</h3>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                <Stethoscope className="size-3.5" /> {item.spesialis}
              </p>

              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <p className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5 text-slate-400" /> {item.jadwal}
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-slate-400" /> Poli {item.poli}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center">
                <div>
                  <p className="flex items-center justify-center gap-1 text-sm font-bold text-slate-900">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" /> 4.9
                  </p>
                  <p className="text-[10px] text-slate-400">Rating</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.pengalaman} th</p>
                  <p className="text-[10px] text-slate-400">Pengalaman</p>
                </div>
                <div>
                  <p className="flex items-center justify-center gap-1 text-sm font-bold text-slate-900">
                    <Users className="size-3.5 text-slate-400" /> {item.pasien}
                  </p>
                  <p className="text-[10px] text-slate-400">Pasien</p>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 h-9 w-full rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
              >
                Lihat Profil & Jadwal
              </button>
            </div>
          </article>
        ))}
      </div>

      {hasil.length === 0 && (
        <div className="card px-5 py-14 text-center">
          <p className="text-sm font-semibold text-slate-700">Dokter tidak ditemukan</p>
          <p className="mt-1 text-xs text-slate-500">Coba kata kunci lain atau ubah filter.</p>
        </div>
      )}
    </div>
  )
}
