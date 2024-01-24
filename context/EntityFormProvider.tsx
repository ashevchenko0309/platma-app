import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react'
import { NestedRecord } from '@/interfaces/common'
import cloneDeep from 'lodash/cloneDeep'
import omit from 'lodash/omit'

interface EntityFormContextProps {
  id: string | null
  formSchema: NestedRecord
  onOpen: (id: string, values: NestedRecord) => void
  onClose: () => void
}

export const EntityFormContext = createContext({} as EntityFormContextProps)

interface EntityFormProviderProps extends PropsWithChildren {
  schema: NestedRecord
}

const EntityFormProvider: FC<EntityFormProviderProps> = ({ children, schema }) => {
  const [entityId, setEntityId] = useState<string | null>(null)
  const [formSchema, setFormSchema] = useState<NestedRecord>({})

  const onOpen = useCallback(
    (id: string, values: NestedRecord) => {
      setEntityId(id)
      const draftSchema = cloneDeep(schema)

      for (const key in values) {
        ;(draftSchema.properties as NestedRecord)[key] = {
          ...((draftSchema.properties as NestedRecord)[key] as NestedRecord),
          default: values[key]
        }
      }

      draftSchema.properties = omit(draftSchema.properties as NestedRecord, 'id')

      setFormSchema(draftSchema)
    },
    [schema]
  )

  const onClose = useCallback(() => {
    setEntityId(null)
    setFormSchema({})
  }, [])

  const providerValue = useMemo(
    () => ({
      id: entityId,
      formSchema,
      onOpen,
      onClose
    }),
    [formSchema, onOpen, entityId, onClose]
  )

  return <EntityFormContext.Provider value={providerValue}>{children}</EntityFormContext.Provider>
}

export const useEntityFormContext = () => useContext(EntityFormContext)

export default EntityFormProvider
