// Input.tsx
import styles from './Input.module.css';

interface InputProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'radio';
  name: string;
  required?: boolean;
  value?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  type,
  name,
  value,
  required = false,
  checked,
  onChange,
}: InputProps) {
  return (
    <label className={styles.label}>
      {label}
      <input
        className={type === 'radio' ? styles.radio : styles.input}
        type={type}
        name={name}
        value={value}
        required={required}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
}
