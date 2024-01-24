import validator from '@rjsf/validator-ajv8'
import Form from '@rjsf/core'
import { useEntityFormContext } from '@/context/EntityFormProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'

interface EntityFormProps {
  endpoint: string
  method: 'PUT' | 'POST'
  queryKey: string
  onSubmit?: () => void
}

const EntityForm: FC<EntityFormProps> = ({ endpoint, method, queryKey, onSubmit }) => {
  const queryClient = useQueryClient()
  const { id, formSchema } = useEntityFormContext()
  const mutation = useMutation({
    mutationFn: (product: string) => fetch(endpoint, { method: method, body: product, headers: { 'Content-Type': 'application/json' } }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
      onSubmit?.()
    }
  })

  return (
    <Form
      className="form-container"
      schema={formSchema}
      validator={validator}
      onSubmit={({ formData }) => {
        mutation.mutate(JSON.stringify({ id, ...formData }))
      }}
    />
  )
}

export default EntityForm
