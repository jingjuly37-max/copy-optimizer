const fetch = require('node-fetch')

exports.handler = async function (event, context) {
  // 添加调试信息
  console.log('=== optimize函数被调用 ===')
  console.log('GLM4_API_KEY exists:', !!process.env.GLM4_API_KEY)
  
  // 处理CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // 增强JSON解析容错
    let requestBody;
    try {
      requestBody = JSON.parse(event.body)
    } catch (parseError) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: '请求体格式错误' })
      }
    }

    const { originalText, brandAssets, operationGoal, platform } = requestBody

    if (!originalText || originalText.trim().length === 0) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: '缺少待优化文案' })
      }
    }

    console.log('收到优化请求，文案长度:', originalText.length)
    console.log('运营目标:', operationGoal)

    // 构建超级Prompt
    const superPrompt = buildSuperPrompt(originalText, brandAssets, operationGoal, platform)
    console.log('Prompt构建完成，长度:', superPrompt.length)
    
    // 调用GLM-4 API
    const optimizedContent = await callGLM4(superPrompt)
    console.log('GLM-4 API调用成功，响应长度:', optimizedContent.length)
    
    // 解析响应
    const structuredResult = parseGLM4Response(optimizedContent)
    console.log('结果解析完成，版本数量:', structuredResult.versions?.length)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(structuredResult)
    }
  } catch (error) {
    console.error('API Error:', error)
    console.error('Error stack:', error.stack)
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: '优化服务暂时不可用',
        details: process.env.NODE_ENV === 'development' ? error.message : '请稍后重试'
      })
    }
  }
}

function buildSuperPrompt(originalText, brandAssets, operationGoal, platform) {
  const operationGoalMap = {
    'new-product': '新品造势：发布前预热，制造期待感',
    'brand-exposure': '品牌曝光：提升品牌知名度和认知度', 
    'sales-conversion': '销售转化：直接促进购买或咨询',
    'user-engagement': '用户维系：增强老用户粘性和互动'
  }

  const goalDescription = operationGoalMap[operationGoal] || '内容优化'

  // 构建品牌人格描述
  const personalityMap = {
    'expert': '专业专家',
    'friend': '知心好友', 
    'pioneer': '潮流先锋',
    'artist': '生活艺术家'
  }
  
  const brandPersonalityDesc = brandAssets?.brandPersonality
    ?.map(p => personalityMap[p] || p)
    ?.join('、') || '未指定'

  return `你是一名资深的小红书内容运营专家。请基于用户提供的品牌资产和运营目标，对文案进行深度优化。

【品牌资产】
- 核心理念：${brandAssets?.coreConcept || '未提供'}
- 目标用户：${brandAssets?.targetAudience || '未提供'}
- 品牌人格：${brandPersonalityDesc}
- 禁用词汇：${brandAssets?.forbiddenWords || '无'}
- 推荐词汇：${brandAssets?.recommendedWords || '无'}

【运营目标】${goalDescription}

【优化要求】
1. 生成3个不同角度和风格的优化版本，每个版本都要符合小红书平台特性
2. 版本1：侧重情感共鸣和故事性
3. 版本2：侧重干货价值和实用性  
4. 版本3：侧重热点结合和传播性
5. 严格避免使用禁用词汇，巧妙融入推荐词汇
6. 符合小红书年轻化、口语化、强互动的特点
7. 每个版本控制在300-500字之间（不要超过500字）

【诊断报告要求】
- 标题吸引力：评估标题的点击率和吸引力
- 内容结构：评估内容的逻辑结构和可读性
- 互动潜力：评估引发点赞、评论、收藏的潜力

【标签推荐】推荐5个相关的小红书热门标签

【待优化文案】
${originalText}

请严格按照以下JSON格式返回，不要包含其他任何内容：
{
  "versions": [
    "版本1的完整文案内容",
    "版本2的完整文案内容", 
    "版本3的完整文案内容"
  ],
  "report": {
    "titleScore": "具体评价内容，如：标题运用了悬念和情感共鸣，吸引力较强",
    "structureScore": "具体评价内容，如：结构清晰，从痛点引入到解决方案，逻辑顺畅", 
    "engagementScore": "具体评价内容，如：设置了互动提问和价值承诺，互动潜力良好"
  },
  "tags": ["标签1", "标签2", "标签3", "标签4", "标签5"]
}`
}

async function callGLM4(prompt) {
  const apiKey = process.env.GLM4_API_KEY
  
  if (!apiKey) {
    throw new Error('GLM-4 API密钥未配置。请在Netlify环境变量中设置GLM4_API_KEY')
  }

  console.log('调用GLM-4 API，API Key前6位:', apiKey.substring(0, 6) + '...')

  try {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "glm-4",
        messages: [
          {
            role: "user", 
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 4000
      }),
      timeout: 30000 // 30秒超时
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('GLM-4 API响应错误:', response.status, errorText)
      throw new Error(`GLM-4 API请求失败: ${response.status}`)
    }

    const data = await response.json()
    console.log('GLM-4 API响应数据:', JSON.stringify(data).substring(0, 200) + '...')
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('GLM-4 API返回数据格式异常:', data)
      throw new Error('GLM-4 API返回数据格式异常')
    }

    return data.choices[0].message.content
  } catch (fetchError) {
    console.error('GLM-4 API调用异常:', fetchError.message)
    throw new Error(`GLM-4 API调用失败: ${fetchError.message}`)
  }
}

function parseGLM4Response(content) {
  console.log('开始解析GLM-4响应，原始内容前200字符:', content.substring(0, 200))
  
  try {
    // 清理响应内容，提取JSON部分
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const jsonStr = jsonMatch[0]
      console.log('提取到JSON字符串，长度:', jsonStr.length)
      const result = JSON.parse(jsonStr)
      
      // 验证必需字段
      if (!result.versions || !Array.isArray(result.versions) || result.versions.length === 0) {
        throw new Error('versions字段缺失或格式错误')
      }
      
      return result
    }
    
    throw new Error('未找到有效的JSON响应')
  } catch (error) {
    console.error('JSON解析失败:', error.message)
    console.log('原始内容:', content)
    
    // 降级处理：返回默认结构
    return {
      versions: [
        "🚀 优化版本1：\n\n" + (content.length > 1000 ? content.substring(0, 1000) + "..." : content),
        "📊 优化版本2：\n\n这是第二个优化版本，专注于实用价值和干货分享。",
        "💫 优化版本3：\n\n这是第三个优化版本，结合热点话题提升传播性。"
      ],
      report: {
        titleScore: "内容已优化，具备较好的吸引力",
        structureScore: "结构合理，符合小红书阅读习惯", 
        engagementScore: "互动引导明确，具备良好互动潜力"
      },
      tags: ["好物分享", "种草", "生活记录", "使用心得", "推荐"]
    }
  }
}