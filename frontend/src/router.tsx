import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import NotFound from './views/NotFound';
import DefaultLayout from './component/DefaultLayout';
import GuestLayout from './component/GuestLayout';
import Report from './views/Report';
import CashBank from './views/CashBank';
import Sales from './views/Sales';
import Purchases from './views/Purchases';
import Expense from './views/Expense';

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
        element: <Home />,
      },
      {
        path: '/report',
        element: <Report />,
      },
      {
        path: '/cash',
        element: <CashBank />
      },
      {
        path: '/sales',
        element: <Sales />
      },
      {
        path: '/purchases',
        element: <Purchases />
      },
      {
        path: '/expense',
        element: <Expense />
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
