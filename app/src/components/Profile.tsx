import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useMutation } from '@tanstack/react-query';
import { addUser, createUser } from '../services/userApi';

const Profile = () => {
  const { user, isAuthenticated, isLoading, error, getAccessTokenSilently } =
    useAuth0();
  const globalUser = useUserStore(state => state.user);
  const updateGlobalUser = useUserStore(state => state.updateUser);

  console.log(globalUser);

  // const [userMetadata, setUserMetadata] = useState(null);
  // const { data, mutate } = useMutation({
  //   mutationFn: (data: createUser) => addUser(data),
  //   onMutate: data => console.log('mutate', data),
  //   onError: (error, variables, context) => {
  //     console.log(error, variables, context);
  //   },
  //   onSettled: (data, error, variables, context) => console.log('complete'),
  // });
  //
  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  //
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
  // }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        {/*<img src={user.picture} alt={user.name} />*/}
        {/*<h2>{globalUser.email}</h2>*/}
        <h3>User data</h3>
        <p>{JSON.stringify(globalUser)}</p>
        {/*{userMetadata ? (*/}
        {/*  <pre>{JSON.stringify(userMetadata, null, 2)}</pre>*/}
        {/*) : (*/}
        {/*  'No user metadata defined'*/}
        {/*)}*/}
      </div>
    );
  }
};

export default Profile;
