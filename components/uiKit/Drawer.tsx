import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

interface DrawerProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
}

const Drawer: FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && <div className="fixed w-full h-full bg-black/40 top-0 left-0" role="presentation" onClick={onClose} />}
      <div
        className={clsx(
          'fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-1/4 dark:bg-gray-800 translate-x-full border-l border-gray-400',
          { 'transform-none': isOpen }
        )}
      >
        {children}
      </div>
    </>
  )
}

export default Drawer
