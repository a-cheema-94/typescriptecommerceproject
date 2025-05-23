import { KeyboardEvent, useState } from "react";
import { useShop } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import SearchBtn from "./SearchBtn";
import { formatRatings } from "../../utilities/formatRatings";
import { ProductItem } from "../../Types/Types";

const SearchBar = () => {
  const { products } = useShop();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredProducts = products.filter((product: ProductItem) => {
    return product.title.toLowerCase().includes(query.toLowerCase());
  });

  const resetQuery = () => setQuery("");

  const handleEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      resetQuery();
      navigate("/wishlistSearchResults", { state: { filteredProducts } });
    }
  };

  return (
    <div className="relative">
      <div className="searchBar dark:text-white">
        <input
          id="search-bar-id"
          className="px-6 py-3 rounded border-2 border-slate-300 focus:outline-none select-none focus:border-orange-500 w-full bg-primary-color dark:bg-slate-500 placeholder-opacity-80"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="search for products..."
        />

        {query ? (
          <Link to="/wishlistSearchResults" state={{ filteredProducts }}>
            <SearchBtn resetQuery={resetQuery} />
          </Link>
        ) : (
          <SearchBtn resetQuery={resetQuery} />
        )}
      </div>

      {query && (
        <div className="bg-primary-color dark:bg-slate-500 dark:text-white absolute top-15 text-start w-full p-3 rounded max-h-52 overflow-auto z-40 border-2 border-gray-300">
          {filteredProducts.map(
            ({
              id,
              description,
              images,
              price,
              rating,
              title
            }: ProductItem) => {
              const ratingsArray = formatRatings(rating);

              return (
                <Link
                  to="/productPage"
                  state={{
                    title,
                    price,
                    ratingsArray,
                    images,
                    rating,
                    description,
                  }}
                  key={id}
                >
                  <button
                    className="text-start p-2 hover:bg-black/[.1] rounded"
                    key={id}
                    onClick={resetQuery}
                  >
                    {title}
                  </button>
                  <hr />
                </Link>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
