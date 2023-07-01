import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';

const gameRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/game',
});

export default gameRoute;
