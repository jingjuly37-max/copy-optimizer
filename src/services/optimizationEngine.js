import { strategyRouter } from './strategyRouter.js';

export class OptimizationEngine {
  
  async optimizeWithContext(originalText, brandContext) {
    if (!originalText.trim()) {
      return originalText;
    }

    try {
      const strategy = strategyRouter(brandContext);
      console.log('优化策略:', strategy);
      
      let optimized = this.literaryRestructuring(originalText, strategy);
      
      if (brandContext.platform) {
        optimized = this.adaptForPlatform(optimized, brandContext.platform);
      }
      
      return optimized;
      
    } catch (error) {
      console.error('优化过程出错:', error);
      return '优化过程中出现错误，请稍后重试。';
    }
  }

  /**
   * 文学化重构 - 核心优化方法
   */
  literaryRestructuring(text, strategy) {
    // 解析原文核心信息
    const productInfo = this.extractProductInfo(text);
    
    // 根据策略选择文学风格
    let literaryText = '';
    
    switch (strategy.coreTone) {
      case 'poetic_sensory':
        literaryText = this.createPoeticVersion(productInfo, strategy);
        break;
      case 'warm_empathic':
        literaryText = this.createWarmVersion(productInfo, strategy);
        break;
      case 'authoritative_reliable':
        literaryText = this.createAuthoritativeVersion(productInfo, strategy);
        break;
      case 'confident_edgy':
        literaryText = this.createEdgyVersion(productInfo, strategy);
        break;
      default:
        literaryText = this.createPoeticVersion(productInfo, strategy);
    }

    return literaryText;
  }

  /**
   * 提取产品核心信息
   */
  extractProductInfo(text) {
    const info = {
      materials: [],
      features: [],
      benefits: [],
      usage: [],
      design: []
    };

    // 材料提取
    if (text.includes('天然') || text.includes('大豆蜡') || text.includes('植物精油')) {
      info.materials = ['天然大豆蜡', '植物精油'];
    }
    if (text.includes('环保')) {
      info.materials.push('环保材料');
    }

    // 特性提取
    if (text.includes('持久')) info.features.push('持久留香');
    if (text.includes('淡雅')) info.features.push('香气淡雅');
    if (text.includes('简约')) info.design.push('简约设计');
    if (text.includes('现代')) info.design.push('现代风格');

    // 益处提取
    if (text.includes('放松')) info.benefits.push('放松心情');
    if (text.includes('幸福')) info.benefits.push('提升幸福感');
    
    // 使用场景
    if (text.includes('客厅') || text.includes('卧室') || text.includes('书房')) {
      info.usage = ['客厅', '卧室', '书房'];
    }

    return info;
  }

  /**
   * 诗意感官版本 - 生活艺术家风格
   */
  createPoeticVersion(productInfo, strategy) {
    const { materials, features, benefits, usage, design } = productInfo;
    
    const poeticTemplates = [
      // 模板1：场景沉浸式
      `当暮色渐沉，点燃这盏采用${materials.join('与')}的香薰，${features[0]}如轻柔的薄纱般弥漫。${benefits[0]}，${benefits[1]}——在${usage.join('、')}的每个角落，${design[0]}悄然编织着生活的诗意。`,

      // 模板2：情感叙事式  
      `在喧嚣都市的缝隙里，寻得一处安宁：${materials[0]}承载着大地的呼吸，${features[0]}如老朋友般的陪伴。${benefits[0]}不是奢求，而是${usage[0]}里触手可及的温柔。`,

      // 模板3：美学哲思式
      `「${design[0]}」不止于形态，更是生活态度的宣言。${materials.join('与')}的相遇，让${features[0]}成为空间的情感标点。${benefits[1]}，从${usage.slice(0,2).join('到')}的流转间悄然生长。`
    ];

    let selectedTemplate = poeticTemplates[Math.floor(Math.random() * poeticTemplates.length)];
    
    // 应用策略特定的增强
    if (strategy.focusStrategies.includes('use_metaphors_imagery')) {
      selectedTemplate = this.enhanceWithMetaphors(selectedTemplate);
    }
    if (strategy.focusStrategies.includes('describe_sensory_details')) {
      selectedTemplate = this.enhanceSensoryDetails(selectedTemplate);
    }

    return selectedTemplate;
  }

  /**
   * 温暖共情版本 - 知心好友风格
   */
  createWarmVersion(productInfo, strategy) {
    const { materials, features, benefits, usage } = productInfo;
    
    const warmTemplates = [
      `亲爱的，你知道吗？这瓶小小的香薰藏着大大的温暖。${materials[0]}和${materials[1]}就像贴心的朋友，用${features[0]}轻轻拥抱你的${usage[0]}。${benefits[0]}的时候，记得它一直在默默陪伴着你呀～`,

      `今天过得有点累了吧？让这盏${materials[0]}香薰给你一个温暖的抱抱。${features[0]}慢慢散开，${benefits[0]}，${benefits[1]}自然就来啦！放在${usage.join('或者')}都很合适呢。`,

      `偷偷告诉你一个小秘密：我的${benefits[0]}神器就是它！${materials.join('+')}的黄金组合，${features[0]}超级治愈。在${usage[0]}点燃它，就像给心情做了一个SPA～`
    ];

    return warmTemplates[Math.floor(Math.random() * warmTemplates.length)];
  }

  /**
   * 权威专业版本 - 专业专家风格
   */
  createAuthoritativeVersion(productInfo, strategy) {
    const { materials, features, benefits, usage } = productInfo;
    
    const authoritativeTemplates = [
      `经实验室数据验证：采用${materials.join('及')}的香薰蜡烛，确保持久稳定的${features[0]}表现。临床测试表明，持续使用可有效${benefits[0]}，${benefits[1]}提升达47%。适用于${usage.join('、')}等场景。`,

      `专业成分解析：${materials[0]}确保燃烧纯净度，${materials[1]}提供天然芳香分子。${features[0]}技术突破，${benefits[0]}效率提升显著。建议${usage.join('或')}场景使用，每日2-3小时可达最佳效果。`,

      `创新工艺揭秘：通过${materials.join('与')}的科学配比，实现${features[0]}的突破。研究显示，在${usage[0]}环境中使用，${benefits[0]}效果尤为突出，${benefits[1]}持续增强。`
    ];

    return authoritativeTemplates[Math.floor(Math.random() * authoritativeTemplates.length)];
  }

  /**
   * 潮流先锋版本 - 潮流先锋风格
   */
  createEdgyVersion(productInfo, strategy) {
    const { materials, features, benefits, usage } = productInfo;
    
    const edgyTemplates = [
      `🔥新物种警报！${materials.join('×')}的神仙组合，${features[0]}直接拉满！${benefits[0]}？${benefits[1]}？安排！${usage.join('、')}随便放，颜值即正义！`,

      `👀还在用普通香薰？OUT了！这款${materials[0]}香薰才是2024顶配！${features[0]}超能打，${benefits[0]}效果绝绝子～${usage.slice(0,2).join('和')}必备，潮人都在冲！`,

      `💥炸裂推荐！这个${materials.join('+')}的香薰也太顶了吧！${features[0]}持久在线，${benefits.join('+')}双重暴击！放在${usage[0]}直接氛围感天花板，不入手真的亏大了！`
    ];

    return edgyTemplates[Math.floor(Math.random() * edgyTemplates.length)];
  }

  /**
   * 比喻增强
   */
  enhanceWithMetaphors(text) {
    const metaphorMap = {
      '弥漫': '如晨雾般温柔弥漫',
      '陪伴': '如老友般温暖陪伴', 
      '拥抱': '如恋人般深情拥抱',
      '治愈': '如良药般自然治愈',
      '生长': '如春芽般悄然生长'
    };

    return this.smartReplace(text, metaphorMap);
  }

  /**
   * 感官细节增强
   */
  enhanceSensoryDetails(text) {
    const sensoryMap = {
      '香气': '萦绕心间的芬芳气息',
      '点燃': '划亮火柴的仪式瞬间',
      '温暖': '从指尖蔓延至心底的暖意',
      '宁静': '万籁俱寂的平和时刻',
      '治愈': '抚平皱褶的心灵SPA'
    };

    return this.smartReplace(text, sensoryMap);
  }

  /**
   * 智能替换
   */
  smartReplace(text, replacementMap) {
    let result = text;
    Object.keys(replacementMap).forEach(key => {
      if (result.includes(key) && !result.includes(replacementMap[key])) {
        result = result.replace(key, replacementMap[key]);
      }
    });
    return result;
  }

  /**
   * 平台适配
   */
  adaptForPlatform(text, platform) {
    let adapted = text;
    switch (platform) {
      case '小红书':
        adapted += ' #好物分享 #生活美学 #居家好物';
        break;
      case '微博':
        if (adapted.length > 130) {
          adapted = adapted.substring(0, 127) + '...';
        }
        adapted += ' 🔥';
        break;
      case '抖音':
        adapted = '💫 ' + adapted + ' #种草 #家居好物';
        break;
      case '微信公众号':
        // 微信公众号保持原样
        break;
    }
    return adapted;
  }

  // 保留其他必要的方法...
  applyOptimizationStrategies(text, strategy) {
    // 现在主要使用 literaryRestructuring，这个方法作为备用
    return this.literaryRestructuring(text, strategy);
  }
}

export default OptimizationEngine;