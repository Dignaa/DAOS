import styles from './List/List.module.css';
import InstrumentBox from './IntrumentBox';

interface IntrumentProps {
  instruments: string[];
}
export default function InstrumentList({ instruments }: IntrumentProps) {
  return (
    <ul className={styles.list}>
      {instruments.map((instrument: string, index) => (
        <InstrumentBox key={index + instrument} instrument={instrument} />
      ))}
    </ul>
  );
}
