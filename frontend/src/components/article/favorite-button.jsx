import cx from 'clsx'

const FavoriteButton = ({ favorited, children }) => {
  return (
    <div
      className={cx(
        'flex justify-center items-center gap-1 px-2 py-1 border rounded-md hover:border-green-500 hover:bg-green-500 hover:text-white hover:cursor-pointer',
        favorited ? 'border-green-500 bg-green-500 text-white' : 'border-gray-400 text-gray-500'
      )}
    >
      {children}
    </div>
  )
}

export default FavoriteButton
