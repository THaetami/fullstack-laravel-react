import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import DefaultLayout from './component/DefaultLayout';
import GuestLayout from './component/GuestLayout';
import Report from './views/Report';
import CashBank from './views/CashBank';

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

const routerConfig: RouteConfig[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" />,
      },
      {
        path: '/home',
        element: <Dashboard />,
      },
      {
        path: '/report',
        element: <Report />,
      },
      {
        path: '/cash',
        element: <CashBank />
      },
    ],
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
