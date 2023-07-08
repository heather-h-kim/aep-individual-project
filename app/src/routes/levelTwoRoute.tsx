import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import Game from '../components/Game';

const levelTwoRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/game-level2/$level',
  component: Game,
});

export default levelTwoRoute;
