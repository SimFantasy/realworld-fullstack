import { useParams } from 'react-router-dom'
import { useArticle } from '@/service/queries'

const Article = () => {
  const { slug } = useParams()
  console.log(slug)
  const { data: articleData, isLoading } = useArticle({ variables: { slug } })

  if (isLoading) return <div>loading</div>

  return (
    <div className='flex flex-col'>
      <div className='container flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>{articleData?.article?.title}</h1>
        <div className='text-lg'>{articleData?.article?.body}</div>
      </div>
    </div>
  )
}

export default Article
