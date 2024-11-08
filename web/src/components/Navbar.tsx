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
          <a href="/users">Find Musiker</a>
        </li>
        <li>
          <a href="/groups">Find Ensemble</a>
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
