import { STATUS_META } from '../../types/menu'
import { StatusBadge } from './StatusBadge'
import styles from './MenuCard.module.css'

/**
 * 메뉴 한 개 카드. 이름 + 상태 이유 + 상태 뱃지.
 * 이유 텍스트는 상태 색과 맞춘다. 클릭하면 상세로 이동한다.
 *
 * @param {Object} props
 * @param {import('../../data/demoStore').Menu} props.menu
 * @param {() => void} [props.onClick]
 */
export function MenuCard({ menu, onClick }) {
  const meta = STATUS_META[menu.status]

  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <span className={styles.info}>
        <span className={styles.name}>{menu.name}</span>
        <span className={styles.reason} data-tone={meta?.tone}>
          {menu.reason}
        </span>
      </span>
      <StatusBadge status={menu.status} />
    </button>
  )
}
