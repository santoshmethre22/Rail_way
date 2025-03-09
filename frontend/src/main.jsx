import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { UserContextProvider } from './context/userContext.jsx'
import { TrainContextProvider } from './context/trainContex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   < UserContextProvider>
   <TrainContextProvider>

    <App />

   </TrainContextProvider>
   </UserContextProvider>

  </StrictMode>,
)
