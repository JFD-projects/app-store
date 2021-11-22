import React from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import NavBar from '../components/ui/NavBar'
import Container from '../components/common/container'
import SearchProduct from '../components/ui/searchProduct'
import Catalog from './catalog'

const Main = () => {
  const location = useLocation().pathname

  return (
    <>
      <header className="navbar-dark bg-primary mb-4">
        <Container>
          <NavBar />
        </Container>
      </header>
      <main>
        <Container>
          <SearchProduct />
          {location === '/' ? <Catalog /> : <Outlet />}
        </Container>
      </main>
    </>
  )
}

export default Main
