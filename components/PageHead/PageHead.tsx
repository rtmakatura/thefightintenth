import styles from './PageHead.module.css';

type Props = {
  eyebrow: string;
  title: string;
};

export default function PageHead({ eyebrow, title }: Props) {
  return (
    <header className={styles.head}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.bar} aria-hidden="true" />
    </header>
  );
}
