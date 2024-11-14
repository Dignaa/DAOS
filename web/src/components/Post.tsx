import styles from './Post.module.css';

interface PostProps {
  _id?: string;
  title?: string;
  user?: string;
  instrument?: string;
  date?: string;
  address?: string;
  avatarUrl?: string;
  createdAt?: string;
  description?: string;
  email?: string;
  groups?: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
  instruments?: string[];
  lastLoggedIn?: string;
  name?: string;
  phoneNumber?: string;
  seeking?: boolean;
  type: string;
}

export default function Post({
  _id,
  title,
  user,
  instrument,
  date,
  address,
  type,
}: PostProps) {
  const formattedDate = date
    ? new Date(date)
        .toLocaleString('da-DK', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        })
        .replace(',', '')
    : 'Ingen dato';
  return (
    <li className={styles.post}>
      <a className={styles.link} href={`/posts/${_id}`}>
        <header className={styles.header}>
          {title}
          <img className={styles.icon} src="/illustrations/jazz.svg" alt="" />
        </header>
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
      </a>
    </li>
  );
}
