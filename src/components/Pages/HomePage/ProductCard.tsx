import { formatCurrency } from "../../../utilities/formatCurrency";
import { Link } from "react-router-dom";
import { useShop } from "../../../context/AppContext";
import WishListBtn from "../WishList/WishListBtn";
import AddToCartBtn from "../Buttons/AddToCartBtn";
import { ProductItem as ProductCardProps } from "../../../Types/Types";
import { formatRatings } from "../../../utilities/formatRatings";

const ProductCard = (product: ProductCardProps) => {
  const { id, title, price, description, images, rating } = product;

  const { addToWishList } = useShop();

  const { rate } = rating;
  const ratingsArray = formatRatings(rating.rate);

  const image = images[0];

  return (
    <div className="border-2 border-neutral-200 flex flex-col justify-center rounded px-4 py-8 bg-secondary-color dark:bg-slate-300 gap-4 h-full">
      <div className="relative image-container w-8/12 sm:w-full self-center">
        <Link
          to="/productPage"
          state={{
            id,
            title,
            price,
            ratingsArray,
            image,
            rate,
            description,
          }}
        >
          <img
            src={image}
            className="object-scale-down w-full p-3  mix-blend-multiply hover:cursor-pointer"
          />
          <span className="tooltip invisible w-24 bg-neutral-500 text-white font-semibold text-center rounded absolute">
            View product details
          </span>
        </Link>
      </div>

      <div className="flex flex-col px-5 card-info-contents">
        <h1 className="text-gray-900 text-xl font-semibold">{title}</h1>
        <div className="price-wishlistBtn flex gap-x-4 mt-2">
          <p className="font-bold text-gray-900 text-3xl">
            {formatCurrency(price)}
          </p>
          <button
            className="relative wishlist-btn"
            onClick={() => addToWishList(product)}
          >
            <WishListBtn />
            <span className="tooltip invisible w-fit bg-neutral-500 text-white font-semibold text-center rounded absolute">
              Add to Wish list
            </span>
          </button>
        </div>
      </div>
      <AddToCartBtn id={id} />
    </div>
  );
};

export default ProductCard;
