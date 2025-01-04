import { useNavigate } from "react-router-dom";
import { useShop } from "../../../context/AppContext";
import CartItem from "../../Navbar/CartItem";
import { formatCurrency } from "../../../utilities/formatCurrency";
import Modal from "./Modal";
import { useState } from "react";
import BackBtn from "../Buttons/BackBtn";

const Checkout = () => {
  const { cartProducts, initialProducts, getSubTotal, loggedInUser } =
    useShop();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const handleBuyNowBtn = () => {
    if (!loggedInUser) {
      navigate("/login");
    }
    setOpenModal(true);
  };
  const closeModal = () => setOpenModal(false);

  const isCartEmpty = cartProducts.length === 0;

  return (
    <div
      className={`checkout-page bg-secondary-color dark:bg-slate-900 ${
        isCartEmpty ? "h-screen" : "h-full"
      } flex flex-col gap-y-4`}
    >
      <div className="flex justify-between items-center m-6">
        <BackBtn />

        <h1 className="font-semibold text-3xl dark:text-white">Checkout</h1>

        <button
          className="w-28 bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white hover:cursor-pointer select-none flex gap-x-2"
          onClick={() => navigate("/previousOrders")}
        >
          Orders
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
            />
          </svg>
        </button>
      </div>

      <div className="self-center checkout-item flex flex-wrap justify-center gap-5 ml-2 ">
        {!isCartEmpty ? (
          cartProducts.map((item, id) => {
            const title = initialProducts.current.find(
              (product) => product.id === item.id
            )?.title;

            return (
              <div
                className="w-80 flex flex-col gap-y-4 border-2 border-orange-500 p-5 rounded bg-orange-200 dark:bg-slate-300 mb-6 mx-1"
                key={id}
              >
                <h1 className="text-center font-bold">{title}</h1>
                <CartItem {...item} />
              </div>
            );
          })
        ) : (
          <p className="text-xl dark:text-white">No items in cart</p>
        )}
      </div>

      {!isCartEmpty && (
        <div className="self-end flex flex-col items-center mr-20 gap-y-3 mb-3">
          <p className="font-semibold text-xl dark:text-white">
            TOTAL:{" "}
            <span className="font-bold text-2xl">
              {formatCurrency(getSubTotal())}
            </span>
          </p>

          <button
            className="w-44 bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white cursor-pointer select-none"
            onClick={handleBuyNowBtn}
          >
            Buy Now
          </button>
        </div>
      )}

      {openModal && <Modal open={openModal} close={closeModal} />}
    </div>
  );
};

export default Checkout;
