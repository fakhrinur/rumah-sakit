import { useId, useState } from 'react'

function buatPath(points) {
  if (points.length < 2) return ''
  let d = `M${points[0].x},${points[0].y}`
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i]
    const p1 = points[i + 1]
    const cx = (p0.x + p1.x) / 2
    d += ` C${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`
  }
  return d
}

export default function AreaChart({ data, height = 260, color = '#069182' }) {
  const id = useId()
  const [aktif, setAktif] = useState(null)

  const lebar = 720
  const tinggi = 260
  const padding = { atas: 18, kanan: 12, bawah: 34, kiri: 34 }

  const nilaiMaks = Math.max(...data.map((d) => d.value))
  // Bulatkan batas atas ke kelipatan 20 agar label sumbu tetap rapi
  const batasAtas = Math.ceil((nilaiMaks + 8) / 20) * 20

  const x = (index) =>
    padding.kiri + (index * (lebar - padding.kiri - padding.kanan)) / (data.length - 1)
  const y = (value) =>
    tinggi - padding.bawah - (value / batasAtas) * (tinggi - padding.atas - padding.bawah)

  const points = data.map((d, i) => ({ x: x(i), y: y(d.value) }))
  const garis = buatPath(points)
  const area = `${garis} L${x(data.length - 1)},${tinggi - padding.bawah} L${x(0)},${tinggi - padding.bawah} Z`

  const garisGrid = [0, 0.25, 0.5, 0.75, 1].map((rasio) => {
    const nilai = Math.round(batasAtas * rasio)
    return { y: y(nilai), nilai }
  })

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${lebar} ${tinggi}`}
        style={{ height }}
        className="w-full overflow-visible"
        role="img"
        aria-label="Grafik kunjungan pasien"
      >
        <defs>
          <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`line-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#22d3b8" />
          </linearGradient>
        </defs>

        {garisGrid.map((grid) => (
          <g key={grid.nilai}>
            <line
              x1={padding.kiri}
              x2={lebar - padding.kanan}
              y1={grid.y}
              y2={grid.y}
              stroke="#e2e8f0"
              strokeDasharray="4 6"
            />
            <text x={0} y={grid.y + 4} className="fill-slate-400 text-[11px]">
              {grid.nilai}
            </text>
          </g>
        ))}

        <path d={area} fill={`url(#area-${id})`} />
        <path
          d={garis}
          fill="none"
          stroke={`url(#line-${id})`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {points.map((point, index) => (
          <g key={data[index].label}>
            <circle
              cx={point.x}
              cy={point.y}
              r={aktif === index ? 5.5 : 3.5}
              fill="#fff"
              stroke={color}
              strokeWidth="2.5"
              className="transition-all"
            />
            <rect
              x={point.x - (lebar - padding.kiri - padding.kanan) / (data.length - 1) / 2}
              y={padding.atas}
              width={(lebar - padding.kiri - padding.kanan) / (data.length - 1)}
              height={tinggi - padding.atas - padding.bawah}
              fill="transparent"
              onMouseEnter={() => setAktif(index)}
              onMouseLeave={() => setAktif(null)}
              className="cursor-pointer"
            />
            <text
              x={point.x}
              y={tinggi - 10}
              textAnchor="middle"
              className={`text-[11px] ${aktif === index ? 'fill-slate-700 font-semibold' : 'fill-slate-400'}`}
            >
              {data[index].label}
            </text>
          </g>
        ))}
      </svg>

      {aktif !== null && (
        <div
          className="animate-fade-in pointer-events-none absolute z-10 -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg"
          style={{
            left: `${(points[aktif].x / lebar) * 100}%`,
            top: `${Math.max((points[aktif].y / tinggi) * height - 70, 0)}px`,
          }}
        >
          <p className="text-[11px] font-medium text-slate-500">{data[aktif].subLabel}</p>
          <p className="text-sm font-bold text-slate-900">{data[aktif].value} kunjungan</p>
        </div>
      )}
    </div>
  )
}
