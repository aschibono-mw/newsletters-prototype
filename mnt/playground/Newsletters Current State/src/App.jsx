import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MwNewslettersCurrentPage from './pages/MwNewslettersCurrentPage.jsx'
import MwNewslettersCurrentCreatePage from './pages/MwNewslettersCurrentCreatePage.jsx'
import MwNewslettersCurrentEditorPage from './pages/MwNewslettersCurrentEditorPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/mw-newsletters-current" replace />} />
        <Route path="/mw-newsletters-current" element={<MwNewslettersCurrentPage />} />
        <Route path="/mw-newsletters-current/create" element={<MwNewslettersCurrentCreatePage />} />
        <Route path="/mw-newsletters-current/editor/:id" element={<MwNewslettersCurrentEditorPage />} />
        <Route path="*" element={<Navigate to="/mw-newsletters-current" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
