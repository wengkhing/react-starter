import { RouteProps } from 'react-router-dom';
import AuthPage from './page/Auth/Auth';
import HomePage from './page/Home/Home';

const appRoutes: RouteProps[] = [
  {
    path: '/auth',
    component: AuthPage,
  },
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
];

export default appRoutes;
