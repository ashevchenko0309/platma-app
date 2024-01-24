"use client"
import {useQuery} from "@tanstack/react-query";
import {useMemo} from "react";
import {CellContext, ColumnDef} from "@tanstack/react-table";
import {NestedRecord} from "@/interfaces/common";
import EntityFormProvider from "@/context/EntityFormProvider";
import Table from "@/components/Table";
import OrderActionsProvider from "@/context/OrderActionsProvider";
import {orderFormSchema, orderSchema} from "@/schemas/order.schema";
import {formattedCurrency} from "@/formatters/currency";
import EditEntityAction from "@/modules/Orders/components/EditEntityAction";
import CreateOrderButton from "@/modules/Orders/components/CreateOrderButton";
import {FormDrawer} from "@/modules/Orders/components/FormDrawer";

const Orders = () => {
    const { data, isLoading } = useQuery({ queryKey: ['orders'], queryFn: () => fetch('/api/order').then((d) => d.json()) })

    const columns = useMemo<ColumnDef<NestedRecord>[]>(() => {
        return [
            ...Object.keys(orderSchema.properties.orders.items.properties).map((key) => ({
                accessorKey: key,
                cell: (props: CellContext<NestedRecord, unknown>) => {
                    const hasToBeFormatted = Object.hasOwn((orderSchema.properties.orders.items.properties as NestedRecord)[key] as NestedRecord, 'format')
                    if (hasToBeFormatted) {
                        return formattedCurrency.format(Number(props.getValue()))
                    }

                    return props.getValue()
                }
            })),
            {
                id: 'edit',
                header: 'Actions',
                cell: (props) => <EditEntityAction id={String(props.getValue())} row={props.row.original} text="Edit" />
            }
        ]
    }, [])

    if (isLoading) {
        return 'Loading....'
    }

    return (
        <OrderActionsProvider>
            <EntityFormProvider schema={orderFormSchema}>
                <CreateOrderButton />
                <Table {...{ data, columns }} />
                <FormDrawer />
            </EntityFormProvider>
        </OrderActionsProvider>
    )
}

export default Orders
