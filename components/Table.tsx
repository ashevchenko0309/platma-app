import {
    ColumnDef, flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import IconButton from "@/components/uiKit/IconButton";
import ArrowIcon from "@/components/icons/ArrowIcon";
import {FC} from "react";

interface TableProps { data: any[]; columns: ColumnDef<any>[] }

const Table: FC<TableProps> =({ data, columns }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <th className="capitalize px-6 py-3" scope="col" key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>}
                                </th>
                            )
                        })}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => {
                    return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className="flex justify-between items-center gap-2 mt-2">
                <IconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} sr="Previous pagination button">
                    <ArrowIcon className="w-5 h-5 rotate-180" />
                </IconButton>
                <div className="mx-auto">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>
                </div>
                <IconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} sr="Previous pagination button">
                    <ArrowIcon className="w-5 h-5" />
                </IconButton>
            </div>
        </div>
    )
}

export default Table
