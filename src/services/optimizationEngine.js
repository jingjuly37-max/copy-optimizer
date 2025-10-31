// src/services/optimizationEngine.js
import { mockOptimizeContent } from './mockOptimization';

// 开发环境使用模拟数据，生产环境使用真实API
const isDevelopment = false; // 使用真实API

export async function optimizeContent(optimizationData) {
  const {
    originalText,
    brandAssets,
    operationGoal,
    contentType,
    mediaDescription
  } = optimizationData;

  if (isDevelopment) {
    console.log('🔧 开发模式：使用本地模拟数据');
    console.log('优化数据:', optimizationData);
    return await mockOptimizeContent(optimizationData);
  }

  try {
    // 生产环境使用真实API
    const response = await fetch('/.netlify/functions/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        originalText,
        brandAssets,
        operationGoal,
        contentType,
        mediaDescription
      })
    });

    if (!response.ok) {
      throw new Error(`优化服务请求失败: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Optimization engine error:', error);
    throw new Error(error.message || '内容优化服务暂时不可用');
  }
}