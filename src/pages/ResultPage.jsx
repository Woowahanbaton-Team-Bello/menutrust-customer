import { useMemo, useState } from 'react'
import { DEMO_MENUS, DEMO_STORE } from '../data/demoStore'
import { STATUS_META, STATUS_ORDER } from '../types/menu'
import { MenuCard } from '../components/menu/MenuCard'
import styles from './ResultPage.module.css'

const ALL_TAB = 'all'

/**
 * 결과 요약 + 메뉴 리스트 화면.
 *
 * @param {Object} props
 * @param {string[]} [props.selectedAllergens] 손님이 선택한 알레르겐 라벨
 * @param {() => void} [props.onBack] 뒤로 가기
 * @param {(menuId: string) => void} [props.onSelectMenu] 메뉴 상세로 이동
 */
export function ResultPage({
  selectedAllergens = DEMO_STORE.selectedAllergens,
  onBack,
  onSelectMenu,
}) {
  const [activeTab, setActiveTab] = useState(ALL_TAB)

  // 상태별 개수 요약
  const counts = useMemo(() => {
    const acc = { confirmed: 0, cross: 0, none: 0 }
    for (const menu of DEMO_MENUS) acc[menu.status] += 1
    return acc
  }, [])

  const visibleMenus = useMemo(
    () =>
      activeTab === ALL_TAB
        ? DEMO_MENUS
        : DEMO_MENUS.filter((menu) => menu.status === activeTab),
    [activeTab],
  )

  const tabs = [
    { key: ALL_TAB, label: '전체' },
    ...STATUS_ORDER.map((status) => ({
      key: status,
      label: STATUS_META[status].label,
    })),
  ]

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
        <h1 className={styles.title}>결과</h1>
        <span className={styles.selectedBadge}>
          {selectedAllergens.join(' · ')}
        </span>
      </header>

      <section className={styles.intro}>
        <h2 className={styles.introTitle}>메뉴를 세 가지로 분류했어요</h2>
        <p className={styles.introDesc}>
          확정·혼입 가능·없음으로 나눠 확인해요.
        </p>
      </section>

      <section className={styles.counts}>
        {STATUS_ORDER.map((status) => (
          <div key={status} className={styles.countCard} data-tone={STATUS_META[status].tone}>
            <span className={styles.countNumber}>{counts[status]}</span>
            <span className={styles.countLabel}>{STATUS_META[status].label}</span>
          </div>
        ))}
      </section>

      <div className={styles.tabs} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={styles.tab}
            data-active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className={styles.list}>
        {visibleMenus.map((menu) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            onClick={() => onSelectMenu?.(menu.id)}
          />
        ))}
      </section>
    </main>
  )
}
