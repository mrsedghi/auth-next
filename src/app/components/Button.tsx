"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
        ${styles.button} 
        ${styles[`variant-${variant}`]} 
        ${styles[`size-${size}`]}
        ${fullWidth ? styles.fullWidth : ""}
        ${className || ""}
      `}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className={styles.loader}></span>
        ) : (
          <>
            {icon && <span className={styles.icon}>{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
