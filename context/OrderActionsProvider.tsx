import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react'
import { NestedRecord } from '@/interfaces/common'
import cloneDeep from 'lodash/cloneDeep'
import omit from 'lodash/omit'

interface OrderActionsSettings {
  method: 'POST' | 'PUT'
  endpoint: string
  queryKey: string
  notification?: string
}

interface OrderActionsContextProps {
  settings: OrderActionsSettings
  onOpen: (settings: OrderActionsSettings) => void
  onSubmit: () => void
}

const DEFAULT_ORDER_ACTIONS: OrderActionsContextProps = {
  settings: { method: 'POST', endpoint: '', queryKey: '' },
  onOpen: () => {},
  onSubmit: () => {}
}

export const OrderActionsContext = createContext(DEFAULT_ORDER_ACTIONS)

interface OrderActionsProviderProps extends PropsWithChildren {}

const OrderActionsProvider: FC<OrderActionsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<OrderActionsSettings>(DEFAULT_ORDER_ACTIONS.settings)

  const onOpen = useCallback((settings: OrderActionsSettings) => {
    setSettings(settings)
  }, [])

  const onSubmit = useCallback(() => {
    setSettings(DEFAULT_ORDER_ACTIONS.settings)
  }, [])

  const providerValue = useMemo(
    () => ({
      settings,
      onOpen,
      onSubmit
    }),
    [settings, onOpen, onSubmit]
  )

  return <OrderActionsContext.Provider value={providerValue}>{children}</OrderActionsContext.Provider>
}

export const useOrderActionsContext = () => useContext(OrderActionsContext)

export default OrderActionsProvider
