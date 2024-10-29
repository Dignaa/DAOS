import styles from './PrimaryButton.module.css';

interface PrimaryButtonProps {
  buttonText: string;
  onClick: () => void;
}

export default function PrimaryButton({
  buttonText,
  onClick,
}: PrimaryButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {buttonText}
    </button>
  );
}
