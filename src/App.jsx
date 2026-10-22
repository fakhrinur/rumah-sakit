import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Pasien from './pages/Pasien.jsx'
import Dokter from './pages/Dokter.jsx'
import Jadwal from './pages/Jadwal.jsx'
import Farmasi from './pages/Farmasi.jsx'
import Laporan from './pages/Laporan.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/pasien" element={<Pasien />} />
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/farmasi" element={<Farmasi />} />
        <Route path="/laporan" element={<Laporan />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
