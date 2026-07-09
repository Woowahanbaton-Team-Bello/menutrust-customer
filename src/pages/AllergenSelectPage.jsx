import { ALLERGENS } from '../constants/allergens'
import { AllergenChip } from '../components/allergen/AllergenChip'
import styles from './AllergenSelectPage.module.css'

// 데모 매장 정보 (타이 음식점). 추후 매장 데이터로 대체.
const STORE = {
  name: '우아타이',
  tagline: '태국 음식 · QR 알레르기 메뉴',
}

/**
 * @param {Object} props
 * @param {(id: string) => boolean} props.isSelected
 * @param {(id: string) => void} props.toggle
 * @param {number} props.count 선택 개수
 * @param {() => void} [props.onSubmit] 메뉴 보기로 이동
 */
export function AllergenSelectPage({ isSelected, toggle, count, onSubmit }) {

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.mark}>M</span>
          <span className={styles.wordmark}>MenuTrust</span>
        </div>
        <span className={styles.badge}>사장님 확인</span>
      </header>

      <section className={styles.store}>
        <h1 className={styles.storeName}>{STORE.name}</h1>
        <p className={styles.storeTagline}>{STORE.tagline}</p>
      </section>

      <section className={styles.notice}>
        <span className={styles.noticeCheck} aria-hidden="true">
          ✓
        </span>
        <div>
          <p className={styles.noticeTitle}>매장에서 확인한 정보입니다</p>
          <p className={styles.noticeDesc}>
            주문 전 직원에게 한 번 더 확인해 주세요
          </p>
        </div>
      </section>

      <section className={styles.selection}>
        <h2 className={styles.selectionTitle}>알레르기를 선택해 주세요</h2>
        <p className={styles.selectionDesc}>
          선택한 항목으로 메뉴를 확정·혼입 가능·없음으로 나눠 보여드려요
        </p>

        <div className={styles.chips}>
          {ALLERGENS.map((allergen) => (
            <AllergenChip
              key={allergen.id}
              label={allergen.label}
              selected={isSelected(allergen.id)}
              onToggle={() => toggle(allergen.id)}
            />
          ))}
        </div>
      </section>

      <button type="button" className={styles.cta} onClick={onSubmit}>
        선택한 알레르기로 메뉴 보기
        {count > 0 && <span className={styles.ctaCount}>{count}</span>}
      </button>

      <p className={styles.footnote}>
        중증 알레르기가 있다면 주문 전 매장 직원에게 직접 문의해 주세요
      </p>
    </main>
  )
}
