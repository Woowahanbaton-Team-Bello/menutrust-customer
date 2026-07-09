import styles from './AllergenChip.module.css'

/**
 * 알레르겐 선택 칩. 선택 시 어둡게 반전된다.
 *
 * @param {Object} props
 * @param {string} props.label    표시할 알레르겐 이름
 * @param {boolean} props.selected 선택 여부
 * @param {() => void} props.onToggle 토글 핸들러
 */
export function AllergenChip({ label, selected, onToggle }) {
  return (
    <button
      type="button"
      className={styles.chip}
      data-selected={selected}
      aria-pressed={selected}
      onClick={onToggle}
    >
      {label}
    </button>
  )
}
