import { Dispatch, SetStateAction } from "react";
import { CartItem, OrderItem } from "../Types/Types";
import useLocalStorage from "./useLocalStorage";

const useOrders = (
  loggedInUser: firebase.default.User | null,
  cartProducts: CartItem[],
  setCartProducts: Dispatch<SetStateAction<CartItem[]>>
) => {
  const [orders, setOrders] = useLocalStorage<OrderItem[]>([], "orders");

  // order functions

  const completeOrder = () => {
    const finalDate = new Date().toLocaleDateString("en-GB");
    const finalTime = new Date().toLocaleTimeString("en-GB");
    let user: string | null = "";
    if (loggedInUser) {
      user = loggedInUser.email;
    } else {
      user = "";
    }

    setOrders((prevOrders) => {
      const purchasedItems = [...cartProducts];
      const finalOrder = purchasedItems.map((item) => ({
        ...item,
        dateAndTime: [finalDate, finalTime],
        email: user,
      }));
      if (prevOrders == null) {
        return [...finalOrder];
      } else {
        return [...prevOrders, ...finalOrder];
      }
    });
    setCartProducts([]);
  };

  const clearOrders = () => setOrders([]);

  return {
    orders,
    completeOrder,
    clearOrders,
  };
};

export default useOrders;
