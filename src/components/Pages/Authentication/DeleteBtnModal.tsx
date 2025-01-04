import { useNavigate } from "react-router-dom";
import { useShop } from "../../../context/AppContext";

type DeleteBtnModalPropTypes = {
  open: boolean;
  close: () => void;
};

const DeleteBtnModal = ({ open, close }: DeleteBtnModalPropTypes) => {
  if (!open) return null;

  const { deleteUser } = useShop();
  const navigate = useNavigate();

  const handleConfirmBtn = () => {
    navigate("/");
    deleteUser();
  };

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-30 dark:bg-opacity-50"></div>
      <div className="flex flex-col gap-y-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-secondary-color dark:bg-slate-900 dark:text-white rounded px-12 py-6 border-2 border-orange-500">
        <p className="text-xl text-center font-semibold">
          Permanently delete your account?
        </p>
        <div className="flex gap-x-4 justify-center">
          <button
            onClick={handleConfirmBtn}
            className="w-24 bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white cursor-pointer select-none"
          >
            Delete
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
  );
};

export default DeleteBtnModal;
