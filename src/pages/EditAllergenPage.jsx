import { ALLERGENS } from '../constants/allergens'
import { AllergenChip } from '../components/allergen/AllergenChip'
import styles from './EditAllergenPage.module.css'

/**
 * 조건 변경 화면 — 결과 화면에서 알레르겐 뱃지를 눌러 진입한다.
 * 선택한 항목은 '현재 선택' 카드에, 나머지는 아래 그리드에 나뉘어 보인다.
 * 선택 상태는 App에서 관리하므로 변경은 즉시 결과에 반영된다.
 *
 * @param {Object} props
 * @param {string} props.storeName 매장 이름 (헤더 뱃지)
 * @param {(id: string) => boolean} props.isSelected
 * @param {(id: string) => void} props.toggle
 * @param {() => void} [props.onBack]
 * @param {() => void} [props.onApply] 이 조건으로 다시 보기
 */
export function EditAllergenPage({
  storeName,
  isSelected,
  toggle,
  onBack,
  onApply,
}) {
  const selected = ALLERGENS.filter((a) => isSelected(a.id))
  const unselected = ALLERGENS.filter((a) => !isSelected(a.id))

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
        <h1 className={styles.title}>조건 변경</h1>
        <span className={styles.storeBadge}>{storeName}</span>
      </header>

      <h2 className={styles.heading}>알레르기 조건을 바꿔볼까요?</h2>

      <section className={styles.current}>
        <div className={styles.currentHead}>
          <h3 className={styles.currentTitle}>현재 선택</h3>
          <p className={styles.currentDesc}>선택을 바꾸면 결과가 다시 계산됩니다.</p>
        </div>
        {selected.length > 0 ? (
          <div className={styles.chips}>
            {selected.map((a) => (
              <AllergenChip
                key={a.id}
                label={a.label}
                selected
                onToggle={() => toggle(a.id)}
              />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>아직 선택한 알레르겐이 없어요</p>
        )}
      </section>

      <div className={styles.chips}>
        {unselected.map((a) => (
          <AllergenChip
            key={a.id}
            label={a.label}
            selected={false}
            onToggle={() => toggle(a.id)}
          />
        ))}
      </div>

      <button type="button" className={styles.cta} onClick={onApply}>
        이 조건으로 다시 보기
      </button>
    </main>
  )
}
