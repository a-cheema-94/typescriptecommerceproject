import { useLocation } from "react-router-dom";
import { useShop } from "../../../context/AppContext";
import ProductCard from "../HomePage/ProductCard";
import BackBtn from "../Buttons/BackBtn";
import { ProductItem } from "../../../Types/Types";

const WishList_SearchResults = () => {
  const { wishlist } = useShop();

  const { state } = useLocation();
  let filteredProducts = [];
  if (state) {
    filteredProducts = state.filteredProducts;
  }

  return (
    <div className="p-6 h-fit min-h-screen flex flex-col gap-y-4 bg-primary-color dark:bg-slate-900 dark:text-white">
      <BackBtn />

      {state && (
        <div className="searchResults">
          <h1 className="text-2xl mb-3">Search Results:</h1>

          <div className="product-grid gap-3">
            {filteredProducts.map((item: ProductItem, index: number) => (
              <ProductCard key={index} {...item} />
            ))}
          </div>
          <br />
          <hr />
        </div>
      )}

      <div className="wishlist mb-7">
        <h1 className="text-2xl mb-3">WishList:</h1>

        {wishlist.length > 0 ? (
          <div className="product-grid gap-3">
            {wishlist.map((item, index) => (
              <ProductCard key={index} {...item} />
            ))}
          </div>
        ) : (
          <h1 className="text-semibold text-xl mb-3">Your wishlist is empty</h1>
        )}
      </div>
    </div>
  );
};

export default WishList_SearchResults;
