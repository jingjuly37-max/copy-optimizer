// src/services/mockOptimization.js
export async function mockOptimizeContent({ originalText, brandAssets, operationGoal, platform }) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 模拟AI返回的数据结构
  return {
    versions: [
      `🚀 【情感共鸣版】\n\n姐妹们！发现了一个宝藏${brandAssets?.coreConcept || '产品'}！\n\n作为一个${brandAssets?.targetAudience || '都市年轻人'}，我真的被这个${brandAssets?.coreConcept || '产品'}惊艳到了！从打开包装的那一刻起，就感受到了满满的仪式感。\n\n使用体验：⭐⭐⭐⭐⭐\n性价比：超高！\n回购意愿：100%\n\n💡 小贴士：搭配使用效果更佳哦～`,
      
      `📊 【干货价值版】\n\n${brandAssets?.coreConcept || '产品'}深度评测报告：\n\n✅ 优点总结：\n- 设计精美，质感出众\n- 使用便捷，操作简单\n- 效果显著，立竿见影\n\n📝 使用建议：\n1. 首次使用建议先阅读说明书\n2. 搭配相关配件效果更佳\n3. 定期维护保持最佳状态\n\n🎯 适合人群：${brandAssets?.targetAudience || '注重品质的消费者'}`,
      
      `💫 【热点传播版】\n\n谁懂啊！这个${brandAssets?.coreConcept || '产品'}也太绝了吧！\n\n最近在小红书上刷到好多博主推荐，终于忍不住入手了！果然没有让我失望～\n\n🔥 热门话题：#好物分享 #种草 #${brandAssets?.coreConcept || '生活方式'}\n\n👉 使用感受：\n- 颜值在线，拍照超好看\n- 功能强大，满足日常需求\n- 价格亲民，性价比之王\n\n姐妹们冲就对了！`
    ],
    report: {
      titleScore: "标题运用了情感共鸣和悬念设置，吸引力较强",
      structureScore: "结构清晰，从引入到体验再到总结，逻辑顺畅",
      engagementScore: "设置了互动提问和价值承诺，互动潜力良好"
    },
    tags: ["好物分享", "种草", brandAssets?.coreConcept || "推荐", "使用心得", "生活记录"]
  };
}