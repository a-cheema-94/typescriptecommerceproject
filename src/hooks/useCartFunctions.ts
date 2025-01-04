import { MutableRefObject } from "react";
import { CartItem, ProductItem } from "../Types/Types";
import useLocalStorage from "./useLocalStorage";

const useCartFunctions = (initialProducts: MutableRefObject<ProductItem[]>) => {
  const [cartProducts, setCartProducts] = useLocalStorage<CartItem[]>(
    [],
    "cartProducts"
  );

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
        (initialProducts.current.find((item) => item.id === product.id)
          ?.price || 0) * product.quantity;
      pricesArr[index] = price;
    });
    const total = pricesArr.reduce(
      (finalTotal, currentPrice) => finalTotal + currentPrice,
      0
    );

    return total;
  };

  return {
    cartProducts,
    setCartProducts,
    getProductQuantity,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductsFromCart,
    getSubTotal,
  };
};

export default useCartFunctions;
