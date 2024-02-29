import { useQueryClient } from '@tanstack/react-query'
import { useFavorite, useUnFavorite } from '@/service/mutations'
import cx from 'clsx'

const FavoriteButton = ({ favorited, queryKey, slug, children }) => {
  const queryClient = useQueryClient()
  const { mutate: favorite, isLoading: isFavoriting } = useFavorite()
  const { mutate: unfavorite, isLoading: isUnfavoriting } = useUnFavorite()

  const handleFavorite = async () => {
    if (favorited) {
      unfavorite(
        { slug },
        {
          onSuccess: data => {
            queryClient.invalidateQueries(queryKey)
          }
        }
      )
    } else {
      favorite(
        { slug },
        {
          onSuccess: data => {
            queryClient.invalidateQueries(queryKey)
          }
        }
      )
    }
  }

  return (
    <div
      className={cx(
        'flex justify-center items-center gap-1 px-2 py-1 border rounded-md hover:border-green-500 hover:bg-green-500 hover:text-white hover:cursor-pointer',
        {
          'border-green-500 bg-green-500 text-white': favorited,
          'border-gray-400 text-gray-500': !favorited
        }
      )}
      onClick={handleFavorite}
      disabled={isFavoriting || isUnfavoriting}
    >
      {children}
    </div>
  )
}

export default FavoriteButton
