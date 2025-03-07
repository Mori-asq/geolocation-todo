import { ButtonHTMLAttributes, ReactNode } from "react";
import "./styles.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
}

const Btn: React.FC<ButtonProps> = ({
  className = "",
  onClick,
  ariaLabel,
  children,
  type = "button",
  ...rest
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Btn;
