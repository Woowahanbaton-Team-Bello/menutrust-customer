import { useMemo } from 'react'
import { STATUS_META, STATUS_ORDER } from '../types/menu'
import { MenuCard } from '../components/menu/MenuCard'
import styles from './ResultPage.module.css'

export const ALL_TAB = 'all'

/**
 * 결과 요약 + 메뉴 리스트 화면.
 *
 * @param {Object} props
 * @param {import('../data/demoStore').Menu[]} [props.menus] 분류된 메뉴 목록
 * @param {boolean} [props.loading] 로딩 여부
 * @param {Error | null} [props.error] 조회 실패
 * @param {string[]} [props.notice] 매장 공지
 * @param {string[]} [props.selectedAllergens] 손님이 선택한 알레르겐 라벨
 * @param {string} [props.activeTab] 선택된 탭 (App에서 관리해 화면 이동 후에도 유지)
 * @param {(tab: string) => void} [props.onTabChange] 탭 변경
 * @param {(menuId: string) => void} [props.onSelectMenu] 메뉴 상세로 이동
 * @param {() => void} [props.onEditConditions] 조건 변경으로 이동
 */
export function ResultPage({
  menus = [],
  loading = false,
  error = null,
  notice = [],
  selectedAllergens = [],
  activeTab = ALL_TAB,
  onTabChange,
  onSelectMenu,
  onEditConditions,
}) {

  // 상태별 개수 요약
  const counts = useMemo(() => {
    const acc = { confirmed: 0, cross: 0, none: 0 }
    for (const menu of menus) acc[menu.status] += 1
    return acc
  }, [menus])

  const visibleMenus = useMemo(
    () =>
      activeTab === ALL_TAB
        ? menus
        : menus.filter((menu) => menu.status === activeTab),
    [menus, activeTab],
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
        <h1 className={styles.title}>결과</h1>
        <button
          type="button"
          className={styles.selectedBadge}
          onClick={onEditConditions}
        >
          {selectedAllergens.length ? selectedAllergens.join(' · ') : '없음'}
        </button>
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
            onClick={() => onTabChange?.(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className={styles.list}>
        {loading && <p className={styles.state}>메뉴판을 불러오는 중이에요…</p>}
        {error && !loading && (
          <p className={styles.state} role="alert">
            {error.message}
          </p>
        )}
        {!loading && !error && visibleMenus.length === 0 && (
          <p className={styles.state}>표시할 메뉴가 없어요</p>
        )}
        {!loading &&
          !error &&
          visibleMenus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              onClick={() => onSelectMenu?.(menu.id)}
            />
          ))}
      </section>

      {notice.length > 0 && (
        <section className={styles.notice}>
          <ul className={styles.noticeList}>
            {notice.map((line, i) => (
              <li key={i} className={styles.noticeItem}>
                {line}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
