import { strategyRouter } from './strategyRouter.js';
import { APIProxy } from './apiProxy.js';

export class AIOptimizationEngine {
  constructor() {
    this.apiProxy = new APIProxy();
  }

  async optimizeWithContext(originalText, brandContext) {
    if (!originalText.trim()) return originalText;

    try {
      const strategy = strategyRouter(brandContext);
      console.log('🎯 优化策略:', strategy);
      
      // 通过Vercel Function调用
      const optimizedText = await this.apiProxy.optimizeWithAI(
        originalText, 
        brandContext, 
        strategy
      );
      
      return optimizedText;
      
    } catch (error) {
      console.error('AI优化失败:', error);
      // 降级到规则优化
      return await this.fallbackOptimization(originalText, brandContext);
    }
  }

  async fallbackOptimization(originalText, brandContext) {
    // 可以保留您之前的规则优化作为降级方案
    const basicResponse = `由于网络问题，AI优化暂时不可用。以下是基于规则的优化建议：
    
【建议优化方向】
1. 为"${originalText}"添加具体的使用场景
2. 突出${brandContext.brandName ? brandContext.brandName + '的' : ''}独特价值  
3. 使用更生动的感官描述词
4. 适配${brandContext.platform}平台的表达风格

请稍后重试AI优化功能。`;
    
    return basicResponse;
  }
}

export default AIOptimizationEngine;