import {FC} from "react";
import {NestedRecord} from "@/interfaces/common";
import {useEntityFormContext} from "@/context/EntityFormProvider";
import {useOrderActionsContext} from "@/context/OrderActionsProvider";

interface EditEntityActionProps {
    id: string;
    row: NestedRecord;
    text: string
}

const EditEntityAction: FC<EditEntityActionProps> = ({id, row, text}) => {
    const {onOpen: onOpenForm} = useEntityFormContext()
    const {onOpen: onOpenFormAction} = useOrderActionsContext()
    return (
        <button
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onClick={() => {
                onOpenFormAction({
                    endpoint: '/api/order',
                    queryKey: 'orders',
                    method: 'PUT',
                    notification: 'Order has been updated!'
                })
                onOpenForm(id, row)
            }}
        >
            {text}
        </button>
    )
}

export default EditEntityAction
