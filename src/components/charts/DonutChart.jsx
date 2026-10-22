export default function DonutChart({ segments, total, size = 168, thickness = 16, centerLabel, centerValue }) {
  const radius = (size - thickness) / 2
  const keliling = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label={centerLabel}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={thickness}
        />
        {segments.map((segment) => {
          const panjang = (segment.value / total) * keliling
          const elemen = (
            <circle
              key={segment.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={`${Math.max(panjang - 4, 0)} ${keliling}`}
              strokeDashoffset={-offset}
              className="transition-all duration-500"
            />
          )
          offset += panjang
          return elemen
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-extrabold tracking-tight text-slate-900">{centerValue}</span>
        <span className="mt-0.5 max-w-24 text-[11px] leading-tight font-medium text-slate-500">
          {centerLabel}
        </span>
      </div>
    </div>
  )
}
