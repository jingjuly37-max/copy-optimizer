// 导入策略路由和AI优化逻辑
const { strategyRouter } = require('../../src/services/strategyRouter.js');

// 智谱AI API配置
const ZHIPU_API_KEY = process.env.ZHIPU_AI_API_KEY;
const ZHIPU_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { userInput, brandPersona, contentGoal, platform, brandName } = body;

    console.log('收到优化请求:', { brandPersona, contentGoal, platform });

    // 构建品牌上下文
    const brandContext = {
      brandPersona,
      contentGoal, 
      platform,
      brandName: brandName || '您的品牌'
    };

    // 获取优化策略
    const strategy = strategyRouter(brandContext);
    console.log('优化策略:', strategy);

    // 调用真实的智谱AI API
    const optimizedText = await callZhiPuAI(userInput, brandContext, strategy);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        optimizedText: optimizedText,
        status: 'success'
      })
    };

  } catch (error) {
    console.error('函数执行错误:', error);
    
    // 降级方案
    const fallbackResponse = `由于网络问题，AI优化暂时不可用。以下是基于规则的优化建议：
【建议优化方向】
1. 为"${body?.userInput || '您的文案'}"添加具体的使用场景
2. 突出${body?.brandName ? body.brandName + '的' : ''}独特价值  
3. 使用更生动的感官描述词
4. 适配${body?.platform || '目标'}平台的表达风格

请稍后重试AI优化功能。`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        optimizedText: fallbackResponse,
        status: 'fallback'
      })
    };
  }
};

// 真实的智谱AI调用函数
async function callZhiPuAI(originalText, brandContext, strategy) {
  if (!ZHIPU_API_KEY) {
    throw new Error('智谱AI API密钥未配置');
  }

  const prompt = buildOptimizationPrompt(originalText, brandContext, strategy);

  const response = await fetch(ZHIPU_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ZHIPU_API_KEY}`
    },
    body: JSON.stringify({
      model: "glm-4",
      messages: [
        {
          role: "system",
          content: "你是一位资深文案编辑，擅长将普通文案优化为具有感染力和品牌调性的精品内容。"
        },
        {
          role: "user", 
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    throw new Error(`AI API请求失败: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// 构建优化提示词（使用我们之前讨论的强化版提示词）
function buildOptimizationPrompt(originalText, brandContext, strategy) {
  return `
请对以下文案进行深度重构和文学升华（不是简单修改）：

【原文案】
${originalText}

【品牌背景】
- 品牌人格：${brandContext.brandPersona}
- 内容目标：${brandContext.contentGoal} 
- 发布平台：${brandContext.platform}
- 品牌名称：${brandContext.brandName}

【优化策略】
${strategy.instructions}

【强制要求】
1. 结构重构：打破原文框架，用更有张力的叙事逻辑重新组织
2. 文学技法：必须使用隐喻、排比、通感等修辞手法
3. 感官沉浸：描述要激活视觉、味觉、嗅觉等多重感官
4. 价值升华：从功能描述提升到情感价值和精神体验
5. 平台适配：符合${brandContext.platform}平台的表达风格

请直接返回优化后的文案，不要添加额外说明。
`;
}

export default AIOptimizationEngine;