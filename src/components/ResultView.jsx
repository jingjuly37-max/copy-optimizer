export default function ResultView({ results, isLoading, error, onReset }) {
  if (isLoading) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-6">优化结果</h2>
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

          {/* 小红书预览骨架屏 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">小红书预览</h3>
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
        <h2 className="text-xl font-semibold">优化结果</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
        >
          重新优化
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 诊断报告 */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">诊断报告</h3>
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
                <span className="mr-2">📊</span>
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

        {/* 优化文案 */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">优化文案版本</h3>
          <div className="space-y-4">
            {results.versions?.map((version, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded">
                    版本 {index + 1}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(version)}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    复制
                  </button>
                </div>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {version}
                </div>
              </div>
            )) || []}
          </div>
        </div>

        {/* 小红书预览 */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">小红书预览</h3>
          <div className="border-2 border-gray-300 rounded-xl p-4 bg-white max-w-xs mx-auto shadow-lg">
            <div className="text-center text-xs text-gray-500 mb-3 border-b pb-2">小红书笔记</div>
            <div className="text-sm whitespace-pre-wrap leading-relaxed mb-4">
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
          
          {/* 发布建议 */}
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="text-sm font-medium text-orange-800 mb-1">发布建议</div>
            <div className="text-xs text-orange-700">
              • 最佳发布时间：晚上 19:00-21:00<br/>
              • 建议添加相关话题标签提升曝光
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}