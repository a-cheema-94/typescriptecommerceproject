import { useNavigate } from "react-router-dom"
import { useCart } from "../../../context/AppContext";

type ModalPropTypes = {
  open: boolean
  close: () => void
}

const Modal = ({ open, close }: ModalPropTypes) => {
  if(!open) return null
  const navigate = useNavigate();
  const { completeOrder } = useCart();

  const handleConfirmPurchase = () => {
    navigate('/previousOrders');
    completeOrder();
  }
  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-30 dark:bg-opacity-50"></div>
      <div className="flex flex-col gap-y-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-secondary-color dark:bg-slate-900 dark:text-white rounded px-12 py-6 border-2 border-orange-500">
        <p className="text-xl text-center font-semibold">Confirm </p>
        <div className="flex gap-x-4 justify-center">
          <button
            onClick={handleConfirmPurchase}
            className="w-24 bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white cursor-pointer select-none"
          >
            Buy
          </button>
          <button 
            onClick={close}
            className="w-24 bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white cursor-pointer select-none"
          >
            close
          </button>
        </div>
      </div>
    </>
  )
}

export default Modal