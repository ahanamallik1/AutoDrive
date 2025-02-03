"use client";

import React from "react";
import { FC } from "react";

// Navbar component that displays the header text.
const Navbar: FC = () => {
  return (
    <nav className="bg-orange-100 shadow-md p-4">
      <div className="container mx-auto flex justify-center">
        <h6 className="text-4xl text-black text-center">
          Sell your electric car online effortlessly
        </h6>
      </div>
    </nav>
  );
};

export default Navbar;
