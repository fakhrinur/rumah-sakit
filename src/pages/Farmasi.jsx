import { useMemo, useState } from 'react'
import { Boxes, CircleAlert, PackagePlus, Search, TrendingUp, Wallet } from 'lucide-react'
import Badge from '../components/Badge.jsx'
import { formatAngka, formatRupiah, obat as dataObat } from '../data/mock.js'

const kategoriList = ['Semua', ...new Set(dataObat.map((item) => item.kategori))]

export default function Farmasi() {
  const [daftar, setDaftar] = useState(dataObat)
  const [cari, setCari] = useState('')
  const [kategori, setKategori] = useState('Semua')
  const [notif, setNotif] = useState('')

  const hasil = useMemo(() => {
    const kata = cari.trim().toLowerCase()
    return daftar.filter(
      (item) =>
        (!kata || item.nama.toLowerCase().includes(kata) || item.id.toLowerCase().includes(kata)) &&
        (kategori === 'Semua' || item.kategori === kategori),
    )
  }, [daftar, cari, kategori])

  const menipis = daftar.filter((item) => item.stok < item.minimum)
  const nilaiStok = daftar.reduce((total, item) => total + item.stok * item.harga, 0)

  const tambahStok = (id) => {
    setDaftar((data) =>
      data.map((item) =>
        item.id === id ? { ...item, stok: item.stok + Math.max(item.minimum, 200) } : item,
      ),
    )
    setNotif('Stok obat berhasil ditambahkan dan disinkronkan ke apotek.')
    setTimeout(() => setNotif(''), 4000)
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Farmasi & Apotek</h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Pantau ketersediaan obat dan nilai persediaan gudang farmasi
        </p>
      </div>

      {notif && (
        <div className="animate-fade-in rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {notif}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: 'Jenis Obat',
            nilai: `${daftar.length} item`,
            ket: 'Terdaftar di formularium',
            Icon: Boxes,
            warna: 'bg-sky-50 text-sky-600 ring-sky-100',
          },
          {
            label: 'Stok Menipis',
            nilai: `${menipis.length} item`,
            ket: 'Di bawah batas minimum',
            Icon: CircleAlert,
            warna: 'bg-rose-50 text-rose-600 ring-rose-100',
          },
          {
            label: 'Nilai Persediaan',
            nilai: formatRupiah(nilaiStok),
            ket: 'Estimasi harga beli',
            Icon: Wallet,
            warna: 'bg-brand-50 text-brand-600 ring-brand-100',
          },
        ].map((kartu, index) => (
          <div
            key={kartu.label}
            className="card animate-fade-up flex items-center gap-4 p-5"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl ring-1 ${kartu.warna}`}>
              <kartu.Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                {kartu.label}
              </p>
              <p className="mt-0.5 truncate text-lg font-extrabold text-slate-900">{kartu.nilai}</p>
              <p className="text-[11px] text-slate-400">{kartu.ket}</p>
            </div>
          </div>
        ))}
      </div>

      {menipis.length > 0 && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5">
          <CircleAlert className="mt-0.5 size-5 shrink-0 text-amber-600" />
          <div className="text-sm">
            <p className="font-semibold text-amber-800">
              {menipis.length} obat perlu segera dipesan ulang
            </p>
            <p className="mt-0.5 text-xs text-amber-700">
              {menipis.map((item) => item.nama).join(', ')}
            </p>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <input
              value={cari}
              onChange={(event) => setCari(event.target.value)}
              placeholder="Cari nama atau kode obat…"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pr-3 pl-9 text-sm transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {kategoriList.map((opsi) => (
              <button
                key={opsi}
                type="button"
                onClick={() => setKategori(opsi)}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                  kategori === opsi
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {opsi}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                <th className="px-4 py-3">Obat</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Stok</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hasil.map((item) => {
                const rasio = Math.min((item.stok / item.minimum) * 100, 100)
                const kritis = item.stok < item.minimum
                return (
                  <tr key={item.id} className="transition hover:bg-brand-50/40">
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-slate-800">{item.nama}</p>
                      <p className="text-[11px] text-slate-400">{item.id}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-semibold text-slate-800">
                        {formatAngka(item.stok)}{' '}
                        <span className="text-[11px] font-normal text-slate-400">{item.satuan}</span>
                      </p>
                      <div className="mt-1 h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${kritis ? 'bg-rose-500' : 'bg-brand-500'}`}
                          style={{ width: `${rasio}%` }}
                        />
                      </div>
                      <p className="mt-1 text-[10px] text-slate-400">min. {item.minimum}</p>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">{formatRupiah(item.harga)}</td>
                    <td className="px-4 py-3.5">
                      <Badge status={kritis ? 'Stok Menipis' : 'Aman'} />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => tambahStok(item.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                      >
                        <PackagePlus className="size-3.5" /> Restock
                      </button>
                    </td>
                  </tr>
                )
              })}
              {hasil.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-500">
                    Tidak ada obat yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-2 border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
          <TrendingUp className="size-4 text-brand-600" />
          Rata-rata penggunaan obat bulan ini naik 6,4% dibanding bulan lalu.
        </div>
      </div>
    </div>
  )
}
