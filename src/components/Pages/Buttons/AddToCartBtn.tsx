import { useNavigate } from "react-router-dom";
import { useShop } from "../../../context/AppContext";

type AddToCartBtnProps = {
  id: number;
};

const AddToCartBtn = ({ id }: AddToCartBtnProps) => {
  const { getProductQuantity, increaseProductQuantity } = useShop();

  const quantity = getProductQuantity(id);
  const navigate = useNavigate();

  return (
    <>
      {quantity === 0 ? (
        <button
          className="w-auto bg-orange-500 hover:bg-orange-700 rounded py-3 mx-2 font-semibold text-white select-none"
          onClick={() => increaseProductQuantity(id)}
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex flex-col">
          <div className="flex ml-6 gap-x-4 mb-4 text-lg font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 bg-green-600 ring-2 ring-black text-white rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <p className="dark:text-black">Added to Cart</p>
          </div>
          <button
            className="w-auto bg-orange-500 hover:bg-orange-700 rounded py-3 mx-2 font-semibold text-white hover:cursor-pointer select-none flex justify-center gap-x-2"
            onClick={() => navigate("/checkout")}
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
      )}
    </>
  );
};

export default AddToCartBtn;
