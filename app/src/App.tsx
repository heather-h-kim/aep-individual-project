import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@tanstack/react-query';
import { addUser, createUser } from './services/userApi';
import React, { useEffect } from 'react';
import { useUserStore } from './store/userStore';
import { useColorsStore } from './store/colorStore';
import { router } from './routes/rootRoute';
import { RouterProvider } from '@tanstack/react-router';
import LoadingSpinner from './components/LoadingSpinner';

export default function App() {
  const queryClient = new QueryClient();
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const updateThemeBgColor = useColorsStore(state => state.updateBgcolor);
  const updateThemeFgColor = useColorsStore(state => state.updateFgcolor);
  const updateGlobalUser = useUserStore(state => state.updateUser);
  const { mutate } = useMutation({
    mutationFn: (body: createUser) => addUser(body),
    onMutate: body => console.log('mutate', body),
    onError: (error, variables, context) => {
      console.log(
        'Something went wrong while creating a user...',
        error,
        variables,
        context,
      );
    },
    onSuccess: data => {
      console.log('create user success');
      updateGlobalUser(data);
      updateThemeBgColor(data.bgcolor);
      updateThemeFgColor(data.fgcolor);
    },
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      // console.log('user is', user);

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

        // console.log('authenticated, createUser is', createUser);
        mutate(createUser);
      }
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
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
