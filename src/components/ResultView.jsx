import { useState } from 'react'

export default function ResultView({ results, isLoading, error, onReset }) {
  const [activeTab, setActiveTab] = useState('optimizedContent')

  if (isLoading) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-6">🎯 生成运营传播包</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 诊断报告骨架屏 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">诊断报告</h3>
            <div className="space-y-4">
              {['标题吸引力', '内容结构', '互动潜力'].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-full"></div>
                </div>
              ))}
              <div className="pt-3 border-t">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-6 bg-gray-100 rounded w-12"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 优化文案骨架屏 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">优化文案</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded"></div>
                    <div className="h-3 bg-gray-100 rounded"></div>
                    <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 运营建议骨架屏 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">运营建议</h3>
            <div className="animate-pulse">
              <div className="bg-gray-100 rounded-xl p-4 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-lg mb-2">优化失败</div>
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            重新开始
          </button>
        </div>
      </div>
    )
  }

  if (!results) return null

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">🎯 运营指挥面板</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
        >
          重新优化
        </button>
      </div>

      {/* 标签导航 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'optimizedContent', label: '📝 优化文案', emoji: '📝' },
            { id: 'publishingGuide', label: '🕒 发布指南', emoji: '🕒' },
            { id: 'contentMatrix', label: '🔗 内容矩阵', emoji: '🔗' },
            { id: 'interactionPlan', label: '💬 互动预案', emoji: '💬' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 内容区域 */}
      <div className="min-h-96">
        {/* 优化文案标签 */}
        {activeTab === 'optimizedContent' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 诊断报告 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  内容诊断报告
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-medium text-green-600 flex items-center">
                      <span className="mr-2">✅</span>
                      标题吸引力
                    </div>
                    <div className="text-gray-600 mt-1 ml-6">{results.report?.titleScore || '评估中...'}</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-600 flex items-center">
                      <span className="mr-2">📋</span>
                      内容结构
                    </div>
                    <div className="text-gray-600 mt-1 ml-6">{results.report?.structureScore || '评估中...'}</div>
                  </div>
                  <div>
                    <div className="font-medium text-purple-600 flex items-center">
                      <span className="mr-2">💬</span>
                      互动潜力
                    </div>
                    <div className="text-gray-600 mt-1 ml-6">{results.report?.engagementScore || '评估中...'}</div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="font-medium mb-2">推荐标签</div>
                    <div className="flex flex-wrap gap-2">
                      {results.tags?.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200"
                        >
                          #{tag}
                        </span>
                      )) || []}
                    </div>
                  </div>
                </div>
              </div>

              {/* 小红书预览 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4 flex items-center">
                  <span className="mr-2">📱</span>
                  小红书预览
                </h3>
                <div className="border-2 border-gray-300 rounded-xl p-4 bg-white shadow-lg">
                  <div className="text-center text-xs text-gray-500 mb-3 border-b pb-2">小红书笔记</div>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed mb-4 max-h-60 overflow-y-auto">
                    {results.versions?.[0] || '暂无内容'}
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-around text-xs text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-red-500">
                        <span>❤️</span>
                        <span>点赞</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-yellow-500">
                        <span>⭐</span>
                        <span>收藏</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500">
                        <span>💬</span>
                        <span>评论</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-500">
                        <span>↗️</span>
                        <span>分享</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 优化文案版本 */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <span className="mr-2">✨</span>
                优化文案版本（3个不同风格）
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.versions?.map((version, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border">
                        版本 {index + 1}
                      </span>
                      <button
                        onClick={() => navigator.clipboard.writeText(version)}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <span className="mr-1">📋</span>
                        复制
                      </button>
                    </div>
                    <div className="text-sm whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                      {version}
                    </div>
                  </div>
                )) || []}
              </div>
            </div>
          </div>
        )}

        {/* 发布指南标签 */}
        {activeTab === 'publishingGuide' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <span className="mr-2">🕒</span>
                最佳发布时间
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-800">⏰ 推荐时段</div>
                  <div className="text-sm text-green-700 mt-1">
                    {results.publishingGuide?.bestTime || '晚上 19:00-21:00 (用户活跃高峰期)'}
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-medium text-blue-800">📈 发布频率</div>
                  <div className="text-sm text-blue-700 mt-1">
                    {results.publishingGuide?.frequency || '建议每周3-5篇，保持账号活跃度'}
                  </div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="font-medium text-purple-800">🎯 时段分析</div>
                  <div className="text-sm text-purple-700 mt-1">
                    {results.publishingGuide?.timeAnalysis || '工作日晚上互动率较高，周末下午曝光更好'}
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <span className="mr-2">🏷️</span>
                标签策略
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-sm mb-2">🔥 高流量标签</div>
                  <div className="flex flex-wrap gap-2">
                    {results.tags?.slice(0, 5).map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full border border-red-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm mb-2">🎯 精准标签</div>
                  <div className="flex flex-wrap gap-2">
                    {results.tags?.slice(5, 10).map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-xs text-yellow-800">
                    💡 使用建议：前3个位置放高流量标签，中间放精准标签，最后放品牌相关标签
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 内容矩阵标签 */}
        {activeTab === 'contentMatrix' && (
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4 flex items-center">
              <span className="mr-2">🔗</span>
              内容矩阵建议
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.contentMatrix?.map((topic, index) => (
                <div key={index} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                  <div className="font-medium text-sm mb-2 flex items-center">
                    <span className="mr-2">
                      {index === 0 ? '➡️' : index === 1 ? '⏭️' : '🔜'}
                    </span>
                    {topic.title || `关联选题 ${index + 1}`}
                  </div>
                  <div className="text-xs text-gray-600 mb-3">
                    {topic.description || '基于当前内容的延伸选题建议'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {topic.tags?.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )) || Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="p-4 border rounded-lg bg-white">
                  <div className="font-medium text-sm mb-2">关联选题 {index + 1}</div>
                  <div className="text-xs text-gray-600">内容矩阵建议加载中...</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                💡 运营提示：按照这个选题顺序发布，可以形成内容系列，提高用户粘性和账号权重
              </div>
            </div>
          </div>
        )}

        {/* 互动预案标签 */}
        {activeTab === 'interactionPlan' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <span className="mr-2">💬</span>
                评论区互动预案
              </h3>
              <div className="space-y-4">
                {results.interactionPlan?.map((qa, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-white">
                    <div className="font-medium text-sm text-gray-700 mb-2 flex items-center">
                      <span className="mr-2">👤</span>
                      用户可能问："{qa.question || '常见问题'}"
                    </div>
                    <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded border">
                      <span className="font-medium">💡 回复建议：</span>
                      {qa.answer || '标准回复模板'}
                    </div>
                  </div>
                )) || Array.from({ length: 3 }, (_, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-white">
                    <div className="font-medium text-sm text-gray-700 mb-2">用户常见问题 {index + 1}</div>
                    <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded border">回复建议加载中...</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <span className="mr-2">📊</span>
                互动策略
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-800">🎯 主动引导</div>
                  <div className="text-sm text-green-700 mt-1">
                    {results.interactionStrategy?.guide || '在文案结尾提出问题，引导用户评论区互动'}
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-medium text-blue-800">⏰ 回复时机</div>
                  <div className="text-sm text-blue-700 mt-1">
                    {results.interactionStrategy?.timing || '发布后1小时内回复前10条评论，提升互动率'}
                  </div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="font-medium text-purple-800">💝 价值提供</div>
                  <div className="text-sm text-purple-700 mt-1">
                    {results.interactionStrategy?.value || '在回复中提供额外价值，如使用技巧、优惠信息等'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部操作 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            基于您的品牌资产和运营目标生成的专属传播包
          </div>
          <button
            onClick={onReset}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            🎯 开始新的优化
          </button>
        </div>
      </div>
    </div>
  )
}