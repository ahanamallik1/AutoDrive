"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
  children?: React.ReactNode;
}
// A reusable back button component that navigates to the previous page using Next.js router.
const Button: React.FC<BackButtonProps> = ({ className = "", children }) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label="Go back"
    >
      {children || "Back"}
    </button>
  );
};

export default Button;
