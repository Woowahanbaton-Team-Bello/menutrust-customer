import { useState } from 'react'
import { AllergenSelectPage } from './pages/AllergenSelectPage'
import { ResultPage } from './pages/ResultPage'
import { useAllergenSelection } from './hooks/useAllergenSelection'
import { ALLERGENS } from './constants/allergens'

// 라우터 없이 두 화면을 전환한다. 화면이 늘어나면 react-router 도입 검토.
function App() {
  const [screen, setScreen] = useState('select')
  const selection = useAllergenSelection()

  const selectedLabels = ALLERGENS.filter((a) => selection.isSelected(a.id)).map(
    (a) => a.label,
  )

  if (screen === 'result') {
    return (
      <ResultPage
        selectedAllergens={selectedLabels.length ? selectedLabels : undefined}
        onBack={() => setScreen('select')}
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
