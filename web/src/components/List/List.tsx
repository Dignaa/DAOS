import styles from './List.module.css';

interface Props {
  items?: string | string[];
}

export default function List({ items }: Props) {
  const itemsArray = Array.isArray(items) ? items : [items];

  return (
    <ul className={styles.list}>
      {itemsArray?.map((item, index) => (
        <li className={styles.item} key={index}>
          {item}
        </li>
      ))}
    </ul>
  );
}
