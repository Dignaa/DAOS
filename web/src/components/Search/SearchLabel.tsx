import React from 'react';
import styles from './SearchLabel.module.css';

interface SearchContainerProps {
  children: React.ReactNode;
}

export default function SearchLabel({ children }: SearchContainerProps) {
  return <label className={styles.label}>{children}</label>;
}
