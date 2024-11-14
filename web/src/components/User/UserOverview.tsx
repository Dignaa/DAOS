import typographyStyles from '../../components/typographyStyles.module.css';
import buttonStyles from '../../components/buttonStyles.module.css';
import styles from './UserOverview.module.css';
import { Link } from '@tanstack/react-router';
import { IsPhoneNumber } from 'class-validator';

interface User {
  email: string;
  name: string;
  phoneNumber?: string;
  avatarUrl?: string;
  description?: string;
  address?: string;
  seeking?: boolean;
  lastLoggedIn: string;
  instruments: string[];
  createdAt: string;
}

interface Props {
  user: User;
}

export default function UserOverview({ user }: Props) {
  const daysSinceLastLogin = Math.floor(
    (new Date().getTime() - new Date(user.lastLoggedIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        {user.avatarUrl && (
          <img src={user.avatarUrl} alt={user.name} className={styles.image} />
        )}
        <div className={styles.column}>
          <h1 className={typographyStyles.red}>{user.name}</h1>
          <address>{user.address || 'Ingen adresse givet'}</address>
          <p>
            {user.description ||
              `${user.name} har ikke skrevet en brugerbeskrivelse endnu.`}
          </p>
          <a
            className={`${buttonStyles.button} ${buttonStyles.blue}`}
            href={`mailto:${user.email}`}
          >
            {user.email}
          </a>
          {user.phoneNumber && (
            <a
              className={`${buttonStyles.button} ${buttonStyles.blue}`}
              href={`tel:${user.phoneNumber}`}
            >
              {user.phoneNumber}
            </a>
          )}
        </div>
      </div>
      <p className={styles.footer}>
        {daysSinceLastLogin === 0
          ? `Online i dag`
          : daysSinceLastLogin === 1
            ? `Online i går`
            : isNaN(daysSinceLastLogin)
              ? ''
              : `Online for ${daysSinceLastLogin} dage siden`}
        <span
          className={
            daysSinceLastLogin === 0
              ? `${styles.led} ${styles.ledGreen}`
              : daysSinceLastLogin === 1
                ? `${styles.led} ${styles.ledOrangee}`
                : `${styles.led} ${styles.ledRed}`
          }
        ></span>
      </p>
    </div>
  );
}
