import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import { ProductItem } from "../Types/Types";

const useCategories = (
  initialProducts: MutableRefObject<ProductItem[]>,
  setProducts: Dispatch<SetStateAction<ProductItem[]>>
) => {
  const [categoryPressed, setCategoryPressed] = useState("");
  // categories
  const categories = Array.from(
    new Set(
      initialProducts.current.map((product: ProductItem) => product.category)
    )
  );
  // FUNCTIONS

  // categories
  const filterByCategory = (category: string) => {
    const newProducts = initialProducts.current.filter(
      (product: ProductItem) => product.category === category
    );
    setCategoryPressed(category);
    setProducts(newProducts);
  };

  const resetCategories = () => {
    setCategoryPressed("All");
    setProducts(initialProducts.current);
  };

  return { categories, categoryPressed, filterByCategory, resetCategories };
};

export default useCategories;
