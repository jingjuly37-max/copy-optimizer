import { useState } from 'react'
import BrandAssetForm from './components/BrandAssetForm'
import OperationGoalForm from './components/OperationGoalForm'
import CopyInput from './components/CopyInput'
import ResultView from './components/ResultView'
import { useOptimization } from './hooks/useOptimization'
import './styles.css'

function App() {
  const [step, setStep] = useState(1)
  const [brandAssets, setBrandAssets] = useState(null)
  const [operationGoal, setOperationGoal] = useState('')
  const [originalText, setOriginalText] = useState('')
  
  const { optimize, results, isLoading, error } = useOptimization()

  const handleBrandAssetsSubmit = (assets) => {
    setBrandAssets(assets)
    setStep(2)
  }

  const handleOperationGoalSubmit = (goal) => {
    setOperationGoal(goal)
    setStep(3)
  }

  const handleTextSubmit = async (text) => {
    setOriginalText(text)
    await optimize(text, brandAssets, operationGoal)
  }

  const handleReset = () => {
    setStep(1)
    setBrandAssets(null)
    setOperationGoal('')
    setOriginalText('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">COPY-OPTIMIZER</h1>
          <p className="text-gray-600 mt-2">小红书内容运营助推器</p>
        </header>

        {/* 步骤指示器 */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-1 ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 步骤内容 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">建立品牌资产</h2>
              <BrandAssetForm onSubmit={handleBrandAssetsSubmit} />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">设定运营目标</h2>
              <OperationGoalForm onSubmit={handleOperationGoalSubmit} />
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">内容优化</h2>
              <CopyInput onSubmit={handleTextSubmit} />
            </div>
          )}

          {/* 结果显示 */}
          {(results || isLoading) && (
            <ResultView 
              results={results} 
              isLoading={isLoading} 
              error={error}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App