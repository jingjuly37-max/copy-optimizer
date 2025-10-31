import { useState } from 'react'

export default function OperationGoalForm({ onSubmit, onBack }) {
  const [selectedGoals, setSelectedGoals] = useState({
    primary: '',
    secondary: '',
    weight: 80
  })
  const [trustType, setTrustType] = useState('')
  const [targetAudienceNew, setTargetAudienceNew] = useState('')

  const operationGoals = [
    {
      id: 'new-product',
      title: '🚀 新品造势',
      description: '发布前预热，制造期待感',
      tips: ['悬念式标题', '功能剧透', '征集反馈'],
      kpi: '核心指标：互动率、预告页收藏'
    },
    {
      id: 'brand-exposure',
      title: '💫 品牌曝光', 
      description: '提升品牌知名度和认知度',
      tips: ['品牌故事', '价值观输出', '高流量标签'],
      kpi: '核心指标：阅读量、分享率'
    },
    {
      id: 'sales-conversion',
      title: '🛒 销售转化',
      description: '直接促进购买或咨询', 
      tips: ['强行动号召', '限时优惠', '信任证明'],
      kpi: '核心指标：点击率、转化率'
    },
    {
      id: 'user-engagement',
      title: '❤️ 用户维系',
      description: '增强老用户粘性和互动',
      tips: ['专属内容', '深度互动', '情感连接'],
      kpi: '核心指标：评论率、复访率'
    }
  ]

  const trustTypes = [
    { id: 'authority', label: '权威背书', description: '如获奖、专家推荐' },
    { id: 'testimonial', label: '用户证言', description: '素人测评、真实反馈' },
    { id: 'data', label: '数据报告', description: '如99%满意度、实验数据' },
    { id: 'media', label: '媒体评测', description: '媒体报道、专业评测' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedGoals.primary) {
      alert('请选择主要运营目标')
      return
    }

    const goalData = {
      ...selectedGoals,
      trustType: selectedGoals.primary === 'sales-conversion' || selectedGoals.secondary === 'sales-conversion' ? trustType : '',
      targetAudienceNew: selectedGoals.primary === 'brand-exposure' || selectedGoals.secondary === 'brand-exposure' ? targetAudienceNew : ''
    }

    onSubmit(goalData)
  }

  const handleGoalSelect = (goalId) => {
    setSelectedGoals(prev => {
      if (!prev.primary) {
        return { ...prev, primary: goalId }
      } else if (!prev.secondary && goalId !== prev.primary) {
        return { ...prev, secondary: goalId }
      } else if (prev.primary === goalId) {
        return { ...prev, primary: prev.secondary, secondary: '' }
      } else if (prev.secondary === goalId) {
        return { ...prev, secondary: '' }
      }
      return prev
    })
  }

  const getGoalLabel = (goalId) => {
    if (selectedGoals.primary === goalId) return '主要目标'
    if (selectedGoals.secondary === goalId) return '次要目标'
    return ''
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 运营目标选择 */}
      <div>
        <label className="block text-sm font-medium mb-4">
          选择运营目标 {selectedGoals.secondary && `（最多选择2个）`}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {operationGoals.map((goal) => (
            <button
              key={goal.id}
              type="button"
              className={`p-4 border rounded-lg text-left transition-all relative ${
                selectedGoals.primary === goal.id || selectedGoals.secondary === goal.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => handleGoalSelect(goal.id)}
            >
              {/* 目标标签 */}
              {(selectedGoals.primary === goal.id || selectedGoals.secondary === goal.id) && (
                <div className={`absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full ${
                  selectedGoals.primary === goal.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-200 text-blue-800'
                }`}>
                  {getGoalLabel(goal.id)}
                </div>
              )}
              
              <div className="font-semibold text-lg">{goal.title}</div>
              <div className="text-gray-600 mt-1">{goal.description}</div>
              <div className="text-xs text-blue-600 mt-1">{goal.kpi}</div>
              <div className="mt-2">
                {goal.tips.map((tip, index) => (
                  <span key={index} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mr-1 mb-1">
                    {tip}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 目标权重设置 - 仅在选择了两个目标时显示 */}
      {selectedGoals.primary && selectedGoals.secondary && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium mb-3">
            目标权重分配
          </label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {operationGoals.find(g => g.id === selectedGoals.primary)?.title}
              </span>
              <span className="text-blue-600 font-semibold">{selectedGoals.weight}%</span>
            </div>
            
            <input 
              type="range" 
              min="50" 
              max="90" 
              step="10"
              value={selectedGoals.weight}
              onChange={(e) => setSelectedGoals(prev => ({
                ...prev, 
                weight: parseInt(e.target.value)
              }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {operationGoals.find(g => g.id === selectedGoals.secondary)?.title}
              </span>
              <span className="text-gray-600 font-semibold">{100 - selectedGoals.weight}%</span>
            </div>
            
            <p className="text-xs text-gray-500 mt-2">
              AI将按照此权重分配优化重点，避免目标冲突导致文案平庸
            </p>
          </div>
        </div>
      )}

      {/* 信任证明类型 - 仅在选择了销售转化时显示 */}
      {(selectedGoals.primary === 'sales-conversion' || selectedGoals.secondary === 'sales-conversion') && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium mb-3">信任证明类型</label>
          <p className="text-xs text-gray-500 mb-3">选择最能建立用户信任的方式</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trustTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                className={`p-3 border rounded-lg text-center transition-colors ${
                  trustType === type.id
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setTrustType(type.id)}
              >
                <div className="font-medium text-sm">{type.label}</div>
                <div className="text-xs text-gray-500 mt-1">{type.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 期望触达人群 - 仅在选择了品牌曝光时显示 */}
      {(selectedGoals.primary === 'brand-exposure' || selectedGoals.secondary === 'brand-exposure') && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium mb-2">期望触达的新用户人群</label>
          <input 
            type="text" 
            placeholder="如：大学生、健身爱好者、新手妈妈、职场新人..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={targetAudienceNew}
            onChange={(e) => setTargetAudienceNew(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-2">
            指导AI在生成标签时，除了通用大流量标签外，还要加入垂直小众标签，提高曝光效率
          </p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          type="button"
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={onBack}
        >
          上一步
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          disabled={!selectedGoals.primary}
        >
          下一步：内容优化
        </button>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </form>
  )
}