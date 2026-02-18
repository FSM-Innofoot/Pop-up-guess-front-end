import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>
        © {new Date().getFullYear()} Football Shirt Market — All rights reserved.
      </span>
    </footer>
  );
}
