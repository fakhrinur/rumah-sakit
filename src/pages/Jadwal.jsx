import { useState } from 'react'
import { CalendarCheck, Clock3, DoorOpen, Plus, Stethoscope } from 'lucide-react'
import { jadwalPraktik } from '../data/mock.js'

const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

export default function Jadwal() {
  const [aktif, setAktif] = useState('Kamis')
  const daftar = jadwalPraktik[aktif] ?? []
  const totalJadwal = Object.values(jadwalPraktik).reduce((total, item) => total + item.length, 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Jadwal Praktik Dokter</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Periode 20 – 26 Oktober 2026 · {totalJadwal} sesi terjadwal
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:from-brand-700 hover:to-brand-600"
        >
          <Plus className="size-4" /> Tambah Jadwal
        </button>
      </div>

      <div className="card p-2">
        <div className="grid grid-cols-4 gap-1 sm:grid-cols-7">
          {hari.map((namaHari) => {
            const jumlah = jadwalPraktik[namaHari]?.length ?? 0
            const dipilih = aktif === namaHari
            const hariIni = namaHari === 'Kamis'
            return (
              <button
                key={namaHari}
                type="button"
                onClick={() => setAktif(namaHari)}
                className={`relative rounded-xl px-2 py-3 text-center transition ${
                  dipilih
                    ? 'bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-md shadow-brand-600/25'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="block text-xs font-semibold">{namaHari}</span>
                <span
                  className={`mt-0.5 block text-[10px] ${dipilih ? 'text-brand-50/90' : 'text-slate-400'}`}
                >
                  {jumlah} sesi
                </span>
                {hariIni && !dipilih && (
                  <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-brand-500" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="card animate-fade-in p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Jadwal Hari {aktif}</h3>
              <p className="text-xs text-slate-500">
                {daftar.length} dokter praktik
                {aktif === 'Kamis' ? ' · hari ini' : ''}
              </p>
            </div>
            <CalendarCheck className="size-5 text-brand-600" />
          </div>

          <ul className="mt-4 space-y-3">
            {daftar.map((sesi, index) => (
              <li
                key={`${sesi.dokter}-${sesi.jam}`}
                className="animate-fade-up flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition hover:border-brand-200 hover:bg-brand-50/40 sm:flex-row sm:items-center sm:justify-between"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-slate-200">
                    <Stethoscope className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{sesi.dokter}</p>
                    <p className="text-xs text-slate-500">Poli {sesi.poli}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 font-semibold text-slate-700 ring-1 ring-slate-200">
                    <Clock3 className="size-3.5 text-brand-600" /> {sesi.jam}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 font-medium text-slate-600 ring-1 ring-slate-200">
                    <DoorOpen className="size-3.5 text-slate-400" /> {sesi.ruang}
                  </span>
                </div>
              </li>
            ))}

            {daftar.length === 0 && (
              <li className="rounded-xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-500">
                Tidak ada jadwal praktik pada hari ini.
              </li>
            )}
          </ul>
        </section>

        <section className="card animate-fade-in p-5">
          <h3 className="text-sm font-bold text-slate-900">Ringkasan Minggu Ini</h3>
          <p className="text-xs text-slate-500">Distribusi sesi per hari</p>

          <ul className="mt-5 space-y-3.5">
            {hari.map((namaHari) => {
              const jumlah = jadwalPraktik[namaHari]?.length ?? 0
              return (
                <li key={namaHari}>
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-medium ${namaHari === aktif ? 'text-brand-700' : 'text-slate-600'}`}
                    >
                      {namaHari}
                    </span>
                    <span className="font-semibold text-slate-800">{jumlah} sesi</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${
                        namaHari === aktif
                          ? 'bg-gradient-to-r from-brand-600 to-brand-400'
                          : 'bg-slate-300'
                      }`}
                      style={{ width: `${(jumlah / 3) * 100}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-6 rounded-xl bg-gradient-to-br from-slate-900 to-brand-950 p-4 text-white">
            <p className="text-[11px] font-medium text-brand-200">Utilisasi ruang poli</p>
            <p className="mt-1 text-2xl font-extrabold">78%</p>
            <p className="mt-1 text-[11px] text-slate-400">
              14 dari 18 ruang poli terpakai minggu ini.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
