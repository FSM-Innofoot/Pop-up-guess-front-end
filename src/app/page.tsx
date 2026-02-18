import React from "react";
import PredictionForm from "./PredictionForm";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <PredictionForm />
    </div>
  );
}
