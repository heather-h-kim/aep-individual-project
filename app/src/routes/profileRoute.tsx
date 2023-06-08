import { rootRoute } from './rootRoute';
import Profile from '../components/Profile';
import { Route } from '@tanstack/react-router';

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => {
    return <Profile />;
  },
});

export default profileRoute;
