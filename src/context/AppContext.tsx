import {
  ReactNode,
  createContext,
  useContext,
} from "react";
import {
  AppContextTypes,
} from "../Types/Types";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import useCartFunctions from "../hooks/useCartFunctions";
import useAuth from "../hooks/useAuth";
import useOrders from "../hooks/useOrders";
import useWishlist from "../hooks/useWishlist";

// Types
type AppContextProviderProps = {
  children: ReactNode;
};

const AppContext = createContext({} as AppContextTypes);

export const useShop = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  // Context state and functions

  const { initialProducts, products, productsLoading, setProducts } =
    useProducts();

  const { categories, categoryPressed, filterByCategory, resetCategories } =
    useCategories(initialProducts, setProducts);

  const {
    cartProducts,
    decreaseProductQuantity,
    getProductQuantity,
    getSubTotal,
    increaseProductQuantity,
    removeProductsFromCart,
    setCartProducts,
  } = useCartFunctions(initialProducts);

  const {
    loggedInUser,
    signUp,
    login,
    logOut,
    resetPassword,
    updatePassword,
    signOut,
    deleteUser,
  } = useAuth();

  const { clearOrders, completeOrder, orders } = useOrders(
    loggedInUser,
    cartProducts,
    setCartProducts
  );

  const { addToWishList, wishlist } = useWishlist();

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        filterByCategory,
        resetCategories,
        categoryPressed,
        wishlist,
        addToWishList,
        // cart
        getProductQuantity,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeProductsFromCart,
        cartProducts,
        initialProducts,
        getSubTotal,
        // orders
        orders,
        completeOrder,
        clearOrders,
        // authentication
        loggedInUser,
        signUp,
        login,
        logOut,
        resetPassword,
        updatePassword,
        signOut,
        deleteUser,
        productsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
