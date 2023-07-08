import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import Game from '../components/Game';

const levelThreeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/game-level3/$level',
  component: Game,
});

export default levelThreeRoute;
