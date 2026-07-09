/**
 * 알레르겐 22종 — 도메인 상수 (단일 소스).
 * 한국 식약처 알레르기 유발물질 표시 대상 기준.
 *
 * @typedef {Object} Allergen
 * @property {string} id    안정적인 식별자 (선택 상태·데이터 매칭용)
 * @property {string} label 화면에 표시할 이름
 */

/** @type {ReadonlyArray<Allergen>} */
export const ALLERGENS = [
  { id: 'egg', label: '알류(가금류)' },
  { id: 'milk', label: '우유' },
  { id: 'buckwheat', label: '메밀' },
  { id: 'peanut', label: '땅콩' },
  { id: 'soybean', label: '대두' },
  { id: 'wheat', label: '밀' },
  { id: 'mackerel', label: '고등어' },
  { id: 'crab', label: '게' },
  { id: 'shrimp', label: '새우' },
  { id: 'pork', label: '돼지고기' },
  { id: 'peach', label: '복숭아' },
  { id: 'tomato', label: '토마토' },
  { id: 'sulfite', label: '아황산류' },
  { id: 'walnut', label: '호두' },
  { id: 'chicken', label: '닭고기' },
  { id: 'beef', label: '쇠고기' },
  { id: 'squid', label: '오징어' },
  { id: 'shellfish', label: '조개류' },
  { id: 'oyster', label: '굴' },
  { id: 'abalone', label: '전복' },
  { id: 'mussel', label: '홍합' },
  { id: 'pinenut', label: '잣' },
]
