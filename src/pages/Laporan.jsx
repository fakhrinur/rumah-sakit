import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Download, FileSpreadsheet, TrendingUp } from 'lucide-react'
import DonutChart from '../components/charts/DonutChart.jsx'
import { formatAngka, pasienPerPoli, pendapatanBulanan } from '../data/mock.js'

const metrik = [
  { label: 'Total Kunjungan', nilai: '2.148', delta: 9.2, ket: 'vs September' },
  { label: 'Pendapatan', nilai: 'Rp 592 jt', delta: 8.0, ket: 'vs September' },
  { label: 'Rata-rata LOS', nilai: '3,4 hari', delta: -4.1, ket: 'vs September' },
  { label: 'Tingkat BOR', nilai: '78,3%', delta: 2.6, ket: 'vs September' },
]

const penjamin = [
  { label: 'BPJS Kesehatan', value: 58, color: '#069182' },
  { label: 'Asuransi Swasta', value: 27, color: '#38bdf8' },
  { label: 'Umum / Mandiri', value: 15, color: '#cbd5e1' },
]

export default function Laporan() {
  const [rentang, setRentang] = useState(6)
  const data = pendapatanBulanan.slice(-rentang)
  const maks = Math.max(...data.map((item) => item.nilai))

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Laporan & Statistik</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Ringkasan kinerja layanan rumah sakit · Oktober 2026
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <FileSpreadsheet className="size-4" /> Excel
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:from-brand-700 hover:to-brand-600"
          >
            <Download className="size-4" /> Unduh PDF
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrik.map((item, index) => {
          const naik = item.delta >= 0
          return (
            <div
              key={item.label}
              className="card animate-fade-up p-5"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                {item.nilai}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs">
                <span
                  className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold ${
                    naik ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {naik ? <TrendingUp className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                  {Math.abs(item.delta)}%
                </span>
                <span className="text-slate-400">{item.ket}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <section className="card animate-fade-up p-5 xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pendapatan Bulanan</h3>
              <p className="text-xs text-slate-500">Dalam juta rupiah</p>
            </div>
            <div className="flex rounded-lg bg-slate-100 p-0.5">
              {[3, 6].map((nilai) => (
                <button
                  key={nilai}
                  type="button"
                  onClick={() => setRentang(nilai)}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition ${
                    rentang === nilai ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  {nilai} bulan
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex h-60 items-end gap-3 sm:gap-5">
            {data.map((item) => (
              <div key={item.bulan} className="group flex h-full flex-1 flex-col justify-end">
                <div className="relative flex-1">
                  <div
                    className="absolute inset-x-0 bottom-0 rounded-t-xl bg-gradient-to-t from-brand-600 to-brand-300 transition-all duration-500 group-hover:from-brand-700 group-hover:to-brand-400"
                    style={{ height: `${(item.nilai / maks) * 100}%` }}
                  >
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-slate-900 px-1.5 py-0.5 text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
                      {item.nilai}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-center text-[11px] font-medium text-slate-500">{item.bulan}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
            Total pendapatan periode ini{' '}
            <span className="font-bold text-slate-800">
              Rp {formatAngka(data.reduce((total, item) => total + item.nilai, 0))} juta
            </span>
          </p>
        </section>

        <section className="card animate-fade-up p-5" style={{ animationDelay: '100ms' }}>
          <h3 className="text-sm font-bold text-slate-900">Komposisi Penjamin</h3>
          <p className="text-xs text-slate-500">Berdasarkan kunjungan Oktober</p>

          <div className="mt-5 flex justify-center">
            <DonutChart total={100} segments={penjamin} centerValue="100%" centerLabel="total kunjungan" />
          </div>

          <ul className="mt-5 space-y-2.5">
            {penjamin.map((item) => (
              <li key={item.label} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="size-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                  {item.label}
                </span>
                <span className="font-semibold text-slate-800">{item.value}%</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card animate-fade-up overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Kinerja per Poli</h3>
            <p className="text-xs text-slate-500">Perbandingan kunjungan bulan ini</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
            <ArrowUpRight className="size-3.5" /> +7,8%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                <th className="px-5 py-3">Poli</th>
                <th className="px-5 py-3">Kunjungan</th>
                <th className="px-5 py-3">Kontribusi</th>
                <th className="px-5 py-3">Rata-rata/hari</th>
                <th className="px-5 py-3">Tren</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pasienPerPoli.map((poli, index) => {
                const total = pasienPerPoli.reduce((jumlah, item) => jumlah + item.jumlah, 0)
                return (
                  <tr key={poli.poli} className="transition hover:bg-brand-50/40">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{poli.poli}</td>
                    <td className="px-5 py-3.5 text-slate-600">{poli.jumlah} pasien</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(poli.jumlah / total) * 100}%`,
                              backgroundColor: poli.warna,
                            }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">
                          {((poli.jumlah / total) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {Math.round(poli.jumlah / 22)} pasien
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                          index % 3 === 2 ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {index % 3 === 2 ? (
                          <ArrowDownRight className="size-3.5" />
                        ) : (
                          <ArrowUpRight className="size-3.5" />
                        )}
                        {(index % 3 === 2 ? -2.4 : 5.6 + index).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
