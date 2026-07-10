import { useEffect, useState } from 'react'
import { fetchPublicMenu } from '../api/publicMenu'

/**
 * 공개 메뉴판 데이터를 조회한다.
 *
 * @param {string} slug 매장 slug
 * @returns {{ data: import('../api/publicMenu').PublicMenuData | null, loading: boolean, error: Error | null }}
 */
export function usePublicMenu(slug) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    let alive = true
    setState({ data: null, loading: true, error: null })

    fetchPublicMenu(slug)
      .then((data) => {
        if (alive) setState({ data, loading: false, error: null })
      })
      .catch((error) => {
        if (alive) setState({ data: null, loading: false, error })
      })

    return () => {
      alive = false
    }
  }, [slug])

  return state
}
