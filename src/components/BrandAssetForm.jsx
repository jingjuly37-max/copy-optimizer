import { useState } from 'react'

export default function BrandAssetForm({ onSubmit }) {
  const [assets, setAssets] = useState({
    coreConcept: '',
    targetAudience: '',
    brandPersonality: [],
    forbiddenWords: '',
    recommendedWords: ''
  })

  const brandPersonalities = [
    { id: 'expert', label: '专业专家', emoji: '👨‍🔬' },
    { id: 'friend', label: '知心好友', emoji: '😊' },
    { id: 'pioneer', label: '潮流先锋', emoji: '🏃‍♀️' },
    { id: 'artist', label: '生活艺术家', emoji: '🎨' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!assets.coreConcept || !assets.targetAudience) {
      alert('请填写品牌核心理念和目标用户画像')
      return
    }
    onSubmit(assets)
  }

  const togglePersonality = (personalityId) => {
    setAssets(prev => ({
      ...prev,
      brandPersonality: prev.brandPersonality.includes(personalityId)
        ? prev.brandPersonality.filter(p => p !== personalityId)
        : [...prev.brandPersonality, personalityId]
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <label className="block text-sm font-medium mb-2">推荐词汇（可选）</label>
          <input
            type="text"
            placeholder="用逗号分隔，如：精致,性价比,设计感"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={assets.recommendedWords}
            onChange={(e) => setAssets(prev => ({ ...prev, recommendedWords: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          下一步：设定运营目标
        </button>
      </div>
    </form>
  )
}