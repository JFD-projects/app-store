import React from 'react';
import routes from '../../routes';
import { useLocation, NavLink } from 'react-router-dom';
import Container from '../common/container';

const NavBar = () => {
  const location = useLocation().pathname;

  return (
    <header className='navbar-dark bg-primary mb-4'>
      <Container>
        <nav className='navbar navbar-expand-sm'>
          <NavLink className='navbar-brand' to='/'>
            Главная
          </NavLink>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse justify-content-end' id='navbarSupportedContent'>
            <div className='navbar-nav'>
              {routes.map((prop, key) => {
                if (prop.display !== false) {
                  return (
                    <NavLink
                      to={prop.path}
                      key={key}
                      className={'nav-link fs-5' + (prop.path === location ? ' active' : '')}>
                      {prop.name}
                    </NavLink>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default NavBar;
