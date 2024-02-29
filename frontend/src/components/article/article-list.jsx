import { useState } from 'react'
import { ArticlePreview, Pagination } from '@/components'
import { PAGE_SIZE } from '@/constants/config'

const ArticleList = ({ data, queryKey }) => {
  const totalPage = Math.ceil(data?.articlesCount / PAGE_SIZE)
  const handleChangePage = newPage => {
    setPage(newPage)
  }

  return (
    <div className='flex flex-col'>
      {data?.articles?.map(article => (
        <ArticlePreview key={article.slug} article={article} queryKey={queryKey} />
      ))}

      <div className='py-4 w-full flex justify-center items-center'>
        {/* <Pagination totalPage={totalPage} page={page} onChange={handleChangePage} /> */}
      </div>
    </div>
  )
}

export default ArticleList
