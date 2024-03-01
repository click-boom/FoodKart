import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const PopupModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const handleClose = () => {
    onClose();
  };

  return isOpen ? (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-700 bg-opacity-70">
      <div className="bg-white rounded text-center w-[50%] h-[85vh] ">
        <div className="flex justify-end m-1">
          <button onClick={handleClose} className="p-2">
            <IoIosCloseCircle size={50} color="#FFD700" />
          </button>
        </div>
        {children}
      </div>
    </div>
  ) : null;
};
