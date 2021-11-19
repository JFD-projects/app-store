import Auth from './auth';
import Dashboard from './dashboard';

const routes = [
  {
    path: 'auth',
    name: 'Войти',
    display: true,
    component: <Auth />,
  },
  {
    path: 'auth',
    name: 'Регистрация',
    display: true,
    component: <Auth />,
  },
  {
    path: 'dashboard',
    name: 'Dashboard',
    display: true,
    component: <Dashboard />,
  },
];

export default routes;
