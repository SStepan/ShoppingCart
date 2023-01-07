import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { About } from './pages/About'
import { Navbar } from './components/Navbar'
import { Container } from 'react-bootstrap'
import { ShoppingCardProvider } from './context/ShoppingCartContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ShoppingCardProvider>
      <Navbar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Container>
    </ShoppingCardProvider>
  )
}

export default App
