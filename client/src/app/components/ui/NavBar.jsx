import React, { useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import apple from '../../assets/img/apple.svg'
import { getSumCountsOfBasket, getUserIsAdmin, getUserIsLoggedIn } from '../../store/user'
import Container from '../common/container'

const NavBar = () => {
  const isLoggedInUser = useSelector(getUserIsLoggedIn())
  const isAdmin = useSelector(getUserIsAdmin())
  const [isVisible, setIsVisible] = useState(false)
  const count = useSelector(getSumCountsOfBasket())

  const handleToggle = () => {
    setIsVisible(!isVisible)
  }

  return (
    <header className="navbar-dark bg-primary mb-4">
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink className="navbar-brand" to="/">
            App
            <img src={apple} alt="Logo apple" />
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
          <Nav
            className={'collapse navbar-collapse justify-content-end ' + (isVisible ? ' show' : '')}
            id="navbarSupportedContent">
            <ul className="navbar-nav">
              {isAdmin && (
                <NavLink to={'/dashboard'} className="nav-link fs-5">
                  <i className="bi bi-pencil-square me-2"></i>
                  Кабинет
                </NavLink>
              )}
              <NavLink to={isLoggedInUser ? '/basket' : '/login'} className="nav-link fs-5 position-relative">
                <i className="bi bi-cart me-2"></i>
                Корзина
                <span className={'ms-1 badge bg-' + (count ? 'danger' : 'secondary')}>
                  {count ? count : 'Пусто'}
                </span>
              </NavLink>
              {isLoggedInUser ? (
                <Link to="/logout" className="nav-link fs-5" role="button">
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Выйти
                </Link>
              ) : (
                <NavLink to={'/login'} className="nav-link fs-5">
                  <i className="bi bi-box-arrow-in-left me-2"></i>
                  Войти
                </NavLink>
              )}
            </ul>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default NavBar
