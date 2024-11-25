import CardHeader from './Card/CardHeader';
import cardStyles from './Card/Card.module.css';
import styles from './Grid.module.css';

interface IntrumentProps {
  instruments: string[];
}
export default function InstrumentGrid({ instruments }: IntrumentProps) {
  return (
    <ul className={styles.grid}>
      {instruments.map((instrument: string) => (
        <div className={cardStyles.card}>
          <CardHeader name={instrument} key={instrument} />
        </div>
      ))}
    </ul>
  );
}
