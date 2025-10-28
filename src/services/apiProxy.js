export class APIProxy {
  async optimizeWithAI(originalText, brandContext, strategy) {
    try {
      console.log('🔄 开始调用API优化...', { 
        textLength: originalText.length,
        platform: brandContext.platform 
      });

      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalText,
          brandContext,
          strategy
        })
      });

      console.log('📡 API响应状态:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API请求失败:', response.status, errorText);
        throw new Error(`请求失败: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API优化成功');
      return data.optimizedText;
      
    } catch (error) {
      console.error('🚨 API代理请求失败:', error);
      throw new Error('网络请求失败，请检查网络连接');
    }
  }
}