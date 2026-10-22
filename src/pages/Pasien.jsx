import { useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import Badge from '../components/Badge.jsx'
import { pasien as dataAwal } from '../data/mock.js'

const opsiStatus = ['Semua', 'Rawat Jalan', 'Rawat Inap', 'Selesai']
const opsiPoli = ['Penyakit Dalam', 'Anak', 'Kandungan', 'Bedah', 'Mata', 'Jantung']
const perHalaman = 6

const formKosong = {
  nama: '',
  umur: '',
  jenisKelamin: 'Laki-laki',
  telepon: '',
  poli: 'Penyakit Dalam',
  penjamin: 'BPJS Kesehatan',
}

function ModalTambah({ onTutup, onSimpan }) {
  const [form, setForm] = useState(formKosong)
  const [salah, setSalah] = useState({})

  const ubah = (key) => (event) => {
    setForm((data) => ({ ...data, [key]: event.target.value }))
    setSalah((data) => ({ ...data, [key]: '' }))
  }

  function simpan(event) {
    event.preventDefault()
    const galat = {}
    if (!form.nama.trim()) galat.nama = 'Nama pasien wajib diisi.'
    if (!form.umur || Number(form.umur) <= 0) galat.umur = 'Umur harus lebih dari 0.'
    if (!/^[0-9\s-]{8,}$/.test(form.telepon)) galat.telepon = 'Nomor telepon tidak valid.'
    if (Object.keys(galat).length) return setSalah(galat)
    onSimpan(form)
  }

  const kelasInput =
    'h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10 focus:outline-none'

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="animate-scale-in w-full max-w-lg rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Tambah Pasien Baru</h3>
            <p className="text-xs text-slate-500">Lengkapi data identitas pasien</p>
          </div>
          <button
            type="button"
            onClick={onTutup}
            className="grid size-9 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Tutup"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={simpan} noValidate className="space-y-4 px-5 py-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Nama Lengkap</label>
            <input
              value={form.nama}
              onChange={ubah('nama')}
              placeholder="Nama sesuai KTP"
              className={kelasInput}
            />
            {salah.nama && <p className="mt-1 text-xs text-rose-600">{salah.nama}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Umur (tahun)</label>
              <input
                type="number"
                min="1"
                value={form.umur}
                onChange={ubah('umur')}
                placeholder="30"
                className={kelasInput}
              />
              {salah.umur && <p className="mt-1 text-xs text-rose-600">{salah.umur}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Jenis Kelamin</label>
              <select value={form.jenisKelamin} onChange={ubah('jenisKelamin')} className={kelasInput}>
                <option>Laki-laki</option>
                <option>Perempuan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">No. Telepon</label>
            <input
              value={form.telepon}
              onChange={ubah('telepon')}
              placeholder="0812-3456-7890"
              className={kelasInput}
            />
            {salah.telepon && <p className="mt-1 text-xs text-rose-600">{salah.telepon}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Poli Tujuan</label>
              <select value={form.poli} onChange={ubah('poli')} className={kelasInput}>
                {opsiPoli.map((poli) => (
                  <option key={poli}>{poli}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Penjamin</label>
              <select value={form.penjamin} onChange={ubah('penjamin')} className={kelasInput}>
                <option>BPJS Kesehatan</option>
                <option>Asuransi Swasta</option>
                <option>Umum</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onTutup}
              className="h-11 flex-1 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="h-11 flex-1 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:from-brand-700 hover:to-brand-600"
            >
              Simpan Pasien
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Pasien() {
  const [daftar, setDaftar] = useState(dataAwal)
  const [cari, setCari] = useState('')
  const [status, setStatus] = useState('Semua')
  const [halaman, setHalaman] = useState(1)
  const [modal, setModal] = useState(false)
  const [notif, setNotif] = useState('')

  const hasil = useMemo(() => {
    const kata = cari.trim().toLowerCase()
    return daftar.filter((item) => {
      const cocokKata =
        !kata ||
        item.nama.toLowerCase().includes(kata) ||
        item.id.toLowerCase().includes(kata) ||
        item.poli.toLowerCase().includes(kata)
      const cocokStatus = status === 'Semua' || item.status === status
      return cocokKata && cocokStatus
    })
  }, [daftar, cari, status])

  const totalHalaman = Math.max(1, Math.ceil(hasil.length / perHalaman))
  const halamanAktif = Math.min(halaman, totalHalaman)
  const potongan = hasil.slice((halamanAktif - 1) * perHalaman, halamanAktif * perHalaman)

  const tambahPasien = (form) => {
    const nomor = String(daftar.length + 1).padStart(3, '0')
    setDaftar((data) => [
      {
        id: `RM-2026-${nomor}`,
        nama: form.nama,
        umur: Number(form.umur),
        jenisKelamin: form.jenisKelamin,
        telepon: form.telepon,
        poli: form.poli,
        status: 'Rawat Jalan',
        tanggal: '22 Okt 2026',
        penjamin: form.penjamin,
      },
      ...data,
    ])
    setModal(false)
    setHalaman(1)
    setNotif(`Pasien ${form.nama} berhasil ditambahkan.`)
    setTimeout(() => setNotif(''), 4000)
  }

  const hapus = (id) => {
    setDaftar((data) => data.filter((item) => item.id !== id))
    setNotif('Data pasien berhasil dihapus.')
    setTimeout(() => setNotif(''), 4000)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Data Pasien</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            {daftar.length} pasien terdaftar · terakhir diperbarui hari ini
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:from-brand-700 hover:to-brand-600 focus-ring"
        >
          <Plus className="size-4" /> Tambah Pasien
        </button>
      </div>

      {notif && (
        <div className="animate-fade-in rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {notif}
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <input
              value={cari}
              onChange={(event) => {
                setCari(event.target.value)
                setHalaman(1)
              }}
              placeholder="Cari nama, No. RM, atau poli…"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pr-3 pl-9 text-sm transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="size-4 text-slate-400" />
            <div className="flex flex-wrap gap-1.5">
              {opsiStatus.map((opsi) => (
                <button
                  key={opsi}
                  type="button"
                  onClick={() => {
                    setStatus(opsi)
                    setHalaman(1)
                  }}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                    status === opsi
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {opsi}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                <th className="px-4 py-3">Pasien</th>
                <th className="px-4 py-3">Umur / JK</th>
                <th className="px-4 py-3">Kontak</th>
                <th className="px-4 py-3">Poli</th>
                <th className="px-4 py-3">Penjamin</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {potongan.map((item) => (
                <tr key={item.id} className="transition hover:bg-brand-50/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-xs font-bold text-slate-600">
                        {item.nama
                          .split(' ')
                          .slice(0, 2)
                          .map((kata) => kata[0])
                          .join('')}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-800">{item.nama}</p>
                        <p className="text-[11px] text-slate-400">
                          {item.id} · {item.tanggal}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {item.umur} th · {item.jenisKelamin === 'Laki-laki' ? 'L' : 'P'}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.telepon}</td>
                  <td className="px-4 py-3 text-slate-600">{item.poli}</td>
                  <td className="px-4 py-3 text-slate-600">{item.penjamin}</td>
                  <td className="px-4 py-3">
                    <Badge status={item.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="grid size-8 place-items-center rounded-lg text-slate-400 transition hover:bg-brand-50 hover:text-brand-700"
                        aria-label={`Ubah ${item.nama}`}
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => hapus(item.id)}
                        className="grid size-8 place-items-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                        aria-label={`Hapus ${item.nama}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {potongan.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <p className="text-sm font-semibold text-slate-700">Pasien tidak ditemukan</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Coba ubah kata kunci atau filter status.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Menampilkan{' '}
            <span className="font-semibold text-slate-700">
              {hasil.length === 0 ? 0 : (halamanAktif - 1) * perHalaman + 1}–
              {Math.min(halamanAktif * perHalaman, hasil.length)}
            </span>{' '}
            dari <span className="font-semibold text-slate-700">{hasil.length}</span> pasien
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setHalaman((h) => Math.max(1, h - 1))}
              disabled={halamanAktif === 1}
              className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: totalHalaman }, (_, index) => index + 1).map((nomor) => (
              <button
                key={nomor}
                type="button"
                onClick={() => setHalaman(nomor)}
                className={`size-8 rounded-lg text-xs font-semibold transition ${
                  halamanAktif === nomor
                    ? 'bg-brand-600 text-white'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {nomor}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setHalaman((h) => Math.min(totalHalaman, h + 1))}
              disabled={halamanAktif === totalHalaman}
              className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {modal && <ModalTambah onTutup={() => setModal(false)} onSimpan={tambahPasien} />}
    </div>
  )
}
