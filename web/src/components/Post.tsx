import styles from './Post.module.css';

interface PostProps {
  title: string;
  user: string;
  instrument: string;
  date: string;
  address: string;
}

export default function Section({
  title,
  user,
  instrument,
  date,
  address,
}: PostProps) {
  const formattedDate = new Date(date)
    .toLocaleString('da-DK', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', '');

  return (
    <li className={styles.post}>
      <a className={styles.link} href="/">
        <header className={styles.header}>{title}</header>
        <div className={styles.content}>
          <p className={styles.info}>
            <img src="illustrations/icons/author-icon.svg" alt="" />
            {user}
          </p>
          <p className={styles.info}>
            <img src="illustrations/icons/instrument-icon.svg" alt="" />
            {instrument}
          </p>
        </div>
        <footer className={styles.footer}>
          <time dateTime={date}>{formattedDate}</time> •{' '}
          <address className={styles.address}>{address}</address>
          <img className={styles.icon} src="/illustrations/jazz.svg" alt="" />
        </footer>
      </a>
    </li>
  );
}
