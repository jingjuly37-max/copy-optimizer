import { useState } from 'react'

export default function BrandAssetForm({ onSubmit }) {
  const [assets, setAssets] = useState({
    coreConcept: '',
    brandValues: '',
    targetAudience: '',
    brandPersonality: [],
    stylePrompts: [],
    coreSellingPoints: ['', '', ''],
    forbiddenWords: '',
    recommendedWords: ''
  })

  const brandPersonalities = [
    { id: 'expert', label: '专业专家', emoji: '👨‍🔬' },
    { id: 'friend', label: '知心好友', emoji: '😊' },
    { id: 'pioneer', label: '潮流先锋', emoji: '🏃‍♀️' },
    { id: 'artist', label: '生活艺术家', emoji: '🎨' }
  ]

  const stylePromptOptions = [
    '幽默风趣', '严谨专业', '温暖共情', '犀利毒舌', 
    '喜欢用数据', '爱讲故事', '擅长比喻', '直接干脆'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!assets.coreConcept || !assets.targetAudience) {
      alert('请填写品牌核心理念和目标用户画像')
      return
    }
    
    // 过滤掉空的卖点
    const filteredAssets = {
      ...assets,
      coreSellingPoints: assets.coreSellingPoints.filter(point => point.trim() !== '')
    }
    
    onSubmit(filteredAssets)
  }

  const togglePersonality = (personalityId) => {
    setAssets(prev => ({
      ...prev,
      brandPersonality: prev.brandPersonality.includes(personalityId)
        ? prev.brandPersonality.filter(p => p !== personalityId)
        : [...prev.brandPersonality, personalityId]
    }))
  }

  const toggleStylePrompt = (prompt) => {
    setAssets(prev => ({
      ...prev,
      stylePrompts: prev.stylePrompts.includes(prompt)
        ? prev.stylePrompts.filter(p => p !== prompt)
        : [...prev.stylePrompts, prompt]
    }))
  }

  const updateSellingPoint = (index, value) => {
    const newSellingPoints = [...assets.coreSellingPoints]
    newSellingPoints[index] = value
    setAssets(prev => ({ ...prev, coreSellingPoints: newSellingPoints }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 品牌核心理念 - 保留原有 */}
      <div>
        <label className="block text-sm font-medium mb-2">品牌核心理念</label>
        <input
          type="text"
          placeholder="用一句话定义品牌灵魂，如：为都市年轻人提供高性价比的精致生活"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={assets.coreConcept}
          onChange={(e) => setAssets(prev => ({ ...prev, coreConcept: e.target.value }))}
          required
        />
      </div>

      {/* 新增：品牌价值观 */}
      <div>
        <label className="block text-sm font-medium mb-2">品牌价值观/使命</label>
        <input
          type="text"
          placeholder="用一句话总结品牌想带给用户的信念，如：环保、效率、自信"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={assets.brandValues}
          onChange={(e) => setAssets(prev => ({ ...prev, brandValues: e.target.value }))}
        />
        <p className="text-xs text-gray-500 mt-1">确保AI在文案中植入深层次的品牌信念</p>
      </div>

      {/* 目标用户画像 - 保留原有 */}
      <div>
        <label className="block text-sm font-medium mb-2">目标用户画像</label>
        <input
          type="text"
          placeholder="如：25-35岁一线城市白领，注重性价比与生活品质"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={assets.targetAudience}
          onChange={(e) => setAssets(prev => ({ ...prev, targetAudience: e.target.value }))}
          required
        />
      </div>

      {/* 品牌人格 - 保留原有样式，优化交互 */}
      <div>
        <label className="block text-sm font-medium mb-2">品牌人格（可选）</label>
        <div className="grid grid-cols-2 gap-3">
          {brandPersonalities.map((personality) => (
            <button
              key={personality.id}
              type="button"
              className={`p-3 border rounded-lg text-center transition-colors ${
                assets.brandPersonality.includes(personality.id)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => togglePersonality(personality.id)}
            >
              <div className="text-lg">{personality.emoji}</div>
              <div className="text-sm">{personality.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 新增：风格描述提示 */}
      <div>
        <label className="block text-sm font-medium mb-2">风格描述提示（可多选）</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {stylePromptOptions.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className={`p-2 text-xs border rounded transition-colors ${
                assets.stylePrompts.includes(prompt)
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => toggleStylePrompt(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">细化人设，让AI输出的口吻更难被模仿</p>
      </div>

      {/* 新增：产品核心卖点 */}
      <div>
        <label className="block text-sm font-medium mb-2">
          产品核心卖点（请提炼1-3个最关键卖点）
        </label>
        <div className="space-y-3">
          {assets.coreSellingPoints.map((point, index) => (
            <input
              key={index}
              type="text"
              placeholder={`核心卖点 ${index + 1}，如：强效美白、轻盈便携、24小时续航...`}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={point}
              onChange={(e) => updateSellingPoint(index, e.target.value)}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">确保AI无论如何优化，产品卖点都不能被稀释</p>
      </div>

      {/* 禁用词汇和推荐词汇 - 调整布局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">禁用词汇（可选）</label>
          <input
            type="text"
            placeholder="用逗号分隔，如：平替,廉价,低价"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={assets.forbiddenWords}
            onChange={(e) => setAssets(prev => ({ ...prev, forbiddenWords: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">通用推荐词（可选）</label>
          <input
            type="text"
            placeholder="用逗号分隔，如：精致,性价比,设计感"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={assets.recommendedWords}
            onChange={(e) => setAssets(prev => ({ ...prev, recommendedWords: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          下一步：设定运营目标
        </button>
      </div>
    </form>
  )
}