import { useEffect, useState } from 'react'
import { AllergenSelectPage } from './pages/AllergenSelectPage'
import { ResultPage } from './pages/ResultPage'
import { MenuDetailPage } from './pages/MenuDetailPage'
import { EditAllergenPage } from './pages/EditAllergenPage'
import { useAllergenSelection } from './hooks/useAllergenSelection'
import { ALLERGENS } from './constants/allergens'
import { getMenuById, DEMO_STORE } from './data/demoStore'

// 라우터 없이 화면을 전환한다. 화면이 늘어나면 react-router 도입 검토.
function App() {
  const [screen, setScreen] = useState('select')
  const [activeMenuId, setActiveMenuId] = useState(null)
  const selection = useAllergenSelection()

  // 화면을 이동하면 스크롤을 최상단으로 되돌린다.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [screen, activeMenuId])

  const selectedLabels = ALLERGENS.filter((a) => selection.isSelected(a.id)).map(
    (a) => a.label,
  )

  const activeMenu = screen === 'detail' ? getMenuById(activeMenuId) : null
  if (activeMenu) {
    return <MenuDetailPage menu={activeMenu} onBack={() => setScreen('result')} />
  }

  if (screen === 'edit') {
    return (
      <EditAllergenPage
        storeName={DEMO_STORE.name}
        isSelected={selection.isSelected}
        toggle={selection.toggle}
        onBack={() => setScreen('result')}
        onApply={() => setScreen('result')}
      />
    )
  }

  if (screen === 'result') {
    return (
      <ResultPage
        selectedAllergens={selectedLabels}
        onBack={() => setScreen('select')}
        onSelectMenu={(id) => {
          setActiveMenuId(id)
          setScreen('detail')
        }}
        onEditConditions={() => setScreen('edit')}
      />
    )
  }

  return (
    <AllergenSelectPage
      isSelected={selection.isSelected}
      toggle={selection.toggle}
      count={selection.count}
      onSubmit={() => setScreen('result')}
    />
  )
}

export default App
