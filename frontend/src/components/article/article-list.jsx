import { useState } from 'react'
import { ArticlePreview, Pagination } from '@/components'
import { useArticles } from '@/service/queries'
import { PAGE_SIZE } from '@/constants/config'

const ArticleList = () => {
  const { data, isLoading } = useArticles()
  const [page, setPage] = useState(1)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col'>
      {data?.articles?.map(article => (
        <ArticlePreview key={article.slug} article={article} />
      ))}

      <div className='py-4 w-full flex justify-center items-center'>
        <Pagination totalPage={data?.articlesCount} page={page} onChange={setPage} />
      </div>
    </div>
  )
}

export default ArticleList
