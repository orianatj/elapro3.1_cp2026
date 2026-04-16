import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './pages/teacher/teacher.css'
import App from './pages/teacher/teacher.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
