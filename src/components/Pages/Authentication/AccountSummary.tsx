import { useRef, useState } from "react";
import { useShop } from "../../../context/AppContext";
import DeleteBtnModal from "./DeleteBtnModal";
import { useNavigate } from "react-router-dom";

const AccountSummary = () => {
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  const passwordConfirmRef: any = useRef();
  const navigate = useNavigate();
  const { loggedInUser, changePassword } = useShop();
  const [toggleUpdateProfile, setToggleUpdateProfile] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const closeDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteBtn = () => {
    setOpenDeleteModal(true);
  };

  const handleUpdateProfileBtn = async (e: any) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("The passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      await changePassword(passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Update Failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col pt-5 items-center gap-y-6 dark:bg-slate-900 dark:text-white min-h-screen">
      <div className="max-w-sm w-full ring-1 ring-slate-500 rounded-md flex flex-col gap-y-5 py-6 items-center">
        <h1 className="font-semibold text-3xl  ">Account Summary</h1>
        <h2 className="">
          <span className="text-lg font-semibold">User: </span>
          {loggedInUser?.email}
        </h2>

        {!toggleUpdateProfile ? (
          <button
            className="w-3/4 bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white select-none"
            onClick={() => setToggleUpdateProfile(true)}
          >
            Update Profile
          </button>
        ) : (
          <div className="w-5/6 rounded-md py-6 px-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-semibold text-3xl text-center ">
                Update Profile
              </h1>

              <button
                className="bg-orange-500 dark:text-white dark:ring-white ring-black ring-1 rounded-full w-fit h-fit px-2 hover:bg-orange-700"
                onClick={() => setToggleUpdateProfile(false)}
              >
                X
              </button>
            </div>

            <form
              id="update-profile"
              className="flex flex-col gap-y-4"
              onSubmit={handleUpdateProfileBtn}
            >
              <label className="flex flex-col gap-y-2 font-semibold">
                Email
                <input
                  type="email"
                  className="rounded bg-secondary-color p-1 border-2 border-slate-300 focus:outline-none select-none focus:border-orange-500 dark:bg-slate-500"
                  required
                  ref={emailRef}
                />
              </label>

              <label className="flex flex-col gap-y-2 font-semibold">
                New Password
                <input
                  type="password"
                  className="rounded bg-secondary-color p-1 border-2 border-slate-300 focus:outline-none select-none focus:border-orange-500 dark:bg-slate-500 "
                  required
                  ref={passwordRef}
                />
              </label>

              <label className="flex flex-col gap-y-2 font-semibold">
                Confirm New Password
                <input
                  type="password"
                  className="rounded bg-secondary-color p-1 border-2 border-slate-300 focus:outline-none select-none focus:border-orange-500 dark:bg-slate-500 "
                  required
                  ref={passwordConfirmRef}
                />
              </label>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white select-none mt-3"
                disabled={loading}
              >
                Update Profile
              </button>
            </form>
          </div>
        )}

        {error && (
          <div className="ml-4 mt-3 bg-red-200 rounded-md text-red-700 font-bold flex gap-x-2 p-1 w-80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>

            {error}
          </div>
        )}

        <button
          className="w-3/4 bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white select-none"
          onClick={handleDeleteBtn}
        >
          Delete Account
        </button>
      </div>

      {openDeleteModal && (
        <DeleteBtnModal open={openDeleteModal} close={closeDeleteModal} />
      )}
    </div>
  );
};

export default AccountSummary;
