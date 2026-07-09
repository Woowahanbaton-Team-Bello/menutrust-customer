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
 * @typedef {Object} Menu
 * @property {string} id
 * @property {string} name
 * @property {'confirmed' | 'cross' | 'none'} status
 * @property {string} reason 왜 이 상태인지에 대한 이유
 */

/** @type {ReadonlyArray<Menu>} */
export const DEMO_MENUS = [
  { id: 'ss', name: '쏨땀', status: MENU_STATUS.NONE, reason: '선택한 알레르겐 없음' },
  { id: 'kp', name: '카오팟', status: MENU_STATUS.NONE, reason: '선택한 알레르겐 없음' },
  {
    id: 'mg',
    name: '팟퍽붕',
    status: MENU_STATUS.NONE,
    reason: '선택한 알레르겐 없음',
  },
  {
    id: 'gc',
    name: '그린 커리',
    status: MENU_STATUS.CROSS,
    reason: '소스 확인 필요',
  },
  {
    id: 'ty',
    name: '똠얌누들',
    status: MENU_STATUS.CROSS,
    reason: '새우 육수 가능성',
  },
  {
    id: 'ps',
    name: '팟씨유',
    status: MENU_STATUS.CROSS,
    reason: '같은 팬으로 조리',
  },
  { id: 'pt', name: '팟타이', status: MENU_STATUS.CONFIRMED, reason: '땅콩 포함' },
  {
    id: 'kn',
    name: '꿍 팟퐁 커리',
    status: MENU_STATUS.CONFIRMED,
    reason: '새우 포함',
  },
]
