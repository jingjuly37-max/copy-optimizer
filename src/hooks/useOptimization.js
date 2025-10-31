import { useState } from 'react'
import { optimizeContent } from '../services/optimizationEngine'

export function useOptimization() {
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const optimize = async (originalText, brandAssets, operationGoal) => {
    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      const optimizationResults = await optimizeContent({
        originalText,
        brandAssets,
        operationGoal,
        platform: 'xiaohongshu' // 固定为小红书平台
      })

      setResults(optimizationResults)
    } catch (err) {
      console.error('Optimization error:', err)
      setError(err.message || '优化服务暂时不可用，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    optimize,
    results,
    isLoading,
    error
  }
}