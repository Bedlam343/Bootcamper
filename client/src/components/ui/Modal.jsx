import { createPortal } from 'react-dom';

const Modal = ({ open, children }) => {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed w-[100%] h-[100%] top-0 z-50 left-0 bg-black 
flex items-center justify-center bg-opacity-90"
    >
      {children}
    </div>,
    document.getElementById('overlays')
  );
};

export default Modal;
