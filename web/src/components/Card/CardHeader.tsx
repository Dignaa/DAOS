import styles from './CardHeader.module.css';

interface Props {
  name?: string;
  address?: string;
  info?: number;
  image?: string;
}

export default function CardHeader({ name, address, info, image }: Props) {
  const shortAddress = address?.split(/[.,]/)[0];
  return (
    <header className={styles.header}>
      {image && (
        <img
          className={styles.image}
          src={image}
          width={40}
          height={40}
          alt=""
        />
      )}
      <div>
        <p className={styles.name}>{name}</p>
        <div>
          {address && (
            <address className={styles.address}>{shortAddress}</address>
          )}
          {info && (info === 1 ? ` ${info} musiker` : ` ${info} musikere`)}
        </div>
      </div>
      <img className={styles.icon} src="/illustrations/jazz.svg" alt="" />
    </header>
  );
}
