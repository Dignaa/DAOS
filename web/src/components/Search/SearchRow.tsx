import React from 'react';
import styles from './SearchRow.module.css';

interface SearchContainerProps {
  children: React.ReactNode;
}

export default function SearchRow({ children }: SearchContainerProps) {
  return <div className={styles.row}>{children}</div>;
}
