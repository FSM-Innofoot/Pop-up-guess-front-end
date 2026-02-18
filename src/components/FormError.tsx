import React from 'react';
import styles from './FormError.module.css';

interface FormErrorProps {
  id?: string;
  message: string;
}

export default function FormError({ id, message }: FormErrorProps) {
  return (
    <p id={id} role="alert" className={styles.error}>
      {message}
    </p>
  );
}
