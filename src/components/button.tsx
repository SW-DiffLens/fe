import type React from "react";

type ButtonVariant = "filled" | "outlined" | "icon";
type ButtonSize = "large" | "medium" | "small";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

const sizeClasses = {
  large: "py-[12px] px-[40px] text-button-large",
  medium: "py-[10px] px-[32px] text-button-medium",
  small: "py-[8px] px-[24px] text-button-small",
};

export default function Button({
  children,
  variant = "filled",
  size = "large",
  onClick,
  disabled = false,
  fullWidth = false,
  type = "button",
  bgColor = "primary-700",
  textColor = "white",
  borderColor = "primary-700",
}: ButtonProps) {
  const baseClasses = "rounded-lg disabled:cursor-not-allowed cursor-pointer";
  const sizeClass = sizeClasses[size];
  const variantClasses: Record<ButtonVariant, string> = {
    filled: `bg-${bgColor} text-${textColor} flex items-center justify-center gap-[4px]`,
    outlined: `bg-transparent text-gray-800 border border-${borderColor} flex items-center justify-center gap-[4px]`,
    icon: `bg-${bgColor} text-${textColor} flex items-center justify-center gap-[4px]`,
  };
  const variantClass = variantClasses[variant];
  const fullWidthClass = fullWidth ? "w-full" : "";
  return (
    <button
      className={`${baseClasses} ${sizeClass} ${variantClass} ${fullWidthClass}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
