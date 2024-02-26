import { Banner, Tags, MainView } from '@/components'

const Home = () => {
  return (
    <div className='w-srceen flex flex-col'>
      <Banner />
      <div className='container mx-auto flex justify-between items-start'>
        <MainView />
        <Tags />
      </div>
    </div>
  )
}

export default Home
