import { useState } from 'react'

// Pagination组件接收三个props，包括总页数、当前页码和页码变化回调函数
function Pagination({ totalPage, page, onChange }) {
  // 保存当前页码的状态
  const [currentPage, setCurrentPage] = useState(page)
  // 点击页码按钮时的回调函数，更新当前页码状态并调用页码变化回调函数
  const handleClick = newPage => {
    setCurrentPage(newPage)
    onChange(newPage)
  }
  // 计算需要显示的页码列表
  const pages = []
  // 如果总页数不超过5页，直接显示所有页码即可
  if (totalPage <= 5) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i)
    }
  } else {
    // 如果总页数超过5页，需要显示前5页和最后1页，
    // 除此之外，还需要通过“...”表示省略的页码
    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...') // 省略号
      pages.push(totalPage)
    } else if (currentPage >= totalPage - 2) {
      pages.push(1)
      pages.push('...') // 省略号
      for (let i = totalPage - 4; i <= totalPage; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...') // 省略号
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i)
      }
      pages.push('...') // 省略号
      pages.push(totalPage)
    }
  }
  // 渲染分页组件
  return (
    <div className='pagination'>
      <button onClick={() => handleClick(1)}>First Page</button>
      {/* 显示计算出来的页码列表 */}
      {pages.map((p, index) => {
        if (p === '...') {
          // 如果是省略号，则直接显示文本
          return <span key={index}>...</span>
        }
        // 否则，显示一个按钮
        return (
          <button
            key={index}
            className={p === currentPage ? 'active' : ''}
            onClick={() => handleClick(p)}
            disabled={p === currentPage}
          >
            {p}
          </button>
        )
      })}
      <button onClick={() => handleClick(totalPage)}>Last Page</button>
    </div>
  )
}
export default Pagination
