import React, { useState } from 'react';
import routes from '../../routes/routes';
import { useLocation, NavLink } from 'react-router-dom';

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const location = useLocation().pathname;

  const handleToggle = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <nav className='navbar navbar-expand-sm'>
      <NavLink className='navbar-brand' to='/'>
        Главная
      </NavLink>
      <button
        className={'navbar-toggler ' + (isVisible ? '' : 'collapsed')}
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded={isVisible}
        aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon' onClick={handleToggle}></span>
      </button>
      <div
        className={'collapse navbar-collapse justify-content-end ' + (isVisible ? ' show' : '')}
        id='navbarSupportedContent'>
        <ul className='navbar-nav'>
          {routes.map((prop, key) => {
            if (prop.display !== false) {
              return (
                <li key={key} className='nav-item'>
                  <NavLink
                    to={'/' + prop.path}
                    className={'nav-link fs-5' + ('/' + prop.path === location ? ' active' : '')}>
                    {prop.name}
                  </NavLink>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
