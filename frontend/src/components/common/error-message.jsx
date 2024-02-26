import { RiCloseCircleFill } from '@remixicon/react'

const ErrorMessage = ({ errorMsg }) => {
  return (
    <div className='w-full px-2 py-3 rounded-md bg-red-200 border border-red-400 text-red-500 text-sm flex justify-start items-center gap-2'>
      <RiCloseCircleFill size={16} />
      <span>{errorMsg}</span>
    </div>
  )
}

export default ErrorMessage
