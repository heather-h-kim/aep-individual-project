import { rootRoute } from './rootRoute';
import { Route } from '@tanstack/react-router';
import Game from '../components/Game';

const gameRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/game',
  component: () => {
    return <Game />;
  },
});

export default gameRoute;
