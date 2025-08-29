import React ,{}from 'react'
import { Header,Footer } from './components/index.js'
import { Outlet } from 'react-router-dom'

const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])


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
