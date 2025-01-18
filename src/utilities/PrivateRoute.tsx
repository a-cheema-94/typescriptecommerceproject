import { useShop } from "../context/AppContext";
import Login from "../components/Pages/Authentication/Login";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { loggedInUser } = useShop();

  return loggedInUser ? children : <Login />;
};

export default PrivateRoute;
