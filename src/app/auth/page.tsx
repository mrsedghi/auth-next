"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from "./auth.module.scss";

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const validatePhone = (phone: string): boolean => {
    const iranPhoneRegex = /^(\+98|0)?9\d{9}$/;
    return iranPhoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      setError("لطفا شماره تلفن همراه معتبر وارد کنید");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await login();
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("خطا در ورود. لطفا دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>ورود به سیستم</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="شماره تلفن همراه"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="09XXXXXXXXX"
            error={error}
            required
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className={styles.submitButton}
          >
            ورود
          </Button>
        </form>
      </div>
    </div>
  );
}
