import styles from './CardContent.module.css';

interface Props {
  instruments?: string | string[];
  title?: string;
}

export default function CardContent({ instruments, title }: Props) {
  const instrumentsArray = Array.isArray(instruments)
    ? instruments
    : [instruments];

  return (
    <div className={styles.content}>
      {title && <p className={styles.title}>{title}</p>}
      {instrumentsArray?.map((instrument, index) => (
        <div className={styles.instrument} key={index}>
          <p>{instrument}</p>
          <img src="illustrations/icons/instrument-icon.svg" alt="" />
        </div>
      ))}
    </div>
  );
}
