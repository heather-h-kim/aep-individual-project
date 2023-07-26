import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserStore } from '../store/userStore';
import { useColorsStore } from '../store/colorStore';
// import { useSeasonStore } from '../store/seasonStore';
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
  // const { currentSeasonId, updateCurrentSeasonId } = useSeasonStore(state => ({
  //   selectedSeason: state.currentSeasonId,
  //   updateCurrentSeasonId: state.updateCurrentSeasonId,
  // }));
  const client = useQueryClient();

  //prefetch seasons here

  // const { data } = useQuery({
  //   queryKey: ['CurrentSeason'],
  //   queryFn: getCurrentSeason,
  //   onSuccess: data => {
  //     console.log('currentSeasonId', data);
  //     // updateCurrentSeasonId(data);
  //     client.prefetchQuery({
  //       queryKey: ['Rankings', data],
  //       queryFn: () => getRankings(data),
  //     });
  //   },
  //   onError: error =>
  //     console.log('something went wrong while getting seasons', error),
  // });
  //
  // client.prefetchQuery({
  //   queryKey: ['SeasonsToDate'],
  //   queryFn: getSeasonsToDate,
  // });

  useQuery({
    queryKey: ['SeasonsToDate'],
    queryFn: getSeasonsToDate,
    onSuccess: data => {
      console.log('seasons todate', data[0].seasonId, typeof data[0].seasonId);
      client.prefetchQuery({
        queryKey: ['Rankings', data[0].seasonId],
        queryFn: () => getRankings(data[0].seasonId),
      });
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
  });

  client.prefetchQuery({
    queryKey: ['Seasons'],
    queryFn: getAllSeasons,
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
