const gaya = {
  Menunggu: 'bg-amber-50 text-amber-700 ring-amber-200',
  Diperiksa: 'bg-sky-50 text-sky-700 ring-sky-200',
  Selesai: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Batal: 'bg-rose-50 text-rose-700 ring-rose-200',
  Aktif: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Cuti: 'bg-slate-100 text-slate-600 ring-slate-200',
  'Rawat Inap': 'bg-violet-50 text-violet-700 ring-violet-200',
  'Rawat Jalan': 'bg-sky-50 text-sky-700 ring-sky-200',
  'Stok Menipis': 'bg-rose-50 text-rose-700 ring-rose-200',
  Aman: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
}

export default function Badge({ status, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${
        gaya[status] ?? 'bg-slate-100 text-slate-600 ring-slate-200'
      } ${className}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
