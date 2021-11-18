import Main from './pages/main';
import Auth from './pages/auth';

const routes = [
  {
    path: 'auth',
    name: 'Войти',
    display: true,
    component: <Auth/>,
  },
  {
    path: 'auth',
    name: 'Регистрация',
    display: true,
    component: <Auth/>,
  },
  {
    path: '/',
    name: 'Главная',
    display: false,
    component: <Main/>,
  }
];

export default routes;
