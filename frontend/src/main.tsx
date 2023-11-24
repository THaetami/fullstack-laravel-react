import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import { ContextProvider } from './contexts/ContextProvider.tsx'
import './styles/index.css'
import './styles/index.scss'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider >
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)
