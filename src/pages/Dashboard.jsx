import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  CalendarClock,
  CircleCheck,
  ClipboardList,
  Clock3,
  Download,
  FlaskConical,
  Plus,
  UserPlus,
  TriangleAlert,
} from 'lucide-react'
import AreaChart from '../components/charts/AreaChart.jsx'
import DonutChart from '../components/charts/DonutChart.jsx'
import Badge from '../components/Badge.jsx'
import StatCard from '../components/StatCard.jsx'
import { useAuth } from '../lib/auth.jsx'
import {
  aktivitas,
  janjiTemu,
  kunjunganMingguan,
  okupansiBed,
  pasienPerPoli,
  ringkasan,
} from '../data/mock.js'

const ikonAktivitas = {
  selesai: { Icon: CircleCheck, warna: 'bg-emerald-50 text-emerald-600' },
  daftar: { Icon: UserPlus, warna: 'bg-sky-50 text-sky-600' },
  lab: { Icon: FlaskConical, warna: 'bg-violet-50 text-violet-600' },
  peringatan: { Icon: TriangleAlert, warna: 'bg-rose-50 text-rose-600' },
  jadwal: { Icon: Clock3, warna: 'bg-amber-50 text-amber-600' },
}

const sapaan = () => {
  const jam = new Date().getHours()
  if (jam < 11) return 'Selamat pagi'
  if (jam < 15) return 'Selamat siang'
  if (jam < 19) return 'Selamat sore'
  return 'Selamat malam'
}

const dataGrafik = kunjunganMingguan.map((item) => ({
  label: item.hari,
  subLabel: item.tanggal,
  value: item.value,
}))

const persenBed = Math.round((okupansiBed.terpakai / okupansiBed.total) * 100)
const maksPoli = Math.max(...pasienPerPoli.map((p) => p.jumlah))

export default function Dashboard() {
  const { user } = useAuth()
  const namaPanggilan = user?.name?.startsWith('dr.') ? user.name : user?.name?.split(' ')[0]

  return (
    <div className="space-y-6">
      {/* Sapaan */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-700">
            {sapaan()}, {namaPanggilan} 👋
          </p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            Ringkasan Rumah Sakit
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Kamis, 22 Oktober 2026 · Data diperbarui 2 menit lalu
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-ring"
          >
            <Download className="size-4" /> Unduh Laporan
          </button>
          <Link
            to="/pasien"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:from-brand-700 hover:to-brand-600 focus-ring"
          >
            <Plus className="size-4" /> Pasien Baru
          </Link>
        </div>
      </div>

      {/* Kartu statistik */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ringkasan.map((item, index) => (
          <StatCard key={item.id} item={item} delay={index * 70} />
        ))}
      </div>

      {/* Grafik + okupansi */}
      <div className="grid gap-4 xl:grid-cols-3">
        <section className="card animate-fade-up p-5 xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Kunjungan Pasien</h3>
              <p className="text-xs text-slate-500">7 hari terakhir · seluruh poli & IGD</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-brand-600" /> Total kunjungan
              </span>
              <span className="rounded-lg bg-slate-100 px-2 py-1 font-semibold text-slate-600">
                Mingguan
              </span>
            </div>
          </div>
          <div className="mt-4">
            <AreaChart data={dataGrafik} height={250} />
          </div>
          <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">
            {[
              { label: 'Rata-rata harian', nilai: '78 pasien' },
              { label: 'Puncak kunjungan', nilai: 'Kamis · 96' },
              { label: 'Rawat jalan', nilai: '352 pasien' },
            ].map((info) => (
              <div key={info.label}>
                <p className="text-[11px] font-medium text-slate-400">{info.label}</p>
                <p className="mt-0.5 text-sm font-bold text-slate-800">{info.nilai}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card animate-fade-up p-5" style={{ animationDelay: '120ms' }}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Okupansi Bed</h3>
              <p className="text-xs text-slate-500">Kapasitas rawat inap</p>
            </div>
            <span className="rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700">
              {persenBed}% terpakai
            </span>
          </div>

          <div className="mt-5 flex items-center justify-center">
            <DonutChart
              total={okupansiBed.total}
              segments={[
                { label: 'Terpakai', value: okupansiBed.terpakai, color: '#069182' },
                { label: 'Kosong', value: okupansiBed.total - okupansiBed.terpakai, color: '#cbd5e1' },
              ]}
              centerValue={`${okupansiBed.terpakai}/${okupansiBed.total}`}
              centerLabel="bed terpakai"
            />
          </div>

          <ul className="mt-5 space-y-3">
            {okupansiBed.kelas.map((kelas) => {
              const persen = Math.round((kelas.terpakai / kelas.total) * 100)
              return (
                <li key={kelas.nama}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600">{kelas.nama}</span>
                    <span className="font-semibold text-slate-800">
                      {kelas.terpakai}/{kelas.total}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                      style={{ width: `${persen}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      {/* Poli + aktivitas */}
      <div className="grid gap-4 xl:grid-cols-3">
        <section className="card animate-fade-up p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pasien per Poli</h3>
              <p className="text-xs text-slate-500">Bulan Oktober 2026</p>
            </div>
            <ClipboardList className="size-4 text-slate-400" />
          </div>

          <ul className="mt-5 space-y-4">
            {pasienPerPoli.map((poli) => (
              <li key={poli.poli}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">{poli.poli}</span>
                  <span className="font-bold text-slate-800">{poli.jumlah}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(poli.jumlah / maksPoli) * 100}%`,
                      backgroundColor: poli.warna,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-3">
            <div>
              <p className="text-[11px] font-medium text-slate-500">Total kunjungan poli</p>
              <p className="text-lg font-extrabold text-slate-900">
                {pasienPerPoli.reduce((total, poli) => total + poli.jumlah, 0)} pasien
              </p>
            </div>
            <Link
              to="/laporan"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline"
            >
              Detail <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </section>

        <section className="card animate-fade-up p-5 xl:col-span-2" style={{ animationDelay: '80ms' }}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Aktivitas Terbaru</h3>
              <p className="text-xs text-slate-500">Pembaruan hari ini</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-600" />
              </span>
              Live
            </span>
          </div>

          <ol className="relative mt-5 space-y-4 before:absolute before:top-2 before:bottom-2 before:left-[17px] before:w-px before:bg-slate-200">
            {aktivitas.map((item) => {
              const { Icon, warna } = ikonAktivitas[item.jenis] ?? ikonAktivitas.jadwal
              return (
                <li key={item.id} className="relative flex gap-3">
                  <span
                    className={`z-10 grid size-9 shrink-0 place-items-center rounded-full ring-4 ring-white ${warna}`}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 pt-1">
                    <p className="text-sm leading-snug text-slate-700">{item.teks}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">{item.waktu}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>
      </div>

      {/* Janji temu */}
      <section className="card animate-fade-up overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Janji Temu Hari Ini</h3>
            <p className="text-xs text-slate-500">5 dari 96 jadwal · Kamis, 22 Oktober 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <CalendarClock className="size-3.5" /> Lihat Jadwal
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                <th className="px-5 py-3">Pasien</th>
                <th className="px-5 py-3">Poli</th>
                <th className="px-5 py-3">Dokter</th>
                <th className="px-5 py-3">Jam</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {janjiTemu.map((janji) => (
                <tr key={janji.id} className="transition hover:bg-brand-50/40">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                        {janji.pasien
                          .split(' ')
                          .slice(0, 2)
                          .map((kata) => kata[0])
                          .join('')}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-800">{janji.pasien}</p>
                        <p className="text-[11px] text-slate-400">
                          {janji.id} · {janji.umur} tahun
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{janji.poli}</td>
                  <td className="px-5 py-3.5 text-slate-600">{janji.dokter}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{janji.jam}</td>
                  <td className="px-5 py-3.5">
                    <Badge status={janji.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      className="rounded-lg px-2.5 py-1 text-xs font-semibold text-brand-700 transition hover:bg-brand-50"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
