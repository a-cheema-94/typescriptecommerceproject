import { useCart } from "../context/AppContext"
import Login from "../components/Pages/Authentication/Login";

const PrivateRoute = ({ children }: any) => {
  const { loggedInUser } = useCart();
  
  return (
    loggedInUser ? children : <Login />
  )
}

export default PrivateRoute