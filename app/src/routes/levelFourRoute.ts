import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import Game from '../components/Game';
import LevelFour from '../components/LevelFour';
import gameRoute from './gameRoute';

const levelFourRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/game-level4/$level',
  component: Game,
});

export default levelFourRoute;
