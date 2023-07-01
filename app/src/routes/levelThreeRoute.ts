import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import LevelThree from '../components/LevelThree';
import Game from '../components/Game';
import gameRoute from './gameRoute';

const levelThreeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/game/3',
  component: Game,
});

export default levelThreeRoute;
