import { useAuth0 } from '@auth0/auth0-react';
import { useUserStore } from '../store/userStore';
import { useColorsStore } from '../store/colorStore';
import { useSeasonStore } from '../store/seasonStore';
import { getRankings } from '../services/rankingApi';
import {
  getAllSeasons,
  getCurrentSeason,
  getSeasonsToDate,
} from '../services/seasonApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from './LoadingSpinner';

const LoginHome = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const globalUser = useUserStore(state => state.user);
  const { themeBgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    preview: state.preview,
  }));
  const { currentSeasonId, updateCurrentSeasonId } = useSeasonStore(state => ({
    currentSeasonId: state.currentSeasonId,
    updateCurrentSeasonId: state.updateCurrentSeasonId,
  }));
  const client = useQueryClient();

  //get the current season Id to prefetch rankings to display in the rankings page
  useQuery({
    queryKey: ['CurrentSeason'],
    queryFn: getCurrentSeason,
    onSuccess: data => {
      console.log('currentSeasonId', data);
      updateCurrentSeasonId(data);
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
  });

  if (currentSeasonId) {
    //prefetch seasons up to the current date for the dropdown menu in the rankings page
    client.prefetchQuery({
      queryKey: ['SeasonsToDate'],
      queryFn: getSeasonsToDate,
    });

    //prefetch current season's rankings to display when the rankings page loads
    client.prefetchQuery({
      queryKey: ['Rankings', currentSeasonId],
      queryFn: () => getRankings(currentSeasonId),
    });

    //prefetch all seasons including future seasons to show in the admin page
    client.prefetchQuery({
      queryKey: ['Seasons'],
      queryFn: getAllSeasons,
    });
  }

  if (isAuthenticated && !globalUser.userId) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div
      style={
        preview
          ? { backgroundColor: themeBgColor }
          : { backgroundColor: globalUser.bgcolor }
      }
      className="my-10 flex h-screen flex-col items-center justify-center"
    >
      <h1 className=" pb-8 text-6xl font-bold">
        Welcome to Number Memory Game!
      </h1>
      <h2 className=" text-4xl">
        Click game button to select the level you want to play!
      </h2>
    </div>
  );
};
export default LoginHome;
