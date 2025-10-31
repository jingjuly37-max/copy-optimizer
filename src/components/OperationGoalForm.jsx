import { useState } from 'react'

export default function OperationGoalForm({ onSubmit }) {
  const [selectedGoal, setSelectedGoal] = useState('')

  const operationGoals = [
    {
      id: 'new-product',
      title: '🚀 新品造势',
      description: '发布前预热，制造期待感',
      tips: ['悬念式标题', '功能剧透', '征集反馈']
    },
    {
      id: 'brand-exposure',
      title: '💫 品牌曝光', 
      description: '提升品牌知名度和认知度',
      tips: ['品牌故事', '价值观输出', '高流量标签']
    },
    {
      id: 'sales-conversion',
      title: '🛒 销售转化',
      description: '直接促进购买或咨询',
      tips: ['强行动号召', '限时优惠', '信任证明']
    },
    {
      id: 'user-engagement',
      title: '❤️ 用户维系',
      description: '增强老用户粘性和互动', 
      tips: ['专属内容', '深度互动', '情感连接']
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedGoal) {
      alert('请选择运营目标')
      return
    }
    onSubmit(selectedGoal)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {operationGoals.map((goal) => (
          <button
            key={goal.id}
            type="button"
            className={`p-4 border rounded-lg text-left transition-all ${
              selectedGoal === goal.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => setSelectedGoal(goal.id)}
          >
            <div className="font-semibold text-lg">{goal.title}</div>
            <div className="text-gray-600 mt-1">{goal.description}</div>
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

      <div className="flex justify-between">
        <button
          type="button"
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          onClick={() => window.history.back()}
        >
          上一步
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          下一步：内容优化
        </button>
      </div>
    </form>
  )
}