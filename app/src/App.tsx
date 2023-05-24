import Login from './components/Login.tsx';
import Logout from './components/Logout.tsx';
import Profile from './components/Profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { addUser, createUser, getUserByToken } from './services/userApi';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

export default function App() {
  const { user, isAuthenticated, isLoading, error, getAccessTokenSilently } =
    useAuth0();
  // const [userMetadata, setUserMetadata] = useState(null);
  // const { data, mutate } = useMutation({
  //   mutationFn: (data: createUser) => addUser(data),
  //   onMutate: data => console.log('mutate', data),
  //   onError: (error, variables, context) => {
  //     console.log(error, variables, context);
  //   },
  //   onSettled: (data, error, variables, context) => console.log('complete'),
  // });

  // const { data: tokenUser } = useQuery({
  //   queryKey: ['tokenUser', user.sub],
  //   queryFn: () => getUserByToken(user.sub),
  // });
  //
  // if (isAuthenticated) {
  //   console.log(data);
  // }

  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         authorizationParams: {
  //           audience: `https://${domain}/api/v2/`,
  //           scope: 'read:current_user',
  //         },
  //       });
  //
  //       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  //
  //       const metadataResponse = await fetch(userDetailsByIdUrl, {
  //         headers: {
  //           Authoriziation: `Bearer ${accessToken}`,
  //         },
  //       });
  //
  //       const { user_metadata } = await metadataResponse.json();
  //
  //       setUserMetadata(user_metadata);
  //     } catch (error) {
  //       console.log(error.message);
  //       throw error;
  //     }
  //   };
  //
  //   getUserMetadata();
  //
  //   // if (isAuthenticated && user) {
  //   //   // const { data: tokenUser } = useQuery({
  //   //   //   queryKey: ['tokenUser', user.sub],
  //   //   //   queryFn: () => getUserByToken(user.sub),
  //   //   // });
  //   //   // console.log(data);
  //   //   // const createUser = {
  //   //   //   first_name: user.given_name,
  //   //   //   last_name: user.family_name,
  //   //   //   email: user.email,
  //   //   //   auth0token: user.sub,
  //   //   //   username: user.nickname,
  //   //   // };
  //   //   // console.log('authenticated2', createUser);
  //   //   // mutate(createUser);
  //   // }
  // }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...{error.message}</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Login />
        <Logout />
        <Profile />
      </div>
    </QueryClientProvider>
  );
}
