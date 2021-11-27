import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Container from '../common/container'

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggle = () => {
    setIsVisible(!isVisible)
  }

  return (
    <header className="navbar-dark bg-primary mb-4">
      <Container>
        <nav className="navbar navbar-expand-sm">
          <NavLink className="navbar-brand" to="/">
            Главная
          </NavLink>
          <button
            className={'navbar-toggler ' + (isVisible ? '' : 'collapsed')}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isVisible}
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" onClick={handleToggle}></span>
          </button>
          <div
            className={'collapse navbar-collapse justify-content-end ' + (isVisible ? ' show' : '')}
            id="navbarSupportedContent">
            <ul className="navbar-nav">
              <NavLink to={'/catalog'} className="nav-link fs-5">
                Каталог
              </NavLink>
              <NavLink to={'/dashboard'} className="nav-link fs-5">
                Dashboard
              </NavLink>
              <NavLink to={'/auth'} className="nav-link fs-5">
                Login
              </NavLink>
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default NavBar
