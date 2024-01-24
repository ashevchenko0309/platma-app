import {useEntityFormContext} from "@/context/EntityFormProvider";
import {useOrderActionsContext} from "@/context/OrderActionsProvider";
import Drawer from "@/components/uiKit/Drawer";
import EntityForm from "@/components/EntityForm";
import {toast} from "react-toastify";

export const FormDrawer = () => {
    const { id, onClose } = useEntityFormContext()
    const { settings } = useOrderActionsContext()
    return (
        <Drawer isOpen={Boolean(id)} onClose={onClose}>
            <EntityForm
                {...settings}
                onSubmit={() => {
                    toast(settings.notification ?? 'Success')
                    onClose()
                }}
            />
        </Drawer>
    )
}
