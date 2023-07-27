import { Link, Navigate } from '@tanstack/react-router';
import Login from './Login';
import Logout from './Logout';
import { useAuth0 } from '@auth0/auth0-react';
import Avatar from './Avatar';
import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';
import Dropdown from './Dropdown';
import { useGameStore, useRoundStore } from '../store/gameStore';
import { useIsCorrectStore } from '../store/stateStore';

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const globalUser = useUserStore(state => state.user);
  const { themeBgColor, themeFgColor, preview } = useColorsStore(state => ({
    themeBgColor: state.bgcolor,
    themeFgColor: state.fgcolor,
    preview: state.preview,
  }));
  const resetRounds = useRoundStore(state => state.resetRounds);
  const resetGame = useGameStore(state => state.resetGame);
  const resetIsCorrect = useIsCorrectStore(state => state.resetIsCorrect);

  //function to clear the game when one of the navbar menus other than game menu is clicked during the game
  const clearGame = () => {
    resetRounds();
    resetGame();
    resetIsCorrect();
  };

  const navStyle = {
    ...(preview
      ? { backgroundColor: themeBgColor }
      : { backgroundColor: globalUser.bgcolor }),
  };

  const spanStyle = {
    ...(preview
      ? {
          color: themeFgColor,
          backgroundColor: themeBgColor,
        }
      : {
          color: globalUser.fgcolor,
          backgroundColor: globalUser.bgcolor,
        }),
  };

  const linkStyle = {
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

  if (!isAuthenticated) {
    return (
      <nav className="mx-auto flex max-w-full flex-wrap items-center justify-between bg-cyan-50 p-4">
        <span className="self-center whitespace-nowrap text-2xl font-semibold text-blue-900">
          Number Memory Game
        </span>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col items-center p-4 text-xl font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0">
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
      return (
        <div>
          <Navigate to="/profile" />
          <nav
            style={navStyle}
            className="mx-auto flex max-w-full flex-wrap items-center justify-between p-4"
          >
            <span
              style={spanStyle}
              className="self-center whitespace-nowrap text-2xl font-semibold"
            >
              Number Memory Game
            </span>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="mt-4 flex flex-col items-center p-4 text-xl font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0">
                <li className="mr-3">
                  <Link
                    style={linkStyle}
                    className="inline-block rounded px-3 py-1 "
                    to="/loginHome"
                    onClick={clearGame}
                  >
                    Home
                  </Link>
                </li>
                <li className="mr-3">
                  <Link
                    style={linkStyle}
                    className="inline-block rounded px-3 py-1 "
                    to="/demo"
                    onClick={clearGame}
                  >
                    Demo
                  </Link>
                </li>
                <li className="mr-3">
                  <Dropdown />
                </li>
                <li className="mr-3">
                  <Link
                    style={linkStyle}
                    className="inline-block rounded px-3 py-1 "
                    to="/rankings"
                    onClick={clearGame}
                  >
                    Rankings
                  </Link>
                </li>
                <li className="mr-3">
                  <Link
                    style={linkStyle}
                    className="inline-block rounded px-3 py-1 "
                    to="/profile"
                    onClick={clearGame}
                  >
                    Profile
                  </Link>
                </li>
                <li className="mr-3">
                  <Logout />
                </li>
                <Avatar />
              </ul>
            </div>
          </nav>
        </div>
      );
    }

    return (
      <div>
        <Navigate to="/loginHome" />
        <nav
          style={navStyle}
          className="mx-auto flex max-w-full flex-wrap items-center justify-between p-4"
        >
          <span
            style={spanStyle}
            className="self-center whitespace-nowrap text-2xl font-semibold"
          >
            Number Memory Game
          </span>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col items-center p-4 text-xl font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0">
              <li className="mr-3">
                <Link
                  style={linkStyle}
                  className="inline-block rounded px-3 py-1 "
                  to="/loginHome"
                  onClick={clearGame}
                >
                  Home
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  style={linkStyle}
                  className="inline-block rounded px-3 py-1 "
                  to="/demo"
                  onClick={clearGame}
                >
                  Demo
                </Link>
              </li>
              <li className="mr-3">
                <Dropdown />
              </li>
              <li className="mr-3">
                <Link
                  style={linkStyle}
                  className="inline-block rounded px-3 py-1 "
                  to="/rankings"
                  onClick={clearGame}
                >
                  Rankings
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  style={linkStyle}
                  className="inline-block rounded px-3 py-1 "
                  to="/profile"
                  onClick={clearGame}
                >
                  Profile
                </Link>
              </li>
              <li className="mr-3">
                <Logout />
              </li>
              <Avatar />
            </ul>
          </div>
        </nav>
      </div>
    );
  }

  if (isAuthenticated && globalUser.roll.roleName === 'Admin') {
    return (
      <div>
        <Navigate to="/loginHome" />
        <nav
          style={navStyle}
          className="mx-auto flex max-w-full flex-wrap items-center justify-between p-4"
        >
          <span
            style={spanStyle}
            className="self-center whitespace-nowrap text-2xl font-semibold"
          >
            Number Memory Game
          </span>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col items-center p-4 text-xl font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0">
              <li className="mr-3">
                <Link
                  style={linkStyle}
                  className="inline-block rounded px-3 py-1 "
                  to="/loginHome"
                >
                  Home
                </Link>
              </li>
              <li className="mr-3">
                <Dropdown />
              </li>
              <li className="mr-3">
                <Link
                  style={linkStyle}
                  className="inline-block rounded px-3 py-1 "
                  to="/rankings"
                >
                  Rankings
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  style={linkStyle}
                  className="inline-block rounded px-3 py-1 "
                  to="/admin"
                >
                  Admin
                </Link>
              </li>

              <li className="mr-3">
                <Link
                  style={linkStyle}
                  className="inline-block rounded px-3 py-1 "
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              <li className="mr-3">
                <Logout />
              </li>
              <Avatar />
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};

export default Navbar;
