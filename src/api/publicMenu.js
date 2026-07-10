/**
 * 공개 메뉴판 조회 API 클라이언트.
 *
 * API는 Supabase Edge Function 위에 올라가 있다.
 * base(VITE_API_BASE_URL)는 `.../functions/v1/api` 형태로 이미 `/api`를 포함하므로
 * 라우트 경로는 `/v1/public/menus/{slug}` 를 붙인다.
 * Supabase 함수 호출에는 anon key 를 apikey / Authorization 헤더로 전달한다.
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

/** 데모 매장 slug */
export const DEFAULT_SLUG = 'thai-87-8'

/**
 * @typedef {Object} PublicMenuAllergen
 * @property {string} code
 * @property {string} labelKo
 * @property {'confirmed' | 'cross' | 'none'} status
 * @property {string} reason
 * @property {string[]} sourceIngredientNames
 *
 * @typedef {Object} PublicMenuItem
 * @property {string} id
 * @property {string} nameKo
 * @property {number} priceKrw
 * @property {string} category
 * @property {string} description
 * @property {number} sortOrder
 * @property {string[]} ingredients
 * @property {PublicMenuAllergen[]} allergens
 *
 * @typedef {Object} PublicMenuData
 * @property {{ id: string, slug: string, name: string, businessType: string }} store
 * @property {Array<{ code: string, labelKo: string, sortOrder: number, parentCode: string | null }>} allergens
 * @property {PublicMenuItem[]} menuItems
 * @property {string[]} notice
 */

/**
 * 공개 메뉴판을 조회한다.
 *
 * @param {string} slug 매장 slug
 * @returns {Promise<PublicMenuData>}
 */
export async function fetchPublicMenu(slug) {
  const headers = {}
  if (ANON_KEY) {
    headers.apikey = ANON_KEY
    headers.Authorization = `Bearer ${ANON_KEY}`
  }

  const res = await fetch(
    `${API_BASE}/v1/public/menus/${encodeURIComponent(slug)}`,
    { headers },
  )
  if (!res.ok) {
    throw new Error(`메뉴판을 불러오지 못했어요 (HTTP ${res.status})`)
  }

  const json = await res.json()
  if (!json.ok || !json.data) {
    throw new Error('메뉴판 응답이 올바르지 않아요')
  }

  return normalizeMenuData(json.data)
}

/**
 * API 상태값을 프론트 도메인 상태값으로 정규화한다.
 * 백엔드는 알레르겐 상태를 confirmed / possible 로 내려주지만,
 * 프론트 도메인(types/menu.js)은 confirmed / cross / none 을 쓴다.
 */
const STATUS_MAP = { confirmed: 'confirmed', possible: 'cross' }

function normalizeMenuData(data) {
  return {
    ...data,
    menuItems: (data.menuItems ?? []).map((item) => ({
      ...item,
      allergens: (item.allergens ?? []).map((a) => ({
        ...a,
        status: STATUS_MAP[a.status] ?? a.status,
      })),
    })),
  }
}
