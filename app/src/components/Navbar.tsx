import { Link } from '@tanstack/react-router';
import Login from './Login';
import Logout from './Logout';
import { useAuth0 } from '@auth0/auth0-react';
import Avatar from './Avatar';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const globalUser = useUserStore(state => state.user);
  const themeBgColor = useColorsStore(state => state.bgcolor);
  const themeFgColor = useColorsStore(state => state.fgcolor);
  const preview = useColorsStore(state => state.preview);
  if (!isAuthenticated) {
    return (
      <nav>
        <ul className="flex">
          <li className="mr-3">
            <Link
              className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-white"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="mr-3">
            <Link
              className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-white"
              to="/demo"
            >
              Demo
            </Link>
          </li>
          <li className="mr-3">
            <Login />
          </li>
        </ul>
      </nav>
    );
  }

  if (isAuthenticated) {
    return (
      <nav>
        <ul className="flex">
          <li className="mr-3">
            <Avatar />
          </li>
          <li className="mr-3">
            <Link
              style={
                preview
                  ? {
                      color: themeBgColor,
                      backgroundColor: themeFgColor,
                    }
                  : {
                      color: globalUser.bgcolor,
                      backgroundColor: globalUser.fgcolor,
                    }
              }
              className="inline-block rounded px-3 py-1 "
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="mr-3">
            <Logout />
          </li>
          <li className="mr-3">
            <Link
              style={
                preview
                  ? {
                      color: themeBgColor,
                      backgroundColor: themeFgColor,
                    }
                  : {
                      color: globalUser.bgcolor,
                      backgroundColor: globalUser.fgcolor,
                    }
              }
              className="inline-block rounded px-3 py-1 "
              to="/profile"
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Navbar;
