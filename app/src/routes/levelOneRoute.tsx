import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import LevelOne from '../components/LevelOne';
import Game from '../components/Game';
import gameRoute from './gameRoute';

const levelOneRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/game-level1/$level',
  component: Game,
});

export default levelOneRoute;
