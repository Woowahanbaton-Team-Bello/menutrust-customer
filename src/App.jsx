import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { AllergenSelectPage } from './pages/AllergenSelectPage'
import { ResultPage } from './pages/ResultPage'
import { MenuDetailPage } from './pages/MenuDetailPage'
import { EditAllergenPage } from './pages/EditAllergenPage'
import { useAllergenSelection } from './hooks/useAllergenSelection'
import { usePublicMenu } from './hooks/usePublicMenu'
import { DEFAULT_SLUG } from './api/publicMenu'
import { classifyMenus } from './domain/classifyMenus'
import { ALLERGENS } from './constants/allergens'

const INITIAL_NAV = { screen: 'select', menuId: null }

// 라우터 없이 화면을 전환하되, 브라우저 히스토리와 동기화한다.
// 전진은 pushState, 뒤로가기는 history.back()+popstate로 처리해
// 폰/브라우저 뒤로가기 시 새로고침 없이 이전 화면으로 돌아가게 한다.
function App() {
  const [nav, setNav] = useState(INITIAL_NAV)
  const { screen, menuId } = nav
  // 결과 화면 탭 상태를 App에서 보관해 상세→뒤로가기 후에도 유지한다.
  const [resultTab, setResultTab] = useState('all')
  const selection = useAllergenSelection()

  // 첫 진입 화면을 히스토리에 심고, 뒤로가기(popstate)를 화면 상태로 반영한다.
  useEffect(() => {
    window.history.replaceState(INITIAL_NAV, '')
    const onPop = (e) => setNav(e.state ?? INITIAL_NAV)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // 화면 전진: 히스토리에 항목을 쌓는다.
  const go = (next) => {
    window.history.pushState(next, '')
    setNav(next)
  }
  // 현재 항목을 교체한다(스택에 쌓지 않음). 첫 화면을 스택에서 제거할 때 사용.
  const replace = (next) => {
    window.history.replaceState(next, '')
    setNav(next)
  }
  // 뒤로가기: 인앱 버튼도 히스토리를 통해 돌아가 상태를 일관되게 유지한다.
  const back = () => window.history.back()

  // 공개 메뉴판 데이터를 조회한다(API 미배포 시 error 상태로 표시).
  const { data, loading, error } = usePublicMenu(DEFAULT_SLUG)

  // 선택한 알레르겐 기준으로 메뉴를 직접 분류한다.
  // selection.selected(Set)는 토글 시에만 새 참조가 되므로 의존성으로 안전하다.
  const menus = useMemo(
    () =>
      data
        ? classifyMenus(data.menuItems, selection.selected, data.allergens)
        : [],
    [data, selection.selected],
  )

  // 화면을 이동하면 스크롤을 최상단으로 되돌린다.
  // 페인트 전에 실행되도록 useLayoutEffect 사용 (이전 위치가 잠깐 보이는 것 방지).
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [screen, menuId])

  const selectedLabels = ALLERGENS.filter((a) => selection.isSelected(a.id)).map(
    (a) => a.label,
  )
  const storeName = data?.store?.name ?? '우아타이'

  const activeMenu =
    screen === 'detail' ? menus.find((m) => m.id === menuId) : null
  if (activeMenu) {
    return <MenuDetailPage menu={activeMenu} onBack={back} />
  }

  if (screen === 'edit') {
    return (
      <EditAllergenPage
        storeName={storeName}
        isSelected={selection.isSelected}
        toggle={selection.toggle}
        onBack={back}
        onApply={back}
      />
    )
  }

  if (screen === 'result') {
    return (
      <ResultPage
        menus={menus}
        loading={loading}
        error={error}
        notice={data?.notice}
        selectedAllergens={selectedLabels}
        activeTab={resultTab}
        onTabChange={setResultTab}
        onSelectMenu={(id) => go({ screen: 'detail', menuId: id })}
        onEditConditions={() => go({ screen: 'edit', menuId: null })}
      />
    )
  }

  return (
    <AllergenSelectPage
      isSelected={selection.isSelected}
      toggle={selection.toggle}
      count={selection.count}
      onSubmit={() => replace({ screen: 'result', menuId: null })}
    />
  )
}

export default App
