import { Link } from "react-router-dom";
import { useShop } from "../../../context/AppContext";
import { FormEvent, useRef, useState } from "react";

const ForgotPassword = () => {
  const { resetPassword } = useShop();
  const emailRef = useRef<HTMLInputElement | null>(null);
  // local state
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      setSuccessMsg("");
      if(emailRef.current) await resetPassword(emailRef.current.value);
      setSuccessMsg(
        "Verification email sent, check your inbox for further instructions."
      );
    } catch {
      setError("Password Reset Failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="dark:bg-slate-900 dark:text-white min-h-screen flex flex-col pt-16 items-center bg-secondary-color">
      <div className="max-w-sm w-full ring-1 ring-slate-500 rounded-md py-6 px-4">
        <h1 className="font-semibold text-3xl text-center">Reset Password</h1>

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

        <p className="ml-4 mt-4">
          Below enter the email you used when creating the account and we will
          send you instructions to reset your password.
        </p>

        <form
          id="forgot-password"
          className="flex flex-col gap-y-4 m-4"
          onSubmit={handleForgotPassword}
        >
          <label className="flex flex-col gap-y-2 font-semibold">
            Email
            <input
              id="forgot-password-email"
              type="email"
              className="rounded bg-secondary-color p-1 border-2 border-slate-300 focus:outline-none select-none focus:border-orange-500 dark:bg-slate-500"
              required
              ref={emailRef}
            />
          </label>

          {successMsg ? (
            <div className="bg-green-200 rounded-md text-green-700 font-bold flex gap-x-2 p-1 w-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              {successMsg}
            </div>
          ) : (
            <button
              type="submit"
              className="w-100 bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white cursor-pointer select-none"
              disabled={loading}
            >
              Send Reset Instructions
            </button>
          )}
        </form>

        <div className="ml-4 ">
          Back to
          <Link className="text-blue-600 hover:underline" to="/login">
            &nbsp;Log In&nbsp;
          </Link>
          Page
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
