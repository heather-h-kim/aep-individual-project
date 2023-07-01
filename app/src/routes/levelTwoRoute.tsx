import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import LevelTwo from '../components/LevelTwo';
import Game from '../components/Game';
import gameRoute from './gameRoute';

const levelTwoRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/game/2',
  component: Game,
});

export default levelTwoRoute;
