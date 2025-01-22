import { useShop } from "../../context/AppContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import ImageLoader from "../ImageLoader";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const {
    initialProducts,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductsFromCart,
  } = useShop();

  const cartItem = initialProducts.current.find((item) => item.id === id);
  if (cartItem == null) return null;

  const { images, price, title } = cartItem;
  const cartPrice = formatCurrency(price);

  const quantityBtnClasses =
    "bg-orange-500 hover:bg-orange-700 font-semibold w-1/12 rounded text-white";

  const image = images[0];

  return (
    <div className="w-11/12 self-center mb-3 dark:bg-slate-300 py-2 rounded">
      <ImageLoader
        src={image}
        className="aspect-[1/.5] object-scale-down mix-blend-multiply"
        alt={title}
        dimensions={{ height: '50px', width: '50px' }}
      />

      <div className="flex gap-x-2 justify-center my-2">
        <p className="font-bold text-lg">
          {quantity > 0 ? formatCurrency(price * quantity) : cartPrice}
        </p>

        <button
          className="hover:text-red-600 relative deleteItemBtn"
          onClick={() => removeProductsFromCart(id)}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
            />
          </svg>
          <span className="tooltip invisible w-fit bg-neutral-500 text-white font-semibold rounded absolute">
            Delete
          </span>
        </button>
      </div>

      <div className="flex justify-center gap-x-2">
        <button
          className={quantityBtnClasses}
          onClick={() => decreaseProductQuantity(id)}
        >
          -
        </button>

        <p>Qty: {quantity}</p>

        <button
          className={quantityBtnClasses}
          onClick={() => increaseProductQuantity(id)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
