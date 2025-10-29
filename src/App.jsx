import { useState } from 'react'
import CopyInput from './components/CopyInput'
import ResultView from './components/ResultView'
import AIOptimizationEngine from './services/aiOptimizationEngine.js';

function App() {
  const [originalText, setOriginalText] = useState('')
  const [optimizedText, setOptimizedText] = useState('')
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [showResult, setShowResult] = useState(false)

  // 不再需要传入API密钥
  const optimizationEngine = new AIOptimizationEngine()

  const handleOptimize = async (settings, brandContext) => {
    if (!originalText.trim()) return
    
    setIsOptimizing(true)
    try {
      const fullContext = {
        ...brandContext,
        platform: settings.platform
      }
      
      const result = await optimizationEngine.optimizeWithContext(originalText, fullContext)
      setOptimizedText(result)
      setShowResult(true)
    } catch (error) {
      console.error('优化失败:', error)
      setOptimizedText('优化过程中出现错误，请稍后重试。')
    } finally {
      setIsOptimizing(false)
    }
  }

  // 其余代码保持不变...
  const handleReset = () => {
    setShowResult(false)
    setOptimizedText('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 优化头部 */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-6">
            <span className="text-3xl text-white">✨</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            文案优化助手
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            专注文案优化，让您的文字<span className="font-semibold text-blue-600">更具感染力</span>、
            <span className="font-semibold text-purple-600">更符合品牌调性</span>、
            <span className="font-semibold text-green-600">更适配发布平台</span>
          </p>
        </header>

        {!showResult ? (
          <CopyInput 
            originalText={originalText}
            onTextChange={setOriginalText}
            onOptimize={handleOptimize}
            isOptimizing={isOptimizing}
          />
        ) : (
          <ResultView 
            original={originalText}
            optimized={optimizedText}
            onReset={handleReset}
            onReoptimize={() => setShowResult(false)}
          />
        )}

        {/* 优化特性说明 */}
        {!showResult && (
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl text-2xl text-blue-600 mb-4">
                🎯
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">品牌声音守护</h3>
              <p className="text-gray-600 leading-relaxed">基于您的原文，强化独特风格和品牌个性，保持一致性</p>
            </div>
            
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl text-2xl text-purple-600 mb-4">
                📈
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">文案质感提升</h3>
              <p className="text-gray-600 leading-relaxed">通过文学化手法，让普通文案变得动人有力，提升感染力</p>
            </div>
            
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl text-2xl text-green-600 mb-4">
                🌐
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">跨平台适配</h3>
              <p className="text-gray-600 leading-relaxed">一键将核心文案转化为适合不同平台的版本，提升传播效果</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App