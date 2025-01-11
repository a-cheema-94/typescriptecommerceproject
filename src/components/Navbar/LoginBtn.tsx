import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/AppContext";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

const LoginBtn = () => {
  const { loggedInUser, logOut } = useShop();
  const navigate = useNavigate();
  // local state
  const [showMenu, setShowMenu] = useState(false);

  const handleSignOut = () => {
    navigate("/");
    setShowMenu(false);
    logOut();
  };

  const userMenuRef = useDetectClickOutside({
    onTriggered: () => setShowMenu(false),
  });

  return (
    <div ref={userMenuRef}>
      {!loggedInUser ? (
        <button
          className="bg-orange-500 hover:bg-orange-700 cursor-pointer text-white font-bold rounded-full py-2 px-6 select-none"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      ) : (
        <div className="relative cursor-pointer hover:bg-slate-300 rounded-full dark:text-white dark:hover:text-black">
          <button onClick={() => setShowMenu(!showMenu)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </button>

          {showMenu && (
            <div className="w-max bg-secondary-color ring-2 ring-orange-300 font-semibold text-center rounded absolute mt-3 -right-20 z-10 flex flex-col gap-y-2 p-2 dark:bg-slate-900 dark:text-white user-menu">
              <button
                className="bg-orange-500 dark:text-white dark:ring-white ring-black ring-1 rounded-full w-fit px-2 hover:bg-orange-700"
                onClick={() => setShowMenu(false)}
              >
                X
              </button>
              <h2>
                Signed in as:
                <br /> <span className="text-sm">{loggedInUser.email}</span>
              </h2>
              <h1
                onClick={() => navigate("/accountSummary")}
                className="hover:bg-slate-300 dark:hover:text-black cursor-pointer rounded-full px-2"
              >
                Go to Account Summary
              </h1>
              <button
                className="bg-orange-500 hover:bg-orange-700  text-white font-bold rounded-full py-2 px-6 select-none"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginBtn;
