import styles from './Hero.module.css';

interface propTypes {
  src: string;
}

export default function Hero({ src }: propTypes) {
  return <img src={src} className={styles.image} />;
}
