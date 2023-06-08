import { Outlet, RootRoute, Router } from '@tanstack/react-router';
import Navbar from '../components/Navbar';
import indexRoute from './indexRoute';
import loginRoute from './loginRoute';
import logoutRoute from './logoutRoute';
import profileRoute from './profileRoute';

export const rootRoute = new RootRoute({
  component: () => (
    <div>
      <Navbar />
      <Outlet />
    </div>
  ),
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  logoutRoute,
  profileRoute,
]);

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
