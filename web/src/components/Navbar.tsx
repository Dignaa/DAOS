import styles from './Navbar.module.css';
import buttonStyles from './buttonStyles.module.css';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { session } = useAuth();

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <a href="/" className={styles.logoTitle}>
          Musik Samspil
        </a>
        <a href="https://daos.dk">Skabt af DAOS</a>
      </div>
      <ul className={styles.list}>
        <li>
          <a href="/users">Find musiker</a>
        </li>
        <li>
          <a href="/posts">Find ensemble</a>
        </li>
        {session ? (
          <li>
            {' '}
            <a
              href="/profile"
              className={`${buttonStyles.button} ${buttonStyles.blue}`}
            >
              Profil
            </a>
          </li>
        ) : (
          <>
            <li>
              <a
                href="/signup"
                className={`${buttonStyles.button} ${buttonStyles.blue}`}
              >
                Opret bruger
              </a>
            </li>
            <li>
              <a href="/signin" className={buttonStyles.button}>
                Login
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
