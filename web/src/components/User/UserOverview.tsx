import typographyStyles from '../../components/typographyStyles.module.css';
import buttonStyles from '../../components/buttonStyles.module.css';
import styles from './UserOverview.module.css';
import daysAgo from '../../utils/daysAgo';

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
  const daysSinceLastLogin = daysAgo(user.lastLoggedIn);
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <img
          src={user.avatarUrl || '/illustrations/icons/user-icon.svg'}
          alt={user.name}
          className={styles.image}
        />
        <div className={styles.column}>
          <h1 className={typographyStyles.red}>{user.name}</h1>
          <address className={styles.address}>
            {user.address || 'Ingen adresse givet'}
          </address>
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
      <div className={styles.footer}>
        <p>
          {daysSinceLastLogin === 0
            ? `Online i dag`
            : daysSinceLastLogin === 1
              ? `Online i går`
              : isNaN(daysSinceLastLogin)
                ? ''
                : `Online for ${daysSinceLastLogin} dage siden`}
        </p>
        <span
          className={
            daysSinceLastLogin === 0
              ? `${styles.led} ${styles.ledGreen}`
              : daysSinceLastLogin === 1
                ? `${styles.led} ${styles.ledYellow}`
                : `${styles.led} ${styles.ledRed}`
          }
        ></span>
      </div>
    </div>
  );
}
