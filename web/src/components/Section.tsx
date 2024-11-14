import styles from './Section.module.css';

interface SectionProps {
  children: React.ReactNode;
  row?: boolean;
}

export default function Section({ children, row }: SectionProps) {
  return (
    <section
      className={
        row ? `${styles.sectionRow} ${styles.section}` : styles.section
      }
    >
      {children}
    </section>
  );
}
