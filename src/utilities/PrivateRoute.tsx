import { useShop } from "../context/AppContext";
import Login from "../components/Pages/Authentication/Login";

const PrivateRoute = ({ children }: any) => {
  const { loggedInUser } = useShop();

  return loggedInUser ? children : <Login />;
};

export default PrivateRoute;
