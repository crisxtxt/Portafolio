import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './shared/components/layout/AppShell'
import { ScrollToTop } from './shared/components/layout/ScrollToTop'

const HomePage = lazy(() => import('./home/HomePage').then((module) => ({ default: module.HomePage })))
const ProjectsPage = lazy(() => import('./projects/ProjectsPage').then((module) => ({ default: module.ProjectsPage })))
const ProjectDetailPage = lazy(() =>
  import('./projects/ProjectDetailPage').then((module) => ({ default: module.ProjectDetailPage })),
)
const StudioPage = lazy(() => import('./studio/StudioPage').then((module) => ({ default: module.StudioPage })))
const ContactPage = lazy(() => import('./contact/ContactPage').then((module) => ({ default: module.ContactPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="proyectos" element={<ProjectsPage />} />
          <Route path="proyectos/:slug" element={<ProjectDetailPage />} />
          <Route path="estudio" element={<StudioPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App