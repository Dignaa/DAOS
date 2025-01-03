import styles from './Navbar.module.css';
import buttonStyles from './buttonStyles.module.css';
import { Link } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { session } = useAuth();

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link className={styles.logoTitle} to="/">
          Musik Samspil
        </Link>
        <p>Skabt af DAOS</p>
      </div>
      <ul className={styles.list}>
        <li>
          <Link to="/users">Find musiker</Link>
        </li>
        <li>
          <Link to="/posts">Find ensemble</Link>
        </li>
        {session ? (
          <li>
            <Link
              to="/profile"
              className={`${buttonStyles.button} ${buttonStyles.blue}`}
            >
              Profil
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link
                to="/signup"
                className={`${buttonStyles.button} ${buttonStyles.blue}`}
              >
                Opret bruger
              </Link>
            </li>
            <li>
              <Link to="/signin" className={buttonStyles.button}>
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
