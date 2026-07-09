import { STATUS_META } from '../../types/menu'
import styles from './StatusBadge.module.css'

/**
 * 메뉴 상태(확정/혼입 가능/없음)를 나타내는 뱃지.
 *
 * @param {Object} props
 * @param {'confirmed' | 'cross' | 'none'} props.status
 */
export function StatusBadge({ status }) {
  const meta = STATUS_META[status]
  if (!meta) return null

  return (
    <span className={styles.badge} data-tone={meta.tone}>
      {meta.label}
    </span>
  )
}
