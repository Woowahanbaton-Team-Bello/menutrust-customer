import { MENU_STATUS } from '../types/menu'

/**
 * 공개 메뉴판 데이터를 손님이 선택한 알레르겐 기준으로 직접 분류한다.
 *
 * 각 메뉴는 선택한 알레르겐 중 해당 메뉴에 존재하는 항목만 보고
 * 가장 심각한 상태(확정 > 혼입 가능 > 없음)로 판정된다.
 * 선택한 알레르겐이 하나도 걸리지 않으면 '없음'이다.
 */

/** 상태 심각도 — 값이 클수록 심각 */
const SEVERITY = {
  [MENU_STATUS.CONFIRMED]: 2,
  [MENU_STATUS.CROSS]: 1,
  [MENU_STATUS.NONE]: 0,
}

/**
 * 선택 여부 판정 함수를 만든다.
 * 부모 알레르겐을 선택하면 자식도 포함으로 본다
 * (예: '조개류'를 선택하면 '굴'도 걸린다).
 *
 * @param {Iterable<string>} selectedCodes 선택한 알레르겐 코드
 * @param {Array<{ code: string, parentCode: string | null }>} apiAllergens 계층 정보
 * @returns {(code: string) => boolean}
 */
function buildIsSelected(selectedCodes, apiAllergens) {
  const selected = new Set(selectedCodes)
  const parentOf = new Map(apiAllergens.map((a) => [a.code, a.parentCode]))

  return (code) => {
    if (selected.has(code)) return true
    const parent = parentOf.get(code)
    return parent != null && selected.has(parent)
  }
}

/**
 * @param {import('../api/publicMenu').PublicMenuItem[]} menuItems
 * @param {Iterable<string>} selectedCodes
 * @param {Array<{ code: string, parentCode: string | null }>} [apiAllergens]
 * @returns {import('../data/demoStore').Menu[]}
 */
export function classifyMenus(menuItems = [], selectedCodes = [], apiAllergens = []) {
  const isSelected = buildIsSelected(selectedCodes, apiAllergens)
  return menuItems.map((item) => classifyMenu(item, isSelected))
}

/**
 * 메뉴 한 개를 분류해 화면 모델로 변환한다.
 *
 * @param {import('../api/publicMenu').PublicMenuItem} item
 * @param {(code: string) => boolean} isSelected
 * @returns {import('../data/demoStore').Menu}
 */
function classifyMenu(item, isSelected) {
  // 선택한 알레르겐 중 이 메뉴에 존재하는 항목만 추린다.
  const matched = (item.allergens ?? []).filter((a) => isSelected(a.code))

  // 가장 심각한 상태로 메뉴 전체 상태를 정한다.
  const status = matched.reduce(
    (worst, a) => (SEVERITY[a.status] > SEVERITY[worst] ? a.status : worst),
    MENU_STATUS.NONE,
  )

  // 최종 상태를 만든 근거 항목들(예: 확정을 만든 알레르겐들)
  const topEntries = matched.filter((a) => a.status === status)

  return {
    id: item.id,
    name: item.nameKo,
    price: item.priceKrw,
    desc: item.description,
    status,
    reason: buildReason(status, topEntries),
    detail: buildDetail(status, matched),
  }
}

/** 리스트 카드에 보여줄 한 줄 이유 */
function buildReason(status, topEntries) {
  if (status === MENU_STATUS.NONE) return '선택한 알레르겐 없음'
  return topEntries.map((a) => a.reason).join(' · ')
}

/** 상세 화면 모델 */
function buildDetail(status, matched) {
  return {
    ...summaryFor(status, matched),
    evidence: matched.map((a) => ({
      status: a.status,
      allergen: a.labelKo,
      note: a.sourceIngredientNames?.length
        ? a.sourceIngredientNames.join(', ')
        : a.reason,
    })),
    askStaff: buildAskStaff(status, matched),
  }
}

/** 상태별 요약 문구 */
function summaryFor(status, matched) {
  if (status === MENU_STATUS.CONFIRMED) {
    const labels = matched
      .filter((a) => a.status === MENU_STATUS.CONFIRMED)
      .map((a) => a.labelKo)
      .join(' · ')
    return {
      summaryTitle: '선택한 알레르겐이 확인됐어요',
      summaryBody: `${labels}이(가) 원재료로 포함되어 있어요`,
    }
  }

  if (status === MENU_STATUS.CROSS) {
    const labels = matched
      .filter((a) => a.status === MENU_STATUS.CROSS)
      .map((a) => a.labelKo)
      .join(' · ')
    return {
      summaryTitle: '혼입 가능성이 있어요',
      summaryBody: `${labels}이(가) 조리 과정에서 섞여 들어갈 수 있어요`,
    }
  }

  return {
    summaryTitle: '선택한 알레르겐과 직접 매칭되지 않았어요',
    summaryBody: '표시된 원재료에서 선택한 알레르겐을 찾지 못했어요',
  }
}

/** 직원에게 물어볼 질문 — 선택한 알레르겐이 매칭되지 않으면 표시하지 않는다 */
function buildAskStaff(status, matched) {
  if (status === MENU_STATUS.NONE) {
    return []
  }
  return matched.map((a) => `${a.labelKo} 없이 조리 가능한가요?`)
}
