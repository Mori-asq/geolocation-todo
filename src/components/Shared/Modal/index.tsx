import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Btn from "../Btn";
import "./styles.css";

type TransitionStyle = "opacity" | "translate";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  hasCloseBtn?: boolean;
  transitionStyle?: TransitionStyle;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  hasCloseBtn = true,
  onClose,
  children,
  transitionStyle = "opacity",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!window) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="backdrop" onClick={handleBackdropClick} />

      <div
        className={`modal-content ${
          transitionStyle === "opacity"
            ? "opacity-transition"
            : "translate-transition"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }} // Stop event propagation
      >
        {hasCloseBtn && (
          <Btn className="close-btn" onClick={onClose} ariaLabel="Close Modal">
            X
          </Btn>
        )}

        <div className="children">{children}</div>
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
