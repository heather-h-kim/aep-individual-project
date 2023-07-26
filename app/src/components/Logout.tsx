import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  const globalUser = useUserStore(state => state.user);
  const themeBgColor = useColorsStore(state => state.bgcolor);
  const themeFgColor = useColorsStore(state => state.fgcolor);
  const preview = useColorsStore(state => state.preview);
  const style = {
    ...(preview
      ? {
          color: themeBgColor,
          backgroundColor: themeFgColor,
        }
      : {
          color: globalUser.bgcolor,
          backgroundColor: globalUser.fgcolor,
        }),
  };

  if (isAuthenticated) {
    return (
      <button
        style={style}
        className="inline-block rounded px-3 py-1 "
        onClick={() => logout()}
      >
        Logout
      </button>
    );
  }
};

export default LogoutButton;
