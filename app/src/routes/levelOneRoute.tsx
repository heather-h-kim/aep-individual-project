import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import Game from '../components/Game';

const levelOneRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/game-level1/$level',
  component: Game,
});

export default levelOneRoute;
