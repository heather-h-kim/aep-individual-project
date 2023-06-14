import { Route } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';
import PublicHome from '../components/PublicHome';

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    return <PublicHome />;
  },
});

export default indexRoute;
