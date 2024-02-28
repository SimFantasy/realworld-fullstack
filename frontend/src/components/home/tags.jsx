import { useTags } from '@/service/queries'

const Tags = () => {
  const { data, isLoading, isSuccess } = useTags()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='w-[24vw] bg-gray-200 rounded-md flex flex-col gap-4 px-4 py-4'>
      <div className='flex justify-start items-center text-green-800 font-semibold'>
        Popular Tags
      </div>
      <div className='tags'>
        {isSuccess &&
          data?.tags?.map(tag => (
            <span className='tag-item' key={tag}>
              {tag}
            </span>
          ))}
      </div>
    </div>
  )
}

export default Tags
