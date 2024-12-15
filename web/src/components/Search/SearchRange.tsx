import styles from './SearchRange.module.css';

export default function SearchRange({ updateDistance }: any) {
  return (
    <input
      className={styles.range}
      onChange={updateDistance}
      type="range"
      name="range"
      min="0"
      defaultValue="50"
      step="10"
      max="999"
    />
  );
}
