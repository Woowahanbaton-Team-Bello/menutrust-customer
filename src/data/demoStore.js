import { MENU_STATUS } from '../types/menu'

/**
 * 데모 매장(타이 음식점) 샘플 데이터.
 * API 미연결 상태의 목업이며, 추후 매장 데이터로 대체한다.
 *
 * 아래 상태·이유는 손님이 '새우', '땅콩'을 선택한 경우를 가정한 결과다.
 */
export const DEMO_STORE = {
  name: '우아타이',
  // 손님이 이전 화면에서 선택한 알레르겐 (데모 값)
  selectedAllergens: ['새우', '땅콩'],
}

/**
 * @typedef {Object} Evidence
 * @property {'confirmed' | 'cross' | 'none'} status
 * @property {string} allergen 알레르겐 이름
 * @property {string} note     근거 설명 (예: '볶음 토핑')
 *
 * @typedef {Object} MenuDetail
 * @property {string} summaryTitle   이유 요약 제목
 * @property {string} summaryBody    이유 상세 설명
 * @property {Evidence[]} evidence    알레르겐 근거 목록
 * @property {string[]} askStaff      직원에게 물어볼 질문
 * @property {string} [alternative]   대신 볼 만한 메뉴 안내 (제외 메뉴에만)
 *
 * @typedef {Object} Menu
 * @property {string} id
 * @property {string} name
 * @property {'confirmed' | 'cross' | 'none'} status
 * @property {string} reason 리스트에 보여줄 한 줄 이유
 * @property {string} desc   메뉴 설명
 * @property {number} price  가격 (원)
 * @property {MenuDetail} detail
 */

/** @type {ReadonlyArray<Menu>} */
export const DEMO_MENUS = [
  {
    id: 'ss',
    name: '쏨땀',
    status: MENU_STATUS.NONE,
    reason: '선택한 알레르겐 없음',
    desc: '파파야 샐러드',
    price: 9000,
    detail: {
      summaryTitle: '선택한 알레르겐과 직접 매칭되지 않았어요',
      summaryBody: '표시된 원재료에서 선택한 알레르겐을 찾지 못했어요',
      evidence: [],
      askStaff: ['땅콩이나 건새우를 올리기도 하나요?'],
    },
  },
  {
    id: 'kp',
    name: '카오팟',
    status: MENU_STATUS.NONE,
    reason: '선택한 알레르겐 없음',
    desc: '타이 볶음밥',
    price: 11000,
    detail: {
      summaryTitle: '선택한 알레르겐과 직접 매칭되지 않았어요',
      summaryBody: '표시된 원재료에서 선택한 알레르겐을 찾지 못했어요',
      evidence: [],
      askStaff: ['조리 중 땅콩·새우가 닿을 수 있나요?'],
    },
  },
  {
    id: 'mg',
    name: '팟퍽붕',
    status: MENU_STATUS.NONE,
    reason: '선택한 알레르겐 없음',
    desc: '모닝글로리 볶음',
    price: 10000,
    detail: {
      summaryTitle: '선택한 알레르겐과 직접 매칭되지 않았어요',
      summaryBody: '표시된 원재료에서 선택한 알레르겐을 찾지 못했어요',
      evidence: [],
      askStaff: ['굴소스에 새우가 섞이지는 않나요?'],
    },
  },
  {
    id: 'gc',
    name: '그린 커리',
    status: MENU_STATUS.CROSS,
    reason: '소스 확인 필요',
    desc: '코코넛 그린 커리',
    price: 15000,
    detail: {
      summaryTitle: '혼입 가능성이 있어요',
      summaryBody: '커리 페이스트에 새우가 들어갈 수 있어 확인이 필요합니다',
      evidence: [
        { status: MENU_STATUS.CROSS, allergen: '새우', note: '커리 페이스트' },
      ],
      askStaff: ['새우 없는 페이스트로 조리 가능한가요?'],
      alternative: '쏨땀은 선택한 알레르겐과 직접 매칭되지 않았어요',
    },
  },
  {
    id: 'ty',
    name: '똠얌누들',
    status: MENU_STATUS.CROSS,
    reason: '새우 육수 가능성',
    desc: '매콤 새우 국수',
    price: 13000,
    detail: {
      summaryTitle: '혼입 가능성이 있어요',
      summaryBody: '새우 육수를 사용할 가능성이 있습니다',
      evidence: [
        { status: MENU_STATUS.CROSS, allergen: '새우', note: '육수' },
      ],
      askStaff: ['새우 육수를 쓰나요?'],
      alternative: '카오팟은 선택한 알레르겐과 직접 매칭되지 않았어요',
    },
  },
  {
    id: 'ps',
    name: '팟씨유',
    status: MENU_STATUS.CROSS,
    reason: '같은 팬으로 조리',
    desc: '넓은 면 간장 볶음',
    price: 13000,
    detail: {
      summaryTitle: '혼입 가능성이 있어요',
      summaryBody: '같은 팬을 사용해 땅콩·새우가 닿을 수 있습니다',
      evidence: [
        { status: MENU_STATUS.CROSS, allergen: '땅콩', note: '같은 팬' },
      ],
      askStaff: ['팬을 따로 써서 조리 가능한가요?'],
      alternative: '카오팟은 선택한 알레르겐과 직접 매칭되지 않았어요',
    },
  },
  {
    id: 'pt',
    name: '팟타이',
    status: MENU_STATUS.CONFIRMED,
    reason: '땅콩 포함',
    desc: '쌀국수 볶음',
    price: 14000,
    detail: {
      summaryTitle: '선택한 알레르겐이 확인됐어요',
      summaryBody: '땅콩이 포함되어 있고 새우 소스 가능성이 있습니다',
      evidence: [
        { status: MENU_STATUS.CONFIRMED, allergen: '땅콩', note: '볶음 토핑' },
        { status: MENU_STATUS.CONFIRMED, allergen: '새우', note: '소스' },
      ],
      askStaff: ['땅콩을 빼고 조리 가능한가요?', '새우 소스를 쓰나요?'],
      alternative: '쏨땀은 선택한 알레르겐과 직접 매칭되지 않았어요',
    },
  },
  {
    id: 'kn',
    name: '꿍 팟퐁 커리',
    status: MENU_STATUS.CONFIRMED,
    reason: '새우 포함',
    desc: '새우 커리',
    price: 18000,
    detail: {
      summaryTitle: '선택한 알레르겐이 확인됐어요',
      summaryBody: '새우가 주재료로 포함되어 있습니다',
      evidence: [
        { status: MENU_STATUS.CONFIRMED, allergen: '새우', note: '주재료' },
      ],
      askStaff: ['새우 없이 조리 가능한가요?'],
      alternative: '팟퍽붕은 선택한 알레르겐과 직접 매칭되지 않았어요',
    },
  },
]

/** id로 메뉴 조회 */
export function getMenuById(id) {
  return DEMO_MENUS.find((menu) => menu.id === id)
}
