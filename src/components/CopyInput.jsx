import { useState } from 'react'

export default function CopyInput({ onSubmit }) {
  const [text, setText] = useState('')
  const [charCount, setCharCount] = useState(0)

  const handleTextChange = (e) => {
    const newText = e.target.value
    setText(newText)
    setCharCount(newText.length)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) {
      alert('请输入需要优化的文案内容')
      return
    }
    if (charCount < 10) {
      alert('文案内容过短，请至少输入10个字符')
      return
    }
    onSubmit(text)
  }

  const handlePasteAI = () => {
    setText(prev => prev + '\n\n【这是一段AI生成的初稿，需要深度优化以消除机器感，增加真人体验和情感共鸣】')
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">待优化内容</label>
          <div className="text-sm text-gray-500">
            <span className={charCount > 800 ? 'text-orange-500' : ''}>
              {charCount} 字符
            </span>
            <span className="ml-2 text-blue-500">
              {charCount < 500 ? '建议补充内容' : charCount > 800 ? '内容偏长' : '长度合适'}
            </span>
          </div>
        </div>
        
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="请输入需要优化的小红书笔记内容...&#10;例如：我们的新产品采用环保材料，设计优雅，适合日常使用..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-gray-500">
            小红书正文建议500-800字体验最佳
          </div>
          <button
            type="button"
            onClick={handlePasteAI}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <span className="mr-1">🔍</span>
            粘贴AI初稿时点击此处
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">优化说明</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 基于您设置的品牌资产和运营目标进行深度优化</li>
          <li>• 生成3个不同风格的优化版本供您选择</li>
          <li>• 提供详细的内容诊断和发布建议</li>
        </ul>
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
          onClick={handleSubmit}
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium"
        >
          🚀 开始优化
        </button>
      </div>
    </div>
  )
}