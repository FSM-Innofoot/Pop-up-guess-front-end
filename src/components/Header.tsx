import React from 'react';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Image
        src="/fsm-logo.png"
        alt="Football Shirt Market"
        width={160}
        height={72}
        priority
        className={styles.logo}
      />
    </header>
  );
}
