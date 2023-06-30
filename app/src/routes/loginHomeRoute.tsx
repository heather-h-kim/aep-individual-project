import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import LoginHome from '../components/LoginHome';

const loginHomeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/loginHome',
  component: () => {
    return <LoginHome />;
  },
});

export default loginHomeRoute;
