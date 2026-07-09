import { STATUS_META } from '../types/menu'
import { StatusBadge } from '../components/menu/StatusBadge'
import styles from './MenuDetailPage.module.css'

/**
 * 메뉴 상세 화면 — 왜 이 상태인지 이유와 근거를 보여준다.
 *
 * @param {Object} props
 * @param {import('../data/demoStore').Menu} props.menu
 * @param {() => void} [props.onBack]
 */
export function MenuDetailPage({ menu, onBack }) {
  const meta = STATUS_META[menu.status]
  const { detail } = menu

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.back}
          onClick={onBack}
          aria-label="뒤로"
        >
          &lt;
        </button>
        <h1 className={styles.title}>메뉴 상세</h1>
        <span className={styles.headerBadge}>
          <StatusBadge status={menu.status} />
        </span>
      </header>

      <section className={styles.menu}>
        <h2 className={styles.menuName}>{menu.name}</h2>
        <p className={styles.menuMeta}>
          {menu.desc} · {menu.price.toLocaleString('ko-KR')}원
        </p>
      </section>

      <section className={styles.reason} data-tone={meta?.tone}>
        <p className={styles.reasonTitle}>{detail.summaryTitle}</p>
        <p className={styles.reasonBody}>{detail.summaryBody}</p>
      </section>

      {detail.evidence.length > 0 && (
        <section className={styles.evidence}>
          <h3 className={styles.evidenceTitle}>알레르겐 근거</h3>
          <ul className={styles.evidenceList}>
            {detail.evidence.map((item, i) => (
              <li key={i} className={styles.evidenceRow}>
                <StatusBadge status={item.status} />
                <span className={styles.evidenceText}>
                  {item.allergen} · {item.note}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {detail.askStaff.length > 0 && (
        <section className={styles.ask}>
          <h3 className={styles.askTitle}>직원에게 이렇게 물어보세요</h3>
          <ul className={styles.askList}>
            {detail.askStaff.map((q, i) => (
              <li key={i} className={styles.askItem}>
                {q}
              </li>
            ))}
          </ul>
        </section>
      )}

      {detail.alternative && (
        <section className={styles.alt}>
          <h3 className={styles.altTitle}>대신 볼 만한 메뉴</h3>
          <p className={styles.altBody}>{detail.alternative}</p>
        </section>
      )}
    </main>
  )
}
