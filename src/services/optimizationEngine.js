import { apiProxy } from './apiProxy'

export async function optimizeContent({ originalText, brandAssets, operationGoal, platform }) {
  try {
    const response = await apiProxy('/.netlify/functions/optimize', {
      method: 'POST',
      body: JSON.stringify({
        originalText,
        brandAssets,
        operationGoal, 
        platform
      })
    })

    if (!response.ok) {
      throw new Error(`优化服务请求失败: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.error) {
      throw new Error(data.error)
    }

    return data
  } catch (error) {
    console.error('Optimization engine error:', error)
    throw new Error(error.message || '内容优化服务暂时不可用')
  }
}