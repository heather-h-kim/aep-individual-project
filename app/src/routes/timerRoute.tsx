import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import Timer from '../components/Timer';

const timerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/timer',
  component: () => {
    return <Timer />;
  },
});

export default timerRoute;
