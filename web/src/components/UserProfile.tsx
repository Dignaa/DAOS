import { Link } from '@tanstack/react-router';
import styles from './UserProfile.module.css';
import buttonStyles from './buttonStyles.module.css';

interface UserProps {
  name: string;
  avatarUrl?: string;
  description?: string;
  lastLoggedIn: Date;
  createdAt: Date;
}

export default function UserProfile({
  name,
  description,
  avatarUrl = '/illustrations/icons/user-icon.svg',
  lastLoggedIn,
  createdAt,
}: UserProps) {
  //Conver date format for - CreatedAt
  const creationDate = new Date(createdAt.toString());
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
  };
  let createdAtString = creationDate.toLocaleDateString('da-DK', options);
  createdAtString =
    createdAtString.charAt(0).toUpperCase() + createdAtString.slice(1);
  return (
    <div className={styles.container}>
      <div className={styles.profileBox}>
        <img className={styles.img} src={avatarUrl} alt="" />
        <div className={styles.text}>
          <h1 className={styles.h1}>{name}</h1>
          <p>
            {description ||
              `${name} har ikke skrevet en brugerbeskrivelse endnu.`}
          </p>
          {createdAt && <p className={styles.p}>Oprettet {createdAtString}</p>}
          {lastLoggedIn && (
            <p className={styles.p}>{formatLastLoggedIn(lastLoggedIn)}</p>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        <Link to="/profile/edit" className={buttonStyles.button}>
          Rediger profil
        </Link>
      </div>
    </div>
  );
}

function formatLastLoggedIn(dateStr: Date) {
  const lastLoggedInDate = new Date(dateStr);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffMs = now.getTime() - lastLoggedInDate.getTime();

  // Convert milliseconds to days
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Return formatted string in Danish
  if (diffDays === 0) {
    return 'Sidst logget ind i dag';
  } else if (diffDays === 1) {
    return 'Sidst logget ind 1 dag siden';
  } else {
    return `Sidst logget ind ${diffDays} dage siden`;
  }
}
