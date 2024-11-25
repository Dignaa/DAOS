// Input.tsx
import styles from './Input.module.css';

interface InputProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'radio' | 'number';
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
    <label className={type === 'radio' ? styles.radioLabel : styles.label}>
      {label} {required && type !== 'radio' && '*'}
      <input
        className={type === 'radio' ? styles.radioInput : styles.input}
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
