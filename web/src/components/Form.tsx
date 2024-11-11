import { FormEvent, ReactNode } from 'react';
import styles from './Form.module.css';

interface FormProps {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, onSubmit }: FormProps): JSX.Element {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
}
