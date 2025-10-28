// /api/optimize.js - Vercel Serverless Function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { originalText, brandContext, strategy } = req.body;

    // 构建AI提示词
    const prompt = buildAIPrompt(originalText, brandContext, strategy);
    
    // 调用智谱API
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`
      },
      body: JSON.stringify({
        model: "glm-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        top_p: 0.9,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`智谱API请求失败: ${response.status}`);
    }

    const data = await response.json();
    const optimizedText = data.choices[0].message.content;

    res.status(200).json({ optimizedText });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: '优化服务暂时不可用，请稍后重试' });
  }
}

function buildAIPrompt(originalText, brandContext, strategy) {
  const { brandName, productName, platform } = brandContext;
  
  return `你是一位资深文案策划人，拥有卓越的文学功底和营销洞察力。

【优化任务】
将以下产品文案进行文学化升级，要求既保持产品信息准确性，又提升情感感染力和文学美感。

【原文案】
${originalText}

【品牌背景】
- 品牌名称：${brandName || '未提供'}
- 产品名称：${productName || '未提供'} 
- 发布平台：${platform || '微信公众号'}
- 品牌人格：${getPersonaDescription(strategy.coreTone)}
- 内容目标：${getGoalDescription(brandContext.contentGoal)}

【优化要求】
1. 文学表达：运用比喻、排比、通感等修辞手法，创造有画面感的场景
2. 情感共鸣：从用户视角出发，触发情感共鸣点
3. 营销逻辑：遵循AIDA模型（注意-兴趣-欲望-行动），自然融入产品价值
4. 风格适配：保持${getToneDescription(strategy.coreTone)}的语言风格
5. 平台优化：适配${platform}平台的阅读习惯和内容特点

请直接输出优化后的文案，不需要额外说明。`;
}

// 辅助函数
function getPersonaDescription(coreTone) {
  const descriptions = {
    'poetic_sensory': '生活艺术家 - 注重美学和感官体验',
    'warm_empathic': '知心好友 - 温暖贴心，像朋友交流', 
    'authoritative_reliable': '专业专家 - 权威可信，数据驱动',
    'confident_edgy': '潮流先锋 - 时尚前沿，个性鲜明'
  };
  return descriptions[coreTone] || '专业可信';
}

function getGoalDescription(contentGoal) {
  const goals = {
    'first_impression': '品牌认知 - 让用户记住我们是谁',
    'deep_seeding': '深度种草 - 让用户产生渴望',
    'immediate_action': '促进转化 - 引导立即行动', 
    'emotional_connection': '情感共鸣 - 建立价值观认同'
  };
  return goals[contentGoal] || '深度种草';
}

function getToneDescription(coreTone) {
  const tones = {
    'poetic_sensory': '诗意优美，富有文学质感',
    'warm_empathic': '温暖亲切，口语化表达',
    'authoritative_reliable': '专业严谨，理性客观',
    'confident_edgy': '潮流个性，网络化语言'
  };
  return tones[coreTone] || '专业优美';
}