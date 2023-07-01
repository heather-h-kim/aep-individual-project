import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import LevelOne from '../components/LevelOne';
import Game from '../components/Game';
import gameRoute from './gameRoute';

const levelOneRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/game/1',
  component: Game,
});

export default levelOneRoute;
