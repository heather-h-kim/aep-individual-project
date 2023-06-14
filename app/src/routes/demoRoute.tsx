import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import Demo from '../components/Demo';

const demoRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/demo',
  component: () => {
    return <Demo />;
  },
});

export default demoRoute;
