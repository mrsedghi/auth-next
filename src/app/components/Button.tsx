"use client";

import React, { ButtonHTMLAttributes } from "react";
import styles from "../auth/auth.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[`button-${variant}`]}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
