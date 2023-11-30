import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import { ContextProvider } from './contexts/ContextProvider.tsx'
import './styles/index.css'
import './styles/index.scss'
import { HelmetProvider } from 'react-helmet-async'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ContextProvider >
        <RouterProvider router={router} />
      </ContextProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
