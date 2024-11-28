import styles from './Grid.module.css';

interface IntrumentProps {
  instruments: string[];
}
export default function InstrumentGrid({ instruments }: IntrumentProps) {
  return (
    <ul className={styles.grid}>
      {instruments.map((instrument: string, index) => (
        <li key={index + instrument}>{instrument}</li>
      ))}
    </ul>
  );
}
