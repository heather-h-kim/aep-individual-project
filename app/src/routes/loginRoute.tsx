import { rootRoute } from './rootRoute';
import Login from '../components/Login';
import { Route } from '@tanstack/react-router';

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => {
    return <Login />;
  },
});

export default loginRoute;
