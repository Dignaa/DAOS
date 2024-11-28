import { Link } from '@tanstack/react-router';
import styles from './GroupCard.module.css';

// GroupProps interface for Group data type
interface GroupProps {
  _id: string;
  name: string;
  imageUrl?: string;
}

// Card component definition
export default function Card({ _id, name, imageUrl }: GroupProps) {
  return (
    <li className={styles.card}>
      <Link
        to="/groups/$groupId"
        params={{ groupId: _id }}
        className={styles.link}
      >
        <div className={styles.cardImageWrapper}>
          <img
            src={imageUrl || '/illustrations/icons/group-icon.svg'}
            alt={''}
            className={styles.cardImage}
          />
        </div>
        <h1 className={styles.cardTitle}>{name}</h1>
      </Link>
    </li>
  );
}
