import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../../context/AppContext";
import { FormEvent, useRef, useState } from "react";
import PasswordValidationUI from "./PasswordValidationUI";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useShop();
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  const passwordConfirmRef: any = useRef();
  // local state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordState, setPasswordState] = useState<string>("");
  const [settingPassword, setSettingPassword] = useState(false);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Login Failed");
    }

    setLoading(false);
  };

  return (
    <div className="dark:bg-slate-900 dark:text-white min-h-screen flex flex-col pt-16 items-center bg-secondary-color">
      <div className="max-w-sm w-full ring-1 ring-slate-500 rounded-md py-6 px-4">
        <h1 className="font-semibold text-3xl text-center">Sign Up</h1>

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

        <form
          id="sign-up"
          className="flex flex-col gap-y-4 m-4"
          onSubmit={handleSignUp}
        >
          <label className="flex flex-col gap-y-2 font-semibold">
            Email
            <input
              id="sign-up-email"
              type="email"
              className="rounded bg-secondary-color p-1 border-2 border-slate-300 focus:outline-none select-none focus:border-orange-500 dark:bg-slate-500"
              required
              ref={emailRef}
            />
          </label>

          <label className="flex flex-col gap-y-2 font-semibold">
            Password
            <input
              id="sign-up-password"
              type="password"
              className="rounded bg-secondary-color p-1 border-2 border-slate-300 focus:outline-none select-none focus:border-orange-500 dark:bg-slate-500 "
              required
              ref={passwordRef}
              // onFocus={() => setSettingPassword(true)}
              // onBlur={() => setSettingPassword(false)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                setSettingPassword(prev => !prev)
                setPasswordState(e.target.value)
              }
              }
            />
          </label>
          {settingPassword && <PasswordValidationUI password={passwordState} />}

          <label className="flex flex-col gap-y-2 font-semibold">
            Confirm Password
            <input
              id="sign-up-password-confirm"
              type="password"
              className="rounded bg-secondary-color p-1 border-2 border-slate-300 focus:outline-none select-none focus:border-orange-500 dark:bg-slate-500 "
              required
              ref={passwordConfirmRef}
            />
          </label>

          <button
            type="submit"
            className="w-100 bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white select-none"
            disabled={loading}
          >
            Sign Up
          </button>
        </form>

        <div className="ml-4">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:underline" to="/login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
