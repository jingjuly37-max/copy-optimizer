import { useState } from 'react'
import { optimizeContent } from '../services/optimizationEngine'

export function useOptimization() {
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const optimize = async (optimizationData) => {
    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      console.log('开始优化，数据:', optimizationData)
      
      const optimizationResult = await optimizeContent(optimizationData)
      
      console.log('优化结果:', optimizationResult)
      setResults(optimizationResult)
      
    } catch (err) {
      console.error('优化过程出错:', err)
      setError(err.message || '优化失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setResults(null)
    setError(null)
    setIsLoading(false)
  }

  return {
    optimize,
    results,
    isLoading,
    error,
    reset
  }
}