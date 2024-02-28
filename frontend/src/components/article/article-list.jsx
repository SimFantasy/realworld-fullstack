import { ArticlePreview } from '@/components'
import { useArticles } from '@/service/queries'

const ArticleList = () => {
  const { data, isLoading } = useArticles()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='py-4 flex flex-col'>
      {data?.articles?.map(article => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
    </div>
  )
}

export default ArticleList
