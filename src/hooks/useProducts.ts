import { useEffect, useRef, useState } from "react";
import { ProductItem } from "../Types/Types";

const useProducts = () => {
  const [productsLoading, setProductsLoading] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);

  let isMounted = useRef(true);
  // isMounted ref used to guard against api calling when component unmounts.
  // E.g. when api may be slow and component unmounts before fetch call finishes.
  let initialProducts = useRef([] as ProductItem[]);
  // initialProducts ref used to store all of the product data in initial form.

  useEffect(() => {
    async function fetchProducts() {
      setProductsLoading(true);
      try {
        const productRes = await fetch(
          "https://dummyjson.com/products?limit=30&skip=82&select=id,title,description,category,price,rating,images"
        );
        console.log("fetched products");
        const productData = await productRes.json();
        initialProducts.current = productData.products;
        setProducts(initialProducts.current);
      } catch (error) {
        console.error(
          "An error occurred fetching products from dummy json api: ",
          error
        );
      } finally {
        setProductsLoading(false);
      }
    }

    if (isMounted.current && initialProducts.current.length === 0)
      fetchProducts();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { initialProducts, products, productsLoading, setProducts };
};

export default useProducts;
