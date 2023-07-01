import { Outlet, RootRoute, Router } from '@tanstack/react-router';
import Navbar from '../components/Navbar';
import indexRoute from './indexRoute';
import loginRoute from './loginRoute';
import logoutRoute from './logoutRoute';
import profileRoute from './profileRoute';
import demoRoute from './demoRoute';
import adminRoute from './adminRoute';
import levelOneRoute from './levelOneRoute';
import rankingsRoute from './rankingsRoute';
import timerRoute from './timerRoute';
import loginHomeRoute from './loginHomeRoute';
import levelTwoRoute from './levelTwoRoute';
import levelThreeRoute from './levelThreeRoute';
import levelFourRoute from './levelFourRoute';
import gameRoute from './gameRoute';
import gameIndexRoute from './gameIndexRoute';

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
  demoRoute,
  adminRoute,
  rankingsRoute,
  timerRoute,
  loginHomeRoute,
  levelOneRoute,
  levelTwoRoute,
  levelThreeRoute,
  levelFourRoute,
]);

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
