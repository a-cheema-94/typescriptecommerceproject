import { ProductItem } from "../Types/Types";
import useLocalStorage from "./useLocalStorage";

const useWishlist = () => {
  const [wishlist, setWishlist] = useLocalStorage<ProductItem[]>(
    [],
    "wishlist"
  );

  const addToWishList = (product: ProductItem) => {
    setWishlist((prevWishList) => {
      let newWishList = prevWishList.filter(
        (productItem) => productItem.title !== product.title
      );
      return [...newWishList, product];
    });
  };

  return { wishlist, addToWishList };
};

export default useWishlist;
