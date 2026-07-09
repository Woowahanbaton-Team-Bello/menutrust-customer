import { STATUS_META } from '../../types/menu'
import { StatusBadge } from './StatusBadge'
import styles from './MenuCard.module.css'

/**
 * 메뉴 한 개 카드. 이름 + 상태 이유 + 상태 뱃지.
 * 이유 텍스트는 상태 색과 맞춘다.
 *
 * @param {Object} props
 * @param {import('../../data/demoStore').Menu} props.menu
 */
export function MenuCard({ menu }) {
  const meta = STATUS_META[menu.status]

  return (
    <article className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.name}>{menu.name}</h3>
        <p className={styles.reason} data-tone={meta?.tone}>
          {menu.reason}
        </p>
      </div>
      <StatusBadge status={menu.status} />
    </article>
  )
}
