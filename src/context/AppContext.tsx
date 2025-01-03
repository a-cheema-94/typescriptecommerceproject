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
import useLocalStorage from "../hooks/useLocalStorage";
import { ProductItem } from "../Types/Types";

// Types
type AppContextProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type OrderItem = {
  id: number;
  quantity: number;
  dateAndTime: string[];
  email: string | null;
};

type AppContextTypes = {
  products: ProductItem[];
  categories: string[];
  filterByCategory: (category: string) => void;
  resetCategories: () => void;
  categoryPressed: string;
  wishlist: ProductItem[];
  addToWishList: (product: ProductItem) => void;
  getProductQuantity: (id: number) => number;
  increaseProductQuantity: (id: number) => void;
  decreaseProductQuantity: (id: number) => void;
  removeProductsFromCart: (id: number) => void;
  cartProducts: CartItem[];
  initialProducts: MutableRefObject<ProductItem[]>;
  getSubTotal: () => number;
  completeOrder: () => void;
  orders: OrderItem[];
  clearOrders: () => void;
  loggedInUser: firebase.default.User | null;
  signUp: (
    email: string,
    password: string
  ) => Promise<firebase.default.auth.UserCredential>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.default.auth.UserCredential>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void> | undefined;
  signOut: () => Promise<void>;
  deleteUser: () => Promise<void> | undefined;
  productsLoading: boolean
};

const AppContext = createContext({} as AppContextTypes);

export const useCart = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  // STATE
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categoryPressed, setCategoryPressed] = useState("");

  const [wishlist, setWishlist] = useLocalStorage<ProductItem[]>(
    [],
    "wishlist"
  );
  const [cartProducts, setCartProducts] = useLocalStorage<CartItem[]>(
    [],
    "cartProducts"
  );
  const [orders, setOrders] = useLocalStorage<OrderItem[]>([], "orders");
  // authentication state variables

  const [loggedInUser, setLoggedInUser] =
    useState<firebase.default.User | null>(null);
  // loggedInUser is set to null when no user is signed in.
  const [productsLoading, setProductsLoading] = useState(false);
  // todo => Use productsLoading as UI loading state.
  
  // REFS
  let isMounted = useRef(true);
  // isMounted ref used to guard against api calling when component unmounts.
  // E.g. when api may be slow and component unmounts before fetch call finishes.
  let initialProducts = useRef([] as ProductItem[]);
  // ref used to store all of the product data in initial form.

  // USE EFFECTS

  // Fetch requests

  // products

  // todo => refactor initial editProducts function and simplify logic structure
  // todo => determine whether to use custom hook, keep useEffect in AppContext or use useQuery.

  const editProducts = (products: any) => {
    const electronicsFilteredData = products.filter(product => product.category.name === 'Electronics')
    const furnitureFilteredData = products.filter(product => product.category.name === 'Furniture')
    const shoesFilteredData = products.filter(product => product.category.name === 'Shoes')
    const miscellaneousFilteredData = products.filter(product => product.category.name === 'Miscellaneous')

    const finalProducts = [...electronicsFilteredData, ...furnitureFilteredData, ...shoesFilteredData, ...miscellaneousFilteredData ];

    return finalProducts.map(product => ({
      image: product.images[0],
      category: product.category.name,
      rating: {
        rate: 3.5,
        count: 3,
      },
      ...product
    }));
  }

  useEffect(() => {
    async function fetchProducts() {
      setProductsLoading(true);
      try {
        const productRes = await fetch("https://api.escuelajs.co/api/v1/products");
        console.log("fetched products");
        const productData = await productRes.json();
        initialProducts.current = editProducts(productData);
        setProducts(initialProducts.current);
      } catch (error) {
        console.error("An error occurred fetching products from platzi fake store api: ", error);
      } finally {
        setProductsLoading(false);
      }
    }

    if ((isMounted.current && initialProducts.current.length === 0)) fetchProducts();

    return () => {
      isMounted.current = false;
    };
  }, []);

  // categories
  const categories = Array.from(
    new Set(initialProducts.current.map((product) => product.category.name))
  );

  useEffect(() => {
    // authentication
    // when mounting the component we set the user:
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setLoggedInUser(firebaseUser);
      // setLoading(false);
    });

    return unsubscribe;
  }, []);

  // FUNCTIONS

  // categories
  const filterByCategory = (category: string) => {
    const newProducts = initialProducts.current.filter(
      (product) => product.category.name === category
    );
    setCategoryPressed(category);
    setProducts(newProducts);
  };

  const resetCategories = () => {
    setCategoryPressed("All");
    setProducts(initialProducts.current);
  };

  const addToWishList = (product: ProductItem) => {
    setWishlist((prevWishList) => {
      let newWishList = prevWishList.filter(
        (productItem) => productItem.title !== product.title
      );
      return [...newWishList, product];
    });
  };

  // cart functions
  const getProductQuantity = (id: number) => {
    return cartProducts.find((product) => product.id === id)?.quantity || 0;
  };

  const increaseProductQuantity = (id: number) => {
    setCartProducts((currentCartProducts) => {
      if (currentCartProducts.find((item) => item.id === id) == null) {
        return [...currentCartProducts, { id, quantity: 1 }];
      } else {
        return currentCartProducts.map((cartProduct) => {
          if (cartProduct.id === id) {
            return { ...cartProduct, quantity: cartProduct.quantity + 1 };
          } else {
            return cartProduct;
          }
        });
      }
    });
  };

  const decreaseProductQuantity = (id: number) => {
    setCartProducts((currentCartProducts) => {
      if (currentCartProducts.find((item) => item.id === id)?.quantity === 1) {
        return currentCartProducts.filter((item) => item.id !== id);
      } else {
        return currentCartProducts.map((cartProduct) => {
          if (cartProduct.id === id) {
            return { ...cartProduct, quantity: cartProduct.quantity - 1 };
          } else {
            return cartProduct;
          }
        });
      }
    });
  };

  const removeProductsFromCart = (id: number) => {
    setCartProducts((currentCartProducts) => {
      return currentCartProducts.filter((product) => product.id !== id);
    });
  };

  const getSubTotal = () => {
    let pricesArr: number[] = [];
    cartProducts.map((product, index) => {
      const price =
        (initialProducts.current.find((item) => item.id === product.id)?.price || 0) *
        product.quantity;
      pricesArr[index] = price;
    });
    const total = pricesArr.reduce(
      (finalTotal, currentPrice) => finalTotal + currentPrice,
      0
    );

    return total;
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
        productsLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
