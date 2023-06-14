import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import Rankings from '../components/Rankings';

const rankingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/rankings',
  component: () => {
    return <Rankings />;
  },
});

export default rankingsRoute;
