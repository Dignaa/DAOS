import styles from './Navbar.module.css';
import PrimaryButton from '../atoms/PrimaryButton';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img></img>
      <ul>
        <li>Home</li>
        <li>Notice</li>
        <li>Posts</li>
        <li>
          <PrimaryButton buttonText="Log ind" onClick={function (): void {}} />
        </li>
      </ul>
    </nav>
  );
}
