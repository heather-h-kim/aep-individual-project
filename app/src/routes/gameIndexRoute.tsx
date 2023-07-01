import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import LevelOne from '../components/LevelOne';
import Game from '../components/Game';
import gameRoute from './gameRoute';

const gameIndexRoute = new Route({
  getParentRoute: () => gameRoute,
  path: '/',
  component: Game,
});

export default gameIndexRoute;
