import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@tanstack/react-query';
import { addUser, createUser } from './services/userApi';
import { useEffect } from 'react';
import { useUserStore } from './store/userStore';
import { useColorsStore } from './store/colorStore';
import { router } from './routes/rootRoute';
import { RouterProvider } from '@tanstack/react-router';
import useGetSeasons from './hooks/useGetSeasons';
import { getRankings } from './services/rankingApi';
import { useRankingStore } from './store/rankingStore';
import { useSeasonStore } from './store/seasonStore';

const queryClient = new QueryClient();

export default function App() {
  // interface user {
  //   given_name: string;
  //   family_name: string;
  //   nickname: string;
  //   name: string;
  //   picture: string;
  //   email: string;
  //   email_verified: boolean;
  //   locale: string;
  //   sub: string;
  //   updated_at: string
  // }

  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const updateThemeBgColor = useColorsStore(state => state.updateBgcolor);
  const updateThemeFgColor = useColorsStore(state => state.updateFgcolor);
  const updateGlobalUser = useUserStore(state => state.updateUser);
  const { data, mutate } = useMutation({
    mutationFn: (body: createUser) => addUser(body),
    onMutate: body => console.log('mutate', body),
    onError: (error, variables, context) => {
      console.log('Something went wrong...', error, variables, context);
    },
    onSuccess: data => {
      console.log('success', data);
      updateGlobalUser(data);
      updateThemeBgColor(data.bgcolor);
      updateThemeFgColor(data.fgcolor);
    },
    onSettled: (data, error, variables, context) => {
      console.log('complete', data);
    },
  });

  //Get seasons and ranking data here so that the ranking & admin components can load quickly
  useGetSeasons();
  const { allSeasons, seasonsToDate, currentSeason, currentSeasonId } =
    useSeasonStore(state => ({
      allSeasons: state.allSeasons,
      seasonsToDate: state.seasonsToDate,
      currentSeason: state.currentSeason,
      currentSeasonId: state.currentSeasonId,
    }));

  const { rankings, updateRankings } = useRankingStore(state => ({
    rankings: state.rankings,
    updateRankings: state.updateRankings,
  }));

  useQuery({
    queryKey: ['Rankings', currentSeasonId],
    queryFn: () => getRankings(currentSeasonId),
    onSuccess: data => {
      console.log(data);
      updateRankings(data);
    },
    onError: error =>
      console.log('something went wrong while getting seasons', error),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('user is', user);

      //When a user logs in by manually signing up for Auth0
      if (user.given_name === undefined && user.family_name === undefined) {
        const createUser = {
          email: user.email,
          auth0token: user.sub,
          username: user.nickname,
        };
        console.log(createUser);
        mutate(createUser);
      }

      //When a user logs in through google-auth0 connection
      if (user.given_name && user.family_name) {
        const createUser = {
          first_name: user.given_name,
          last_name: user.family_name,
          email: user.email,
          auth0token: user.sub,
          username: user.nickname,
        };

        console.log('authenticated, createUser is', createUser);
        mutate(createUser);
      }
    }
  }, [isAuthenticated, user]);

  console.log('allSeasons', allSeasons);
  console.log('seasonsToDate', seasonsToDate);
  console.log('currentSeason', currentSeason);
  console.log('current seasonId is', currentSeasonId);
  console.log('rankings', rankings);

  if (isLoading) {
    return <div className="m-8 p-5 text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="m-8 p-5 text-lg">
        Something went wrong...{error.message}
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="m-10 p-5">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}
