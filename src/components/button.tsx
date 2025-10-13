import React from "react";

type ButtonVariant = "filled" | "unfilled" | "icon";
type ButtonSize = "large" | "medium" | "small";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
}

const sizeClasses = {
  large: "py-[12px] px-[40px] text-button-large",
  medium: "py-[10px] px-[32px] text-button-medium",
  small: "py-[8px] px-[24px] text-button-small",
};

const variantClasses = {
  filled: "bg-primary-700 text-white",
  unfilled: "bg-transparent text-gray-800 border border-primary-700",
  icon: "bg-primary-700 text-white flex items-center gap-[4px]",
};

export default function Button({
  children,
  variant = "filled",
  size = "large",
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseClasses = "rounded-lg disabled:cursor-not-allowed";
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClass} ${variantClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
