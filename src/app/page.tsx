"use client";

import { useAuth } from "./context/AuthContext";
import styles from "./page.module.scss";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {user
              ? `Welcome back, ${user.name.first}!`
              : "Modern Authentication Solution"}
          </h1>
          <p className={styles.subtitle}>
            {user
              ? "You are successfully logged in"
              : "Secure, fast, and beautiful authentication for your Next.js applications"}
          </p>

          <div className={styles.techStack}>
            <div className={styles.techPill}>Next.js</div>
            <div className={styles.techPill}>TypeScript</div>
            <div className={styles.techPill}>SCSS Module</div>
          </div>

          <div className={styles.buttons}>
            {user ? (
              <a href="/dashboard" className={styles.primaryButton}>
                Go to Dashboard
              </a>
            ) : (
              <a href="/auth" className={styles.primaryButton}>
                Get Started
              </a>
            )}
            <a
              href="https://github.com/mrsedghi/auth-next"
              className={styles.secondaryButton}
              target="_blank"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className={styles.illustration}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          {user && (
            <div className={styles.userBadge}>
              <img src={user.picture.large} alt={user.name.first} />
              <span>
                {user.name.first} {user.name.last}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
