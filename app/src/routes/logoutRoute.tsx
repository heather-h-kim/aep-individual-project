import { rootRoute } from './rootRoute';
import Logout from '../components/Logout';
import { Route } from '@tanstack/react-router';

const logoutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/logout',
  component: () => {
    return <Logout />;
  },
});

export default logoutRoute;
