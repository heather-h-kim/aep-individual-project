import React, { useEffect } from 'react';
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
import { useRankingStore } from '../store/rankingStore';
import LoadingSpinner from './LoadingSpinner';

const LoginHome = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const globalUser = useUserStore(state => state.user);
  const themeBgColor = useColorsStore(state => state.bgcolor);
  const preview = useColorsStore(state => state.preview);
  const client = useQueryClient();

  //prefetch seasons here
  client.prefetchQuery({
    queryKey: ['Seasons'],
    queryFn: getAllSeasons,
  });

  client.prefetchQuery({
    queryKey: ['SeasonsToDate'],
    queryFn: getSeasonsToDate,
  });

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
