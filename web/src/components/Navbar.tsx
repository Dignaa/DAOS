import styles from './Navbar.module.css';
import buttonStyles from './buttonStyles.module.css';

export default function Navbar() {
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
          <a href="/groups">Find ensemble</a>
        </li>
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
      </ul>
    </nav>
  );
}
