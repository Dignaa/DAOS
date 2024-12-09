import styles from './InstrumentBox.module.css';

interface Props {
  instrument: string;
}

export default function InstrumentBox({ instrument }: Props) {
  return <li className={styles.box}>{instrument}</li>;
}
