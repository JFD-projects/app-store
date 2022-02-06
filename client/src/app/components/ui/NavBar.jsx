import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from '../common/container'
import { useSelector } from 'react-redux'
import { getUserIsAdmin, getUserIsLoggedIn } from '../../store/user'

const NavBar = () => {
  const isLoggedInUser = useSelector(getUserIsLoggedIn())
  const isAdmin = useSelector(getUserIsAdmin())
  const [isVisible, setIsVisible] = useState(false)

  const handleToggle = () => {
    setIsVisible(!isVisible)
  }

  return (
    <header className="navbar-dark bg-primary mb-4">
      <nav className="navbar navbar-expand-sm">
        <Container>
          <NavLink className="navbar-brand" to="/">
            App
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-apple"
              viewBox="0 0 16 16">
              <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
              <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
            </svg>
            <sup>le</sup> Store
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
              {isAdmin && (
                <NavLink to={'/dashboard'} className="nav-link fs-5">
                  <i className="bi bi-pencil-square me-2"></i>
                  Кабинет
                </NavLink>
              )}
              <NavLink to={'/basket'} className="nav-link fs-5 me-2">
                <i className="bi bi-cart"></i>
                Корзина
              </NavLink>
              {isLoggedInUser ? (
                <Link to="logout" className="nav-link fs-5" role="button" title="Выйти">
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Выйти
                </Link>
              ) : (
                <NavLink to={'/login'} className="nav-link fs-5" placeholder="Войти">
                  <i className="bi bi-box-arrow-in-left me-2"></i>
                  Войти
                </NavLink>
              )}
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  )
}

export default NavBar
