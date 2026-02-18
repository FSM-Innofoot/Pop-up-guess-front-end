import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
}

export default function Button({ children, variant = 'primary', className, ...rest }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles[variant]} ${className ?? ''}`} {...rest}>
      {children}
    </button>
  );
}
