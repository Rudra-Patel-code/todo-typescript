import React from "react";

// TODO: add close on space click
const ModalContainer = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return (
    <div
      onClick={onClose}
      className="z-40 absolute top-0 left-0 w-[100%] h-[100%] flex justify-center items-center bg-black/50 backdrop-blur-md"
    >
      {children}
    </div>
  );
};

export default ModalContainer;
