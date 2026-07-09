import { useCallback, useState } from 'react'

/**
 * 손님이 선택한 알레르겐 상태를 관리한다.
 * 여러 개를 선택할 수 있으므로 Set으로 다룬다.
 *
 * @param {string[]} [initial] 초기 선택 id 목록
 */
export function useAllergenSelection(initial = []) {
  const [selected, setSelected] = useState(() => new Set(initial))

  const toggle = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const clear = useCallback(() => setSelected(new Set()), [])

  const isSelected = useCallback((id) => selected.has(id), [selected])

  return {
    selected,
    selectedIds: [...selected],
    count: selected.size,
    isSelected,
    toggle,
    clear,
  }
}
