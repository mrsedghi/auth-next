"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import styles from "./dashboard.module.scss";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to auth page if user is not logged in
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.welcomeMessage}>
        Welcome to the Dashboard, {user.name.first} {user.name.last}!
      </h1>
    </div>
  );
}
