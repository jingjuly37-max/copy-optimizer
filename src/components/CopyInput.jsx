import { useState } from 'react'

const CopyInput = ({ originalText, onTextChange, onOptimize, isOptimizing }) => {
  // 品牌基础信息
  const [brandInfo, setBrandInfo] = useState({
    brandName: '',
    productName: ''
  })

  // 品牌背景问卷状态
  const [brandContext, setBrandContext] = useState({
    brandPersona: '',
    userJob: '',
    customJobLabel: '',
    contentGoal: '',
    customPersona: ''
  })

  // 基础设置状态（移到第二步）
  const [settings, setSettings] = useState({
    tone: 'professional',
    platform: '微信公众号'
  })

  // 问卷步骤状态
  const [currentStep, setCurrentStep] = useState(1) // 1: 品牌信息, 2: 优化设置, 3: 品牌问卷

  const toneOptions = [
    { value: 'professional', label: '专业严谨', icon: '💼' },
    { value: 'casual', label: '轻松亲切', icon: '😊' },
    { value: 'persuasive', label: '说服力强', icon: '🎯' },
    { value: 'storytelling', label: '故事叙述', icon: '📖' }
  ]

  const platformOptions = ['微信公众号', '小红书', '微博', '知乎', '抖音']

  // 品牌人格选项
  const brandPersonaOptions = [
    { value: 'professional_expert', label: '专业专家', description: '权威可靠，用数据和事实说话', icon: '🔬' },
    { value: 'close_friend', label: '知心好友', description: '温暖贴心，像朋友一样陪伴', icon: '🤗' },
    { value: 'trend_setter', label: '潮流先锋', description: '时尚前沿，引领流行趋势', icon: '🔥' },
    { value: 'life_artist', label: '生活艺术家', description: '美学至上，注重生活质感', icon: '🎨' },
    { value: 'other', label: '其他独特个性', description: '我的品牌有独特的个性', icon: '💫' }
  ]

  // 用户任务选项
  const userJobOptions = [
    { value: 'solve_pain_point', label: '解决明确痛点', description: '用户有具体问题需要解决', icon: '🎯' },
    { value: 'achieve_aspiration', label: '完成向往目标', description: '用户希望实现某个理想状态', icon: '⭐' },
    { value: 'avoid_anxiety', label: '避免潜在焦虑', description: '用户希望规避某些风险', icon: '🛡️' },
    { value: 'other', label: '其他独特任务', description: '用户有更独特的使用场景', icon: '🔮' }
  ]

  // 自定义任务标签选项
  const customJobLabels = [
    '彰显个性与态度',
    '营造仪式感', 
    '寄托情感与记忆',
    '探索与发现乐趣',
    '提升生活效率',
    '其他'
  ]

  // 内容目标选项
  const contentGoalOptions = [
    { value: 'first_impression', label: '初次认识', description: '让用户记住品牌是谁', icon: '👋' },
    { value: 'deep_seeding', label: '深度种草', description: '让用户对产品产生渴望', icon: '🌱' },
    { value: 'immediate_action', label: '立即行动', description: '促使用户立即下单或咨询', icon: '⚡' },
    { value: 'emotional_connection', label: '激发共鸣', description: '建立情感连接和价值观认同', icon: '💝' }
  ]

  const handleBrandInfoChange = (key, value) => {
    setBrandInfo(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleBrandContextChange = (key, value) => {
    setBrandContext(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleNextStep = () => {
    if (currentStep === 1 && (!brandInfo.brandName.trim() || !originalText.trim())) {
      alert('请填写品牌名称并输入文案内容')
      return
    }
    if (currentStep === 2 && (!settings.tone || !settings.platform)) {
      alert('请选择语调风格和发布平台')
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleOptimizeClick = () => {
    // 验证品牌问卷是否完成
    if (!brandContext.brandPersona || !brandContext.userJob || !brandContext.contentGoal) {
      alert('请完成品牌背景问卷')
      return
    }
    
    // 如果用户选择了"其他"但没填自定义内容，提示
    if (brandContext.brandPersona === 'other' && !brandContext.customPersona.trim()) {
      alert('请描述您的品牌独特个性')
      return
    }
    
    if (brandContext.userJob === 'other' && !brandContext.customJobLabel) {
      alert('请选择或描述用户的独特任务')
      return
    }

    // 合并所有信息
    const fullBrandContext = {
      ...brandContext,
      brandName: brandInfo.brandName,
      productName: brandInfo.productName
    }

    onOptimize(settings, fullBrandContext)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return brandInfo.brandName.trim().length > 0 && originalText.trim().length > 0
      case 2:
        return settings.tone && settings.platform
      case 3:
        return brandContext.brandPersona && brandContext.userJob && brandContext.contentGoal
      default:
        return true
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* 步骤指示器 */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-1 mx-2 ${
                  currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 步骤标题 */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentStep === 1 ? '品牌与文案' : 
           currentStep === 2 ? '优化设置' : 
           '品牌背景问卷'}
        </h2>
        <p className="text-gray-600 mt-2">
          {currentStep === 1 ? '告诉我们您是谁，以及要优化什么' : 
           currentStep === 2 ? '选择文案的语调风格和发布平台' : 
           '深入了解品牌个性，让优化更精准'}
        </p>
      </div>

      {/* 步骤1: 品牌信息与文案输入 */}
      {currentStep === 1 && (
        <div className="space-y-8">
          {/* 品牌名称 */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">🏷️</span>
              品牌名称
              <span className="ml-2 text-sm text-gray-500 font-normal">您的品牌或公司名称</span>
            </label>
            <input
              type="text"
              value={brandInfo.brandName}
              onChange={(e) => handleBrandInfoChange('brandName', e.target.value)}
              placeholder="例如：自然生活馆、科技先锋..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* 产品名称（可选） */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">📦</span>
              产品名称（可选）
              <span className="ml-2 text-sm text-gray-500 font-normal">具体产品或服务名称</span>
            </label>
            <input
              type="text"
              value={brandInfo.productName}
              onChange={(e) => handleBrandInfoChange('productName', e.target.value)}
              placeholder="例如：星空香薰蜡烛、智能咖啡机..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* 文案输入 */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">📝</span>
              待优化文案
              <span className="ml-2 text-sm text-gray-500 font-normal">输入需要优化的原始内容</span>
            </label>
            <div className="relative">
              <textarea
                value={originalText}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder="例如：我们的新产品采用环保材料，设计优雅，适合日常使用..."
                className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
              <div className="absolute bottom-3 right-3 flex gap-4 text-sm">
                <span className={`px-2 py-1 rounded ${originalText.length > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                  {originalText.length} 字符
                </span>
                <span className={`px-2 py-1 rounded ${originalText.split(/[。！？.!?]/).filter(s => s.trim()).length > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {originalText.split(/[。！？.!?]/).filter(s => s.trim()).length} 句
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 步骤2: 优化设置 */}
      {currentStep === 2 && (
        <div className="space-y-8">
          {/* 平台选择 */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">🌐</span>
              发布平台
              <span className="ml-2 text-sm text-gray-500 font-normal">选择内容发布渠道</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {platformOptions.map(platform => (
                <button
                  key={platform}
                  onClick={() => setSettings({...settings, platform})}
                  className={`px-4 py-3 rounded-lg border transition-all font-medium ${
                    settings.platform === platform 
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* 语调选择 */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">🎭</span>
              语调风格
              <span className="ml-2 text-sm text-gray-500 font-normal">设定文案的情感基调</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {toneOptions.map(tone => (
                <button
                  key={tone.value}
                  onClick={() => setSettings({...settings, tone: tone.value})}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    settings.tone === tone.value 
                      ? 'border-purple-500 bg-purple-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  <div className="text-2xl mb-2">{tone.icon}</div>
                  <div className="font-semibold text-gray-800">{tone.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 步骤3: 品牌背景问卷 - 保持原有代码不变 */}
      {currentStep === 3 && (
        <div className="space-y-8">
          {/* 品牌人格 */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              <span className="text-2xl mr-2">👤</span>
              品牌人格
              <span className="ml-2 text-sm text-gray-500 font-normal">您的品牌像什么样的人？</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {brandPersonaOptions.map(persona => (
                <div
                  key={persona.value}
                  onClick={() => handleBrandContextChange('brandPersona', persona.value)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    brandContext.brandPersona === persona.value 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="text-2xl mr-3">{persona.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-800">{persona.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{persona.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 自定义品牌人格输入 */}
            {brandContext.brandPersona === 'other' && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <label className="block text-sm font-medium text-yellow-800 mb-2">
                  请描述您的品牌独特个性（1-2个词）
                </label>
                <input
                  type="text"
                  value={brandContext.customPersona}
                  onChange={(e) => handleBrandContextChange('customPersona', e.target.value)}
                  placeholder="例如：温柔的守护者、叛逆的创新者..."
                  className="w-full p-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            )}
          </div>

          {/* 用户任务 */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              <span className="text-2xl mr-2">🎯</span>
              用户任务
              <span className="ml-2 text-sm text-gray-500 font-normal">用户为什么需要您的产品？</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userJobOptions.map(job => (
                <div
                  key={job.value}
                  onClick={() => handleBrandContextChange('userJob', job.value)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    brandContext.userJob === job.value 
                      ? 'border-green-500 bg-green-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-25'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="text-2xl mr-3">{job.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-800">{job.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{job.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 自定义任务标签选择 */}
            {brandContext.userJob === 'other' && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <label className="block text-sm font-medium text-green-800 mb-2">
                  请选择最符合的用户任务类型
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {customJobLabels.map(label => (
                    <button
                      key={label}
                      onClick={() => handleBrandContextChange('customJobLabel', label)}
                      className={`p-2 rounded-lg border transition-all text-sm ${
                        brandContext.customJobLabel === label 
                          ? 'bg-green-500 text-white border-green-500' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 内容目标 */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              <span className="text-2xl mr-2">🎯</span>
              内容目标
              <span className="ml-2 text-sm text-gray-500 font-normal">您希望文案达成什么效果？</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contentGoalOptions.map(goal => (
                <div
                  key={goal.value}
                  onClick={() => handleBrandContextChange('contentGoal', goal.value)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    brandContext.contentGoal === goal.value 
                      ? 'border-purple-500 bg-purple-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="text-2xl mr-3">{goal.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-800">{goal.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{goal.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 导航按钮 */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        {currentStep > 1 ? (
          <button
            onClick={handlePrevStep}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            ← 上一步
          </button>
        ) : (
          <div></div> // 占位
        )}

        {currentStep < 3 ? (
          <button
            onClick={handleNextStep}
            disabled={!isStepValid()}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一步 →
          </button>
        ) : (
          <button
            onClick={handleOptimizeClick}
            disabled={!isStepValid() || isOptimizing}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isOptimizing ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">⏳</span>
                优化中...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <span className="text-xl mr-2">✨</span>
                开始优化文案
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default CopyInput