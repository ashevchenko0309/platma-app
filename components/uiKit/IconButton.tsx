import { EventHandler, FC, MouseEvent, PropsWithChildren } from 'react'

interface IconButtonProps extends PropsWithChildren {
  onClick: EventHandler<MouseEvent>
  disabled?: boolean
  sr?: string
}

const IconButton: FC<IconButtonProps> = ({ onClick, disabled, sr, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="text-white bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {children}
      <span className="sr-only">{sr}</span>
    </button>
  )
}

export default IconButton
