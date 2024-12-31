import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../../../context/AppContext"
import { useRef, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useCart();
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  // local state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch { 
      setError('Login Failed')
    }

    setLoading(false);
  }
  

  return (
    <div className="dark:bg-slate-900 dark:text-white min-h-screen flex flex-col pt-16 items-center bg-secondary-color">
      <div className="max-w-sm w-full ring-1 ring-slate-500 rounded-md py-6 px-4">
        <h1 className="font-semibold text-3xl text-center">Log In</h1>
        
        {error && 
          <div className="ml-4 mt-3 bg-red-200 rounded-md text-red-700 font-bold flex gap-x-2 p-1 w-80">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>

            {error}
          </div>
        }

        <form id="sign-in" className="flex flex-col gap-y-4 m-4" onSubmit={handleLogin}>
          <label className="flex flex-col gap-y-2 font-semibold">
            Email
            <input id="sign-in-email" type="email" className="rounded bg-secondary-color p-1 border-2 border-slate-300 focus:outline-none select-none focus:border-orange-500 dark:bg-slate-500" required ref={emailRef}/>
          </label>

          <label className="flex flex-col gap-y-2 font-semibold">
            Password
            <input id="sign-in-password" type="password" className="rounded bg-secondary-color p-1 border-2 border-slate-300 focus:outline-none select-none focus:border-orange-500 dark:bg-slate-500 " required ref={passwordRef}/>
          </label>

          <button type="submit" className="w-100 bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white select-none" disabled={loading} >Log In</button>
        </form>

        <div className="ml-4 ">
          <Link className="text-blue-600 hover:underline" to='/forgotPassword'>Forgot Password?</Link>
        </div>
        <div className="ml-4">
          New Customer? <Link className="text-blue-600 hover:underline" to='/signUp'>Create an Account</Link>
        </div>
      </div>

    </div>
  )
}

export default Login