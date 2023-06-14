import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import Admin from '../components/Admin';

const adminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => {
    return <Admin />;
  },
});

export default adminRoute;
