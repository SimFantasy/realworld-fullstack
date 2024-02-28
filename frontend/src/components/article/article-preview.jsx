import { Link } from 'react-router-dom'
import { FavoriteButton } from '@/components'
import { RiHeartLine, RiHailFill } from '@remixicon/react'

const ArticlePreview = ({ article }) => {
  console.log('article', article)
  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex justify-between items-center h-10 py-4'>
        <div className='flex justify-start items-center gap-2'>
          <img src={article?.author?.image} className='w-10 h-10 rounded-full' />
          <div className='flex flex-col'>
            <Link
              to={`/profile/${article?.author.username}`}
              className='text-gray-500 font-semibold'
            >
              {article?.author.username}
            </Link>
            <p className='text-gray-400 text-sm'>{article?.createdAt}</p>
          </div>
        </div>
        <FavoriteButton avorited={article?.favorited}>
          {article?.favorited ? <RiHailFill size={18} /> : <RiHeartLine size={18} />}
          {article?.favoritesCount}
        </FavoriteButton>
      </div>
      <div className='flex flex-col'>
        <Link
          to={`/article/${article?.slug}`}
          className='text-gray-800 font-semibold text-2xl line-clamp-2'
        >
          {article.title}
        </Link>
        <p className='text-gray-400 text-left text-lg'>{article?.body}</p>
        <div className='flex justify-between items-center py-2'>
          <Link to={`/article/${article?.slug}`} className='text-green-500'>
            Read more ...
          </Link>
          <div className='flex justify-end items-center gap-2'>
            {article?.tagList?.map(tag => (
              <span
                key={tag}
                className='px-2 py-1/2 bg-gray-200 text-gray-500 text-sm rounded-md hover:bg-gray-300 hover:cursor-pointer'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticlePreview
