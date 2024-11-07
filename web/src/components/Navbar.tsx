import styles from './Navbar.module.css';
import buttonStyles from './buttonStyles.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <p className={styles.logoTitle}>Musik Samspil</p>
        <p>Skabt af DAOS - Dansk Amatørorkester Samvirke</p>
      </div>
      <ul className={styles.list}>
        <li>
          <a href="/posts">Opslag</a>
        </li>
        <li>
          <a href="/profile">Profil</a>
        </li>
        <li>
          <button className={`${buttonStyles.button} ${buttonStyles.blue}`}>
            Opret Bruger
          </button>
        </li>
        <li>
          <button className={buttonStyles.button}>Login</button>
        </li>
      </ul>
    </nav>
  );
}
