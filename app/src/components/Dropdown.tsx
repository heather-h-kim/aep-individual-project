import { useColorsStore } from '../store/colorStore';
import { useUserStore } from '../store/userStore';
import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useGameStore, useRoundStore } from '../store/gameStore';
import { useIsCorrectStore } from '../store/stateStore';

const Dropdown = () => {
  const globalUser = useUserStore(state => state.user);
  const themeBgColor = useColorsStore(state => state.bgcolor);
  const themeFgColor = useColorsStore(state => state.fgcolor);
  const preview = useColorsStore(state => state.preview);
  const [showMenu, setShowMenu] = useState(false);
  const resetRounds = useRoundStore(state => state.resetRounds);
  const resetGame = useGameStore(state => state.resetGame);
  const resetIsCorrect = useIsCorrectStore(state => state.resetIsCorrect);
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('game menu clicked');
    resetRounds();
    resetGame();
    resetIsCorrect();
    setShowMenu(!showMenu);
    navigate({ to: '/loginHome' });
  };

  const handleClickDropDown = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
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
          className="inline-flex gap-x-1.5 rounded px-3 py-1"
          // className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Game
          <svg
            className="-mr-1 h-5 w-5 "
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
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {showMenu && (
        <div
          className="absolute right-0 z-10 mt-2 w-24 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
          onClick={handleClickDropDown}
        >
          <div className="py-1" role="none">
            <Link
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              to="/game-level1/1"
            >
              Level 1
            </Link>
            <Link
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              to="/game-level2/2"
            >
              Level 2
            </Link>
            <Link
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              to="/game-level3/3"
            >
              Level 3
            </Link>
            <Link
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              to="/game-level4/4"
            >
              Level 4
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
