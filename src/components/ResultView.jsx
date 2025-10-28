import { useState } from 'react'

const ResultView = ({ original, optimized, onReset, onReoptimize }) => {
  const [activeTab, setActiveTab] = useState('split')

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* 标签页 */}
      <div className="border-b">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('split')}
            className={`flex-1 px-6 py-4 font-medium text-center ${
              activeTab === 'split' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📊 对比视图
          </button>
          <button
            onClick={() => setActiveTab('optimized')}
            className={`flex-1 px-6 py-4 font-medium text-center ${
              activeTab === 'optimized' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ✨ 优化结果
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'split' ? (
          <div className="grid md:grid-cols-2 gap-6">
            {/* 原文 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                原始文案
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-48">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {original}
                </p>
              </div>
              <div className="text-sm text-gray-500 mt-3">
                {original.length} 字符 · {original.split(/[。！？.!?]/).filter(s => s.trim()).length} 句
              </div>
            </div>

            {/* 优化后 */}
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                优化版本
              </h3>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 min-h-48">
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {optimized}
                </p>
              </div>
              <div className="text-sm text-green-600 mt-3">
                {optimized.length} 字符 · {optimized.split(/[。！？.!?]/).filter(s => s.trim()).length} 句
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border">
              <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                {optimized}
              </p>
            </div>
            
            {/* 优化说明 */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">✨ 优化亮点</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 增强了品牌声音的一致性</li>
                <li>• 优化了句式结构，提升可读性</li>
                <li>• 适配了目标平台的发布规范</li>
                <li>• 强化了关键信息的表达</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="border-t px-6 py-4 bg-gray-50">
        <div className="flex justify-between">
          <button
            onClick={onReset}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← 返回重新输入
          </button>
          <div className="flex gap-3">
            <button
              onClick={onReoptimize}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              🔄 重新优化
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(optimized)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              复制文案
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultView