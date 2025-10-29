// 策略路由器 V2.0 - 超级Prompt引擎
// 将抽象的策略标签转换为AI能直接执行的强指令
export function strategyRouter(brandContext) {
  const { brandPersona, userJob, contentGoal, platform, customPersona, customJobLabel } = brandContext;

  // 1. 映射品牌人格为角色指令
  const personaInstruction = mapBrandPersonaToInstruction(brandPersona, customPersona);
  
  // 2. 映射用户任务为内容焦点
  const jobInstruction = mapUserJobToInstruction(userJob, customJobLabel);
  
  // 3. 映射内容目标为结构指令
  const goalInstruction = mapContentGoalToInstruction(contentGoal);
  
  // 4. 映射平台特性为表达规范
  const platformInstruction = mapPlatformToInstruction(platform);

  // 构建完整的优化指令
  const fullInstruction = buildFullInstruction({
    personaInstruction,
    jobInstruction, 
    goalInstruction,
    platformInstruction
  });

  return {
    instructions: fullInstruction,
    // 保留原始策略标签用于其他逻辑（如UI显示）
    coreTone: personaInstruction.coreTone,
    focusStrategies: [...personaInstruction.strategies, ...jobInstruction.strategies, ...goalInstruction.strategies],
    structuralGuidance: goalInstruction.structuralGuidance
  };
}

// 品牌人格 -> 强角色指令
function mapBrandPersonaToInstruction(persona, customPersona) {
  const personaMap = {
    'professional_expert': {
      coreTone: 'authoritative_reliable',
      instruction: `【角色扮演】你是一位在该领域深耕15年的首席专家。你的话语必须建立在事实、数据和逻辑之上，给人以不容置疑的专业感和信任感。
【语言规则】
1. 使用"经验证"、"数据表明"、"行业标准"等权威词汇
2. 构建"问题-原理-解决方案"的完整逻辑链条
3. 避免使用"可能"、"也许"等不确定词汇，替换为"能够"、"必将"
4. 适当引用行业报告、实验室数据或用户案例作为背书`,
      strategies: ['use_data_research', 'emphasize_craftsmanship', 'rational_argument_structure'],
      keywords: {
        add: ['专业', '精准', '可靠', '研发', '实证', '匠心', '验证', '标准'],
        avoid: ['超赞', '爆款', 'yyds', '绝了', '太棒了']
      }
    },

    'close_friend': {
      coreTone: 'warm_empathic', 
      instruction: `【角色扮演】你是用户身边那个最懂行、最靠谱的闺蜜/兄弟。你不是在推销，而是在分享一个让自己受益的好东西。
【语言规则】
1. 使用"你"和"咱们"，大量使用"说真的"、"偷偷告诉你"、"亲测"等口语
2. 分享个人使用的小故事、小尴尬或小确幸
3. 语气要温暖真诚，像朋友间的安利，不要过度夸张
4. 可以适当使用表情符号(如👍、❤️)和语气词(如"啦"、"哦")，但不要过度`,
      strategies: ['colloquial_expression', 'personal_experience_sharing', 'conversational_structure'],
      keywords: {
        add: ['贴心', '懂你', '陪伴', '真实', '分享', '悄悄', '亲测', '安利'],
        avoid: ['权威', '专家', '顶级', '至尊', '奢华']
      }
    },

    'trend_setter': {
      coreTone: 'confident_edgy',
      instruction: `【角色扮演】你是走在最前面的潮流发现者与定义者。你对美和潮流有近乎偏执的追求，不屑于追随大众。
【语言规则】  
1. 使用最新、最地道的网络热词，但要自然不刻意
2. 口吻要自信、犀利，带点"挑剔感"和"优越感"
3. 善于创造新概念、新说法，拒绝陈词滥调
4. 表达要有态度，不怕争议，但要建立在审美品味之上`,
      strategies: ['use_trending_phrases', 'emphasize_design_aesthetic', 'cultural_references'],
      keywords: {
        add: ['潮流', '独特', '小众', '设计感', '先锋', '态度', '出片', '审美'],
        avoid: ['经典', '传统', '普通', '大众', '常规']
      }
    },

    'life_artist': {
      coreTone: 'poetic_sensory',
      instruction: `【角色扮演】你是一位诗人、一位生活美学家。你贩卖的不是产品，而是一种感官的愉悦、一个理想的生活片段。
【语言规则】
1. 大量使用通感修辞：将味觉、嗅觉、触觉转化为视觉画面（如"听见阳光的味道"）
2. 描绘具体、精美、有电影感的画面，让文字有"镜头感"
3. 将产品功能升华为一种精神体验和生活方式
4. 语言要如散文诗般优美，注重节奏和韵律`,
      strategies: ['use_metaphors_imagery', 'describe_sensory_details', 'philosophical_associations'],
      keywords: {
        add: ['美学', '质感', '光影', '温度', '仪式', '静谧', '诗意', '时光'],
        avoid: ['便宜', '划算', '促销', '打折', '性价比']
      }
    }
  };

  const baseConfig = personaMap[persona] || personaMap['close_friend'];
  
  // 处理自定义人格
  if (customPersona && customPersona.trim()) {
    baseConfig.instruction += `\n【个性强化】同时，请突出${customPersona}的个性特质。`;
    baseConfig.keywords.add.push(customPersona);
  }

  return baseConfig;
}

// 用户任务 -> 内容焦点指令
function mapUserJobToInstruction(userJob, customJobLabel) {
  const jobMap = {
    'solve_pain_point': {
      instruction: `【内容焦点】用户正被一个具体问题困扰，你需要：
1. 精准描述该痛点的场景和感受，让用户产生"这就是我"的强烈共鸣
2. 清晰展示你的产品是如何针对性地解决这个问题的
3. 用对比效果证明解决方案的有效性`,
      structuralGuidance: '痛点共鸣 → 解决方案 → 效果证明',
      strategies: ['highlight_pain_points', 'show_before_after_contrast', 'direct_solution_presentation']
    },

    'achieve_aspiration': {
      instruction: `【内容焦点】用户向往更美好的状态，你需要：
1. 生动描绘实现目标后的理想生活场景，激发用户的向往感
2. 将你的产品定位为实现这个目标的关键推动者
3. 强调达成目标后的情感回报和自我实现`,
      structuralGuidance: '梦想描绘 → 实现路径 → 情感收获', 
      strategies: ['depict_ideal_state', 'position_as_key_enabler', 'emotional_reward_emphasis']
    },

    'avoid_anxiety': {
      instruction: `【内容焦点】用户希望规避潜在风险，你需要：
1. 温和但清晰地提示不采取行动可能面临的风险
2. 将你的产品定位为可靠的"防护盾"
3. 提供安全保障和信任背书，消除用户的顾虑`,
      structuralGuidance: '风险提示 → 防护方案 → 安心承诺',
      strategies: ['gently_address_risks', 'position_as_protective_shield', 'safety_assurance']
    }
  };

  const baseConfig = jobMap[userJob] || jobMap['solve_pain_point'];

  // 处理自定义任务标签
  if (customJobLabel) {
    const customJobConfigs = {
      '彰显个性与态度': {
        instruction: `强调产品的独特性和如何帮助用户表达自我，使用强烈的人称代词，突出设计故事和态度表达。`,
        keywords: { add: ['个性', '态度', '表达', '独特', '不追随', '做自己'] }
      },
      '营造仪式感': {
        instruction: `详细描述使用产品时的感官细节，构建仪式感的氛围，使用仪式化的语言让平凡时刻变得神圣。`,
        keywords: { add: ['仪式', '时刻', '专注', '神圣', '赋予意义', '沉淀'] }
      }
    };

    if (customJobConfigs[customJobLabel]) {
      const customConfig = customJobConfigs[customJobLabel];
      baseConfig.instruction += `\n${customConfig.instruction}`;
      baseConfig.keywords = {...baseConfig.keywords, ...customConfig.keywords};
    }
  }

  return baseConfig;
}

// 内容目标 -> 结构指令  
function mapContentGoalToInstruction(contentGoal) {
  const goalMap = {
    'first_impression': {
      instruction: `【结构目标】让用户快速记住你是谁、有何不同
- 开篇：用鲜明特色或核心价值快速建立认知
- 中段：简洁展示最能体现差异化的2-3个特点
- 结尾：明确表达你能为用户提供的核心价值`,
      structuralGuidance: '我是谁 → 为何不同 → 能为你做什么'
    },

    'deep_seeding': {
      instruction: `【结构目标】让用户对产品产生强烈渴望
- 开篇：从具体使用场景切入，建立真实感
- 中段：多维度展示使用体验和细节质感
- 结尾：描绘拥有产品后的美好生活画面`,
      structuralGuidance: '场景切入 → 细节体验 → 美好生活'
    },

    'immediate_action': {
      instruction: `【结构目标】促使用户立即下单或咨询
- 开篇：汇总核心价值，强化购买理由
- 中段：营造稀缺感和紧迫性
- 结尾：提供清晰、无风险的行动指令`,
      structuralGuidance: '价值汇总 → 紧迫感营造 → 明确行动'
    },

    'emotional_connection': {
      instruction: `【结构目标】建立深层次的情感连接
- 开篇：从普世情感或价值观切入
- 中段：通过故事或场景引发强烈共鸣
- 结尾：强化身份认同和归属感`,
      structuralGuidance: '价值观表达 → 情感共鸣 → 身份认同'
    }
  };

  return goalMap[contentGoal] || goalMap['first_impression'];
}

// 平台特性 -> 表达规范
function mapPlatformToInstruction(platform) {
  const platformMap = {
    'wechat_public': {
      instruction: `【平台规范】微信公众号
- 适应长文阅读习惯，结构清晰，善用小标题
- 语言要有深度和格调，提供认知增量
- 结尾要有价值升华或强有力的观点总结`
    },

    'xiaohongshu': {
      instruction: `【平台规范】小红书
- 开头3秒必须抛出强烈共鸣或颠覆常识的"钩子"
- 正文要口语化，多使用表情符号和分段
- 必须有具体的场景植入和"价值清单"总结
- 营造"闺蜜安利"的真实感和亲切感`
    },

    'weibo': {
      instruction: `【平台规范】微博
- 语言精炼，节奏短促，多使用换行和分段
- 善于制造话题，可嵌入投票、提问等互动
- 合理使用热门话题标签，提升传播性`
    },

    'zhihu': {
      instruction: `【平台规范】知乎
- 展现专业性和知识密度，提供干货价值
- 使用严谨的逻辑论证和参考资料
- 语言要客观理性，同时保持可读性`
    },

    'douyin': {
      instruction: `【平台规范】抖音
- 文案要配合视频节奏，简短有力
- 使用悬念式、挑战式等强互动开头
- 善用网络热梗，但要自然不刻意`
    }
  };

  return platformMap[platform] || platformMap['wechat_public'];
}

// 构建完整的优化指令
function buildFullInstruction(components) {
  const { personaInstruction, jobInstruction, goalInstruction, platformInstruction } = components;

  return `
# 文案优化专家指令

## 核心角色设定
${personaInstruction.instruction}

## 内容策略焦点  
${jobInstruction.instruction}

## 结构优化目标
${goalInstruction.instruction}

## 平台表达规范
${platformInstruction.instruction}

## 关键词指导
- 建议使用：${personaInstruction.keywords.add.concat(jobInstruction.keywords?.add || []).join('、')}
- 建议避免：${personaInstruction.keywords.avoid.concat(jobInstruction.keywords?.avoid || []).join('、')}

## 最终要求
请基于以上所有指导，对用户提供的原文案进行深度优化重构，直接返回优化后的文案。
  `.trim();
}

export default strategyRouter;