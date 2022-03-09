import { Suspense, lazy } from 'react';
import type { PartialRouteObject } from 'react-router';
import AuthGuard from './components/AuthGuard';
import Layout from './components/dashboard/Layout';
import GuestGuard from './components/GuestGuard';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<div></div>}>
    <Component {...props} />
  </Suspense>
);

const Login = Loadable(lazy(() => import('./pages/authentication/Login')));
const Inicio = Loadable(lazy(() => import('./pages/dashboard/Inicio')));
const routes: PartialRouteObject[] = [
  {
    path: '/',
    children: [
      {
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        )
      },
      {
        path: 'login-unguarded',
        element: <Login />
      }
    ]
  },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        element: <Inicio />
      }
    ]
  }
];

export default routes;
