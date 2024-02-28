import { useState } from 'react'
import { ArticleList } from '@/components'
import cx from 'clsx'

const MainView = () => {
  const [currentTab, setCurrentTab] = useState('global')
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

      <ArticleList />
    </div>
  )
}

export default MainView
