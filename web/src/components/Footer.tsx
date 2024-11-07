import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.column}>
          <p className={styles.title}>Musik Samspil</p>
          <ul className={styles.links}>
            <li>
              <a href="/">Se opslag</a>
            </li>
            <li>
              <a href="/">Profil</a>
            </li>
          </ul>
          <ul className={styles.socials}>
            <li>
              <a href="">
                <img src="/illustrations/icons/footer-facebook.svg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="/illustrations/icons/footer-instagram.svg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="/illustrations/icons/footer-linkedin.svg" alt="" />
              </a>
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
      <p>Privatlivspolitik </p>
    </footer>
  );
}
