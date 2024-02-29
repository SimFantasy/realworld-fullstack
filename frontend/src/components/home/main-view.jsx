import { useState } from 'react'
import { ArticleList } from '@/components'
import { useArticles, useFeedArticles } from '@/service/queries'
import { PAGE_SIZE } from '@/constants/config'
import cx from 'clsx'

const MainView = () => {
  const [currentTab, setCurrentTab] = useState('global')
  const [page, setPage] = useState(1)
  const variables = { limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }
  const { data: globalData, isLoading: globalIsLoading } = useArticles({ variables })
  const { data: feedData, isLoading: feedIsLoading } = useFeedArticles()

  if (globalIsLoading || feedIsLoading) {
    return <div>Loading...</div>
  }

  const queryKey = useArticles.getKey({ variables })

  return (
    <div className='w-full'>
      <div className='tabs'>
        <div
          className={cx('tab-item', currentTab === 'feed' && 'active')}
          onClick={() => setCurrentTab('feed')}
        >
          Feed
        </div>
        <div
          className={cx('tab-item', currentTab === 'global' && 'active')}
          onClick={() => setCurrentTab('global')}
        >
          Global
        </div>
      </div>

      {currentTab === 'feed' ? (
        <ArticleList data={feedData} queryKey={queryKey} />
      ) : (
        <ArticleList data={globalData} queryKey={queryKey} />
      )}
    </div>
  )
}

export default MainView
