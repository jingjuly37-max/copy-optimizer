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
  const [operationGoal, setOperationGoal] = useState(null) // 改为对象而非字符串
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

  const handleBackToGoals = () => {
    setStep(2)
  }

  const handleTextSubmit = async (text, contentType, mediaDescription) => {
    setOriginalText(text)
    
    // 构建完整的优化数据
    const optimizationData = {
      brandAssets,
      operationGoal,
      originalText: text,
      contentType,
      mediaDescription
    }
    
    await optimize(optimizationData)
  }

  const handleReset = () => {
    setStep(1)
    setBrandAssets(null)
    setOperationGoal(null)
    setOriginalText('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4"> {/* 增加最大宽度以适应新布局 */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">COPY-OPTIMIZER</h1>
          <p className="text-gray-600 mt-2">小红书内容运营指挥中心</p> {/* 更新副标题 */}
        </header>

        {/* 步骤指示器 */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[
              { number: 1, label: '品牌资产' },
              { number: 2, label: '运营目标' },
              { number: 3, label: '内容优化' }
            ].map((stepInfo) => (
              <div key={stepInfo.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= stepInfo.number ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepInfo.number}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= stepInfo.number ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {stepInfo.label}
                </span>
                {stepInfo.number < 3 && (
                  <div className={`w-12 h-1 mx-2 ${step > stepInfo.number ? 'bg-blue-600' : 'bg-gray-300'}`} />
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
              <p className="text-gray-600 mb-6 text-sm">
                定义品牌的核心灵魂，为内容优化提供战略基础
              </p>
              <BrandAssetForm onSubmit={handleBrandAssetsSubmit} />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">设定运营目标</h2>
              <p className="text-gray-600 mb-6 text-sm">
                明确本次内容传播的核心KPI，指导AI优化方向
              </p>
              <OperationGoalForm 
                onSubmit={handleOperationGoalSubmit} 
                onBack={() => setStep(1)}
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">内容优化</h2>
              <p className="text-gray-600 mb-6 text-sm">
                输入待优化内容，生成完整的运营传播包
              </p>
              <CopyInput 
                onSubmit={handleTextSubmit}
                onBack={handleBackToGoals}
              />
            </div>
          )}

          {/* 结果显示 - 现在与步骤3同时显示 */}
          {(results || isLoading || error) && step === 3 && (
            <div className="mt-8">
              <ResultView 
                results={results} 
                isLoading={isLoading} 
                error={error}
                onReset={handleReset}
              />
            </div>
          )}
        </div>

        {/* 当前状态预览 - 辅助信息 */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-6 text-sm text-gray-500">
            {brandAssets && (
              <span>✅ 品牌资产已设置</span>
            )}
            {operationGoal && (
              <span>✅ 运营目标已设定</span>
            )}
            {originalText && (
              <span>✅ 内容已输入</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App