import { Link } from '@tanstack/react-router';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.column}>
          <p className={styles.title}>Musik Samspil</p>
          <ul className={styles.links}>
            <li>
              <Link to="/posts">Se opslag</Link>
            </li>
            <li>
              <Link to="/profile">Profil</Link>
            </li>
          </ul>
          <ul className={styles.socials}>
            <li>
              <img src="/illustrations/icons/footer-facebook.svg" alt="" />
            </li>
            <li>
              <img src="/illustrations/icons/footer-instagram.svg" alt="" />
            </li>
            <li>
              <img src="/illustrations/icons/footer-linkedin.svg" alt="" />
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <img
            className={styles.illustration}
            src="/illustrations/footer-music.svg"
            alt=""
          />
        </div>
        <div className={styles.column}>
          <div className={styles.card}>
            <p>Bragt til dig af</p>
            <img
              className={styles.illustration}
              src="/illustrations/logo2.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <p>Privatlivspolitik</p>
    </footer>
  );
}
