import Login from './components/Login.tsx';
import Logout from './components/Logout.tsx';
import Profile from './components/Profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@tanstack/react-query';
import { addUser, createUser } from './services/userApi';
import { useEffect } from 'react';
import { useUserStore } from './store/userStore';
import { useColorsStore } from './store/colorStore';

const queryClient = new QueryClient();

export default function App() {
  const { user, isAuthenticated, isLoading, error, getAccessTokenSilently } =
    useAuth0();
  const globalUser = useUserStore(state => state.user);
  const themeBgColor = useColorsStore(state => state.bgcolor);
  const themeFgColor = useColorsStore(state => state.fgcolor);
  const preview = useColorsStore(state => state.preview);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...{error.message}</div>;
  }

  // console.log('in App', globalUser);
  // console.log('preview bgcolor in App', themeBgColor);
  // console.log('preview fgcolor in App', themeFgColor);
  // console.log('preview in App', preview);
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={
          preview
            ? { backgroundColor: themeBgColor }
            : { backgroundColor: globalUser.bgcolor }
        }
        className="m-8 p-5"
      >
        <h1
          style={
            preview ? { color: themeFgColor } : { color: globalUser.fgcolor }
          }
          className="text-3xl font-bold underline"
        >
          Hello world!
        </h1>
        <Login />
        <Logout />
        <Profile />
      </div>
    </QueryClientProvider>
  );
}
