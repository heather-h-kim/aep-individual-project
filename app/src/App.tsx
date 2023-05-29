import Login from './components/Login.tsx';
import Logout from './components/Logout.tsx';
import Profile from './components/Profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@tanstack/react-query';
import { addUser, createUser } from './services/userApi';
import { useEffect } from 'react';
import { useUserStore } from './store/userStore';

const queryClient = new QueryClient();

export default function App() {
  const { user, isAuthenticated, isLoading, error, getAccessTokenSilently } =
    useAuth0();
  const globalUser = useUserStore(state => state.user);
  const updateGlobalUser = useUserStore(state => state.updateUser);
  const { data, mutate } = useMutation({
    mutationFn: (body: createUser) => addUser(body),
    onMutate: body => console.log('mutate', body),
    onError: (error, variables, context) => {
      console.log('Something went wrong...', error, variables, context);
    },
    onSuccess: variables => {
      console.log(variables);
      updateGlobalUser(variables);
    },
    onSettled: (data, error, variables, context) => {
      console.log('complete');
    },
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      // console.log('user is', user);
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
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...{error.message}</div>;
  }

  // console.log(globalUser);

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
