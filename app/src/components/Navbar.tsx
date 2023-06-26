import { Link, Navigate } from '@tanstack/react-router';
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
      <nav class="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between bg-cyan-50 p-4">
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Number Memory Game
        </span>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="mt-4 flex flex-col p-4 text-xl font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0">
            <li className="mr-3">
              <Link
                className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-white hover:bg-blue-700"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="mr-3">
              <Link
                className="inline-block rounded border border-blue-500 bg-blue-500 px-3 py-1 text-white hover:bg-blue-700"
                to="/demo"
              >
                Demo
              </Link>
            </li>
            <li className="mr-3">
              <Login />
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  if (isAuthenticated && globalUser.roll.roleName === 'User') {
    if (
      globalUser.firstName === 'first name' ||
      globalUser.lastName === 'last name'
    ) {
      return <Navigate to="/profile" />;
    }

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
              to="/demo"
            >
              Demo
            </Link>
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
              to="/game"
            >
              Game
            </Link>
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
              to="/rankings"
            >
              Rankings
            </Link>
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
          <li className="mr-3">
            <Logout />
          </li>
        </ul>
      </nav>
    );
  }

  if (isAuthenticated && globalUser.roll.roleName === 'Admin') {
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
              to="/game"
            >
              Game
            </Link>
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
              to="/rankings"
            >
              Rankings
            </Link>
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
              to="/admin"
            >
              Admin
            </Link>
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

          <li className="mr-3">
            <Logout />
          </li>
        </ul>
      </nav>
    );
  }
};

export default Navbar;
