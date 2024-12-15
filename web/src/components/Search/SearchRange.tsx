import styles from './SearchRange.module.css';

export default function SearchRange({ updateDistance }: any) {
  return (
    <input
      className={styles.range}
      onChange={updateDistance}
      type="range"
      name="range"
      min="1"
      defaultValue="50"
      step="1"
      max="1000"
    />
  );
}
