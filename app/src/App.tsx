import Login from './components/Login.tsx';
import Logout from './components/Logout.tsx';
import Profile from './components/Profile';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { addUser, createUser } from './services/userApi';
import { useEffect } from 'react';

// import { createUser, addUser } from 'services/userApi';

// const queryClient = new QueryClient();

export default function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { data, mutate } = useMutation({
    mutationFn: (data: createUser) => addUser(data),
    onMutate: () => console.log('mutate'),
    onError: (error, variables, context) => {
      console.log(error, variables, context);
    },
    onSettled: () => console.log('complete'),
  });

  // if (isAuthenticated) {
  //   const createUser = {
  //     first_name: user.given_name,
  //     last_name: user.family_name,
  //     email: user.email,
  //     auth0token: user.sub,
  //     username: user.nickname,
  //   };
  //   console.log(createUser);
  //
  // }

  useEffect(() => {
    if (isAuthenticated) {
      const createUser = {
        first_name: user.given_name,
        last_name: user.family_name,
        email: user.email,
        auth0token: user.sub,
        username: user.nickname,
      };
      console.log(createUser);
      mutate(createUser);
    }
  }, []);

  return (
    // <QueryClientProvider client={queryClient}>
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Login />
      <Logout />
      <Profile />
    </div>
    // </QueryClientProvider>
  );
}
