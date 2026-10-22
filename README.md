# RS Sehat Sentosa — Dashboard Rumah Sakit

Aplikasi dashboard rumah sakit dengan halaman login, dibangun dengan **React 19 + Vite + Tailwind CSS v4**.
Seluruh antarmuka menggunakan Bahasa Indonesia.

## Menjalankan

```bash
npm install     # sekali saja
npm run dev     # buka http://localhost:5173
```

Perintah lain:

```bash
npm run build     # build produksi ke folder dist/
npm run preview   # cek hasil build secara lokal
```

## Akun demo

| Peran         | Email                     | Kata sandi |
| ------------- | ------------------------- | ---------- |
| Administrator | `admin@sehatsentosa.id`   | `admin123` |
| Dokter        | `dokter@sehatsentosa.id`  | `dokter123` |

Di halaman login tersedia tombol akun demo yang otomatis mengisi formulir. Login juga menampilkan
pesan error jika email/kata sandi salah, serta validasi input sebelum dikirim.

## Halaman

| Rute       | Isi                                                                              |
| ---------- | -------------------------------------------------------------------------------- |
| `/login`   | Halaman masuk: validasi, show/hide sandi, akun demo, tampilan dua kolom responsif |
| `/`        | Dashboard: 4 kartu statistik, grafik kunjungan 7 hari, okupansi bed, pasien per poli, aktivitas, tabel janji temu |
| `/pasien`  | Tabel pasien dengan pencarian, filter status, pagination, dan modal tambah pasien |
| `/dokter`  | Kartu profil dokter dengan pencarian dan filter status                           |
| `/jadwal`  | Jadwal praktik per hari (tab Senin–Minggu)                                       |
| `/farmasi` | Stok obat, peringatan stok menipis, aksi restock                                  |
| `/laporan` | Metrik kinerja, grafik pendapatan bulanan, komposisi penjamin, kinerja per poli   |

## Struktur proyek

```
src/
├── components/
│   ├── charts/        # AreaChart & DonutChart (SVG murni, tanpa library chart)
│   ├── Badge.jsx      # badge status
│   ├── Layout.jsx     # kerangka sidebar + topbar + konten
│   ├── ProtectedRoute.jsx
│   ├── Sidebar.jsx
│   ├── StatCard.jsx
│   └── Topbar.jsx
├── data/mock.js       # semua data contoh + helper format angka/rupiah
├── lib/auth.jsx       # AuthProvider, useAuth, daftar akun demo
├── pages/             # Login, Dashboard, Pasien, Dokter, Jadwal, Farmasi, Laporan
├── App.jsx            # definisi rute
├── index.css          # Tailwind + tema warna brand + animasi
└── main.jsx
```

## Catatan tentang autentikasi

Login pada proyek ini **hanya simulasi di sisi klien**: akun diperiksa dari daftar di
`src/lib/auth.jsx`, lalu sesi disimpan di `localStorage` (kunci `rs-sehat-sentosa.auth`).
Untuk aplikasi nyata, ganti fungsi `login()` dengan request ke API dan gunakan token/cookie
dari server — jangan pernah menyimpan kata sandi di kode frontend.

## Kustomisasi cepat

- **Warna brand**: ubah `--color-brand-*` di `src/index.css`.
- **Data contoh**: semuanya ada di `src/data/mock.js` (pasien, dokter, obat, jadwal, statistik).
- **Menu sidebar**: daftar `menu` di `src/components/Sidebar.jsx`.
- **Nama rumah sakit / logo**: `src/components/Sidebar.jsx`, `src/pages/Login.jsx`, `index.html`.
