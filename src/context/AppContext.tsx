import {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  MutableRefObject,
} from "react";
import { auth } from "../firebase/firebase";
import {
  AppContextTypes,
  CartItem,
  OrderItem,
  ProductItem,
} from "../Types/Types";
import useProducts from "../hooks/useProducts";
import useLocalStorage from "../hooks/useLocalStorage";
import useCategories from "../hooks/useCategories";
import useCartFunctions from "../hooks/useCartFunctions";

// Types
type AppContextProviderProps = {
  children: ReactNode;
};

const AppContext = createContext({} as AppContextTypes);

export const useShop = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  // STATE
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

  // todo => useAuth, useOrders, useWishlist

  const [wishlist, setWishlist] = useLocalStorage<ProductItem[]>(
    [],
    "wishlist"
  );
  const [orders, setOrders] = useLocalStorage<OrderItem[]>([], "orders");
  // authentication state variables

  const [loggedInUser, setLoggedInUser] =
    useState<firebase.default.User | null>(null);
  // loggedInUser is set to null when no user is signed in.
  // todo => Use productsLoading as UI loading state.
  // todo => image loading state

  // authentication
  useEffect(() => {
    // when mounting the component we set the user:
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setLoggedInUser(firebaseUser);
      // setLoading(false);
    });

    return unsubscribe;
  }, []);

  // authentication functions

  const signUp = (
    email: string,
    password: string
  ): Promise<firebase.default.auth.UserCredential> =>
    auth.createUserWithEmailAndPassword(email, password);

  const login = (
    email: string,
    password: string
  ): Promise<firebase.default.auth.UserCredential> =>
    auth.signInWithEmailAndPassword(email, password);

  const logOut = (): Promise<void> => auth.signOut();

  const resetPassword = (email: string): Promise<void> =>
    auth.sendPasswordResetEmail(email);

  const updatePassword = (password: string): Promise<void> | undefined =>
    loggedInUser?.updatePassword(password);

  const signOut = (): Promise<void> => auth.signOut();

  const deleteUser = (): Promise<void> | undefined =>
    auth.currentUser?.delete();

  const addToWishList = (product: ProductItem) => {
    setWishlist((prevWishList) => {
      let newWishList = prevWishList.filter(
        (productItem) => productItem.title !== product.title
      );
      return [...newWishList, product];
    });
  };

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
