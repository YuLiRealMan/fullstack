import { Provider } from "@/components/ui/provider"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <BrowserRouter>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>

  </React.StrictMode>
)


