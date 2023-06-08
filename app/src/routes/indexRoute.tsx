import { Route } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
});

export default indexRoute;
