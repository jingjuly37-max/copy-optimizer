// 策略路由器 - 将问卷答案转换为具体的优化指令
export function strategyRouter(brandContext) {
  // 初始化一个空的策略指令
  const strategy = {
    coreTone: 'neutral', // 核心语调
    focusStrategies: [], // 需要重点应用的策略列表
    avoidStrategies: [], // 需要避免的策略列表
    specificKeywords: { // 关键词操作指令
      add: [], // 需要加入的关键词
      avoid: [] // 需要避免的关键词
    },
    structuralGuidance: '' // 结构指导建议
  };

  // 1. 基于品牌人格映射核心语调
  mapBrandPersona(strategy, brandContext.brandPersona, brandContext.customPersona);
  
  // 2. 基于用户任务映射策略重点
  mapUserJob(strategy, brandContext.userJob, brandContext.customJobLabel);
  
  // 3. 基于内容目标映射结构指导
  mapContentGoal(strategy, brandContext.contentGoal);

  return strategy;
}

// 品牌人格映射函数
function mapBrandPersona(strategy, persona, customPersona) {
  const personaMap = {
    // A. 专业专家
    'professional_expert': {
      coreTone: 'authoritative_reliable',
      focusStrategies: ['use_data_research', 'emphasize_craftsmanship', 'rational_argument_structure'],
      avoidStrategies: ['casual_slang', 'exaggerated_emotion'],
      keywords: {
        add: ['专业', '精准', '可靠', '研发', '实证', '匠心'],
        avoid: ['超赞', '爆款', 'yyds']
      }
    },
    // B. 知心好友
    'close_friend': {
      coreTone: 'warm_empathic',
      focusStrategies: ['colloquial_expression', 'personal_experience_sharing', 'conversational_structure'],
      avoidStrategies: ['formal_language', 'technical_jargons'],
      keywords: {
        add: ['贴心', '懂你', '陪伴', '真实', '分享', '悄悄'],
        avoid: ['权威', '专家', '顶级']
      }
    },
    // C. 潮流先锋
    'trend_setter': {
      coreTone: 'confident_edgy',
      focusStrategies: ['use_trending_phrases', 'emphasize_design_aesthetic', 'cultural_references'],
      avoidStrategies: ['conservative_style', 'traditional_values'],
      keywords: {
        add: ['潮流', '独特', '小众', '设计感', '先锋', '态度'],
        avoid: ['经典', '传统', '普通']
      }
    },
    // D. 生活艺术家
    'life_artist': {
      coreTone: 'poetic_sensory',
      focusStrategies: ['use_metaphors_imagery', 'describe_sensory_details', 'philosophical_associations'],
      avoidStrategies: ['hard_sell', 'direct_commands'],
      keywords: {
        add: ['美学', '质感', '光影', '温度', '仪式', '静谧'],
        avoid: ['便宜', '划算', '促销']
      }
    }
  };

  // 应用预设人格映射
  if (personaMap[persona]) {
    const config = personaMap[persona];
    Object.assign(strategy, {
      coreTone: config.coreTone,
      focusStrategies: [...strategy.focusStrategies, ...config.focusStrategies],
      avoidStrategies: [...strategy.avoidStrategies, ...config.avoidStrategies],
      specificKeywords: {
        add: [...strategy.specificKeywords.add, ...config.keywords.add],
        avoid: [...strategy.specificKeywords.avoid, ...config.keywords.avoid]
      }
    });
  }

  // 处理自定义人格描述
  if (customPersona && customPersona.trim()) {
    strategy.focusStrategies.push('enhance_uniqueness');
    strategy.specificKeywords.add.push(customPersona);
  }
}

// 用户任务映射函数
function mapUserJob(strategy, userJob, customJobLabel) {
  const userJobMap = {
    // 解决明确痛点
    'solve_pain_point': {
      focusStrategies: ['highlight_pain_points', 'show_before_after_contrast', 'direct_solution_presentation'],
      structuralGuidance: '痛点共鸣 → 解决方案 → 效果证明'
    },
    // 完成向往目标
    'achieve_aspiration': {
      focusStrategies: ['depict_ideal_state', 'position_as_key_enabler', 'emotional_reward_emphasis'],
      structuralGuidance: '梦想描绘 → 实现路径 → 情感收获'
    },
    // 避免潜在焦虑
    'avoid_anxiety': {
      focusStrategies: ['gently_address_risks', 'position_as_protective_shield', 'safety_assurance'],
      structuralGuidance: '风险提示 → 防护方案 → 安心承诺'
    }
  };

  // 应用预设任务映射
  if (userJobMap[userJob]) {
    const config = userJobMap[userJob];
    strategy.focusStrategies.push(...config.focusStrategies);
    strategy.structuralGuidance = config.structuralGuidance;
  }

  // 处理自定义任务标签
  if (customJobLabel) {
    const customJobConfig = {
      '彰显个性与态度': {
        focusStrategies: ['use_strong_personal_pronouns', 'highlight_unique_design_story', 'emphasize_self_expression'],
        keywords: { add: ['个性', '态度', '表达', '独特', '不追随'] }
      },
      '营造仪式感': {
        focusStrategies: ['describe_sensory_details', 'build_ritual_momentum', 'use_ritualistic_language'],
        keywords: { add: ['仪式', '时刻', '专注', '神圣', '赋予意义'] }
      },
      '寄托情感与记忆': {
        focusStrategies: ['evoke_nostalgia', 'create_emotional_anchors', 'storytelling_narrative'],
        keywords: { add: ['记忆', '情感', '传承', '故事', '时光'] }
      },
      '探索与发现乐趣': {
        focusStrategies: ['create_curiosity', 'highlight_discovery_process', 'sense_of_adventure'],
        keywords: { add: ['探索', '发现', '惊喜', '新奇', '冒险'] }
      }
    };

    if (customJobConfig[customJobLabel]) {
      const config = customJobConfig[customJobLabel];
      strategy.focusStrategies.push(...config.focusStrategies);
      strategy.specificKeywords.add.push(...config.keywords.add);
    }
  }
}

// 内容目标映射函数
function mapContentGoal(strategy, contentGoal) {
  const contentGoalMap = {
    // 初次认识
    'first_impression': {
      focusStrategies: ['highlight_unique_value_proposition', 'clear_brand_definition'],
      structuralGuidance: '我是谁 → 为何不同 → 能为你做什么'
    },
    // 深度种草
    'deep_seeding': {
      focusStrategies: ['detailed_user_experience', 'multi_dimensional_showcase', 'ideal_life_scene_implantation'],
      structuralGuidance: '深度细节 → 多维体验 → 美好生活场景'
    },
    // 立即行动
    'immediate_action': {
      focusStrategies: ['create_urgency_elements', 'clear_call_to_action', 'risk_reduction'],
      structuralGuidance: '价值汇总 → 紧迫感营造 → 明确行动指令'
    },
    // 激发共鸣
    'emotional_connection': {
      focusStrategies: ['brand_storytelling', 'universal_emotions_exploration', 'values_identification'],
      structuralGuidance: '价值观表达 → 情感共鸣 → 身份认同'
    }
  };

  if (contentGoalMap[contentGoal]) {
    const config = contentGoalMap[contentGoal];
    strategy.focusStrategies.push(...config.focusStrategies);
    // 如果还没有结构指导，就用内容目标的指导
    if (!strategy.structuralGuidance) {
      strategy.structuralGuidance = config.structuralGuidance;
    }
  }
}

export default strategyRouter;