import { MutableRefObject } from "react";
import { User, UserCredential } from "firebase/auth";

type RatingType = {
  rate: number;
  count: number;
};

type ProductItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  rating: number;
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
  loggedInUser: User | null;
  signUp: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  login: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (password: string) => Promise<void> | null;
  logOut: () => Promise<void>;
  deleteUser: () => Promise<void> | undefined;
  productsLoading: boolean;
};

export type { AppContextTypes, OrderItem, ProductItem, RatingType, CartItem };
