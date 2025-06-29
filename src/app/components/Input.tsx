"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className={`${styles.inputContainer} ${className || ""}`}>
        {label && <label className={styles.label}>{label}</label>}

        <div className={`${styles.inputWrapper} ${error ? styles.error : ""}`}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <input ref={ref} className={styles.input} {...props} />
        </div>

        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
