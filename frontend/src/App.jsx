import React ,{}from 'react'
import { Header,Footer } from './components/index.js'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      
      <Header />
        <main >
          <Outlet />
        </main>
      <Footer />
    </div>
  )
}

export default App
