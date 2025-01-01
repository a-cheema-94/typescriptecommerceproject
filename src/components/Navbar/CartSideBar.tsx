import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/AppContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../../utilities/formatCurrency";

type CartSideBarProps = {
  cartWidth: string;
  closeCart: () => void;
};

const CartSideBar = ({ cartWidth, closeCart }: CartSideBarProps) => {
  const { cartProducts, getSubTotal } = useCart();
  const navigate = useNavigate();

  const handleCloseCart = () => {
    navigate("/checkout");
    closeCart();
  };

  return (
    <div
      className={`flex flex-col gap-y-3 h-screen fixed z-20 ${cartWidth} bg-secondary-color dark:bg-slate-900 right-0 top-0 overflow-y-auto`}
    >
      <button
        className="bg-orange-500 dark:text-white dark:ring-white ring-black ring-1 rounded-full w-fit px-2 m-2 hover:bg-orange-700"
        onClick={closeCart}
      >
        X
      </button>

      <h1 className="text-center text-xl font-semibold dark:text-white">
        Subtotal:{" "}
        <span className="font-bold">{formatCurrency(getSubTotal())}</span>
      </h1>

      {cartProducts.map((item) => (
        <div key={item.id} className="flex flex-col">
          <CartItem {...item} />
          <hr />
        </div>
      ))}

      <button
        className="bg-orange-500 hover:bg-orange-700 rounded py-3 mx-2 mb-6 font-semibold text-white hover:cursor-pointer select-none flex justify-center gap-x-2"
        onClick={handleCloseCart}
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
        </svg>
        Go to Checkout
      </button>
    </div>
  );
};

export default CartSideBar;
