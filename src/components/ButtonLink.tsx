"use client";

import React from "react";
import Link from "next/link";

interface ButtonLinkProps {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
}

// A reusable link component styled as a button and accessible by keyboard
const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  ariaLabel,
  children,
  className = "",
}) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <a aria-label={ariaLabel} className={className}>
        {children}
      </a>
    </Link>
  );
};

export default ButtonLink;
