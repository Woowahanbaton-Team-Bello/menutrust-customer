/**
 * 메뉴의 알레르기 분류 상태 (3단계).
 * - confirmed: 확정   — 선택한 알레르겐이 확실히 포함됨
 * - cross:     혼입 가능 — 원재료는 아니나 조리 중 섞일 수 있음
 * - none:      없음    — 선택한 알레르겐이 포함되지 않음
 */
export const MENU_STATUS = {
  CONFIRMED: 'confirmed',
  CROSS: 'cross',
  NONE: 'none',
}

/**
 * 상태별 표시 메타. `tone`은 색 토큰(--status-<tone>-*) 및
 * data-tone 속성과 연결된다.
 */
export const STATUS_META = {
  [MENU_STATUS.CONFIRMED]: { label: '확정', tone: 'confirmed' },
  [MENU_STATUS.CROSS]: { label: '혼입 가능', tone: 'cross' },
  [MENU_STATUS.NONE]: { label: '없음', tone: 'none' },
}

/** 요약·탭에서 사용하는 표시 순서 */
export const STATUS_ORDER = [
  MENU_STATUS.CONFIRMED,
  MENU_STATUS.CROSS,
  MENU_STATUS.NONE,
]
