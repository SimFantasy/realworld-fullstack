import { RiLoader4Line } from '@remixicon/react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center w-6 h-6 text-green-500 animate-spin'>
      <RiLoader4Line size={24} />
    </div>
  )
}

export default Loader
