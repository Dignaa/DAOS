import React from 'react';
import styles from './SearchContainer.module.css';

interface SearchContainerProps {
  children: React.ReactNode;
}

export default function SearchContainer({ children }: SearchContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
