import type { TelemetryItem } from '@/lib/sanity/types';
import styles from './Telemetry.module.css';

const DEFAULTS: TelemetryItem[] = [
  { em: '10TFS', text: 'HAHN AB' },
  { text: '49°56′N · 7°16′E' },
  { em: 'SABRES', text: '· NATO TAC EVAL · 1989' },
  { text: 'OP DESERT STORM · 1991' },
  { text: 'VIPER · F-16C BLOCK 30' },
  { em: '282 PAGES', text: '· KOEHLER BOOKS' },
  { text: 'PUB DATE 05.05.26' },
];

type Props = {
  items?: TelemetryItem[];
};

export default function Telemetry({ items }: Props = {}) {
  const list = items && items.length > 0 ? items : DEFAULTS;

  const renderItems = () =>
    list.map((it, i) => (
      <span key={i}>
        {it.em ? <span className={styles.em}>{it.em}</span> : null}
        {it.em ? <span className={styles.dot} aria-hidden="true" /> : null}
        {it.text}
      </span>
    ));

  return (
    <div className={styles.telemetry} aria-hidden="true">
      <div className={styles.marquee}>
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  );
}
