import { textFilter } from "react-bootstrap-table2-filter";


export const singleChangeControlPatchesColumns = [
    {
        dataField: 'patch_version',
        text: 'Patch',
        headerAlign: 'center',
        sort: true,
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px" }
        }),
        headerStyle: {
            fontSize: '12px',
            width: '150px'
        },
        style: {
            fontSize: '12px'
        }
    },
    {
        dataField: 'source',
        text: 'Source',
        headerAlign: 'center',
        sort: true,
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px" }
        }),
        headerStyle: {
            fontSize: '12px',
            width: '150px'
        },
        style: {
            fontSize: '12px'
        }
    },
    {
        dataField: 'date_reviewed',
        text: 'Date Reviewed',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px" }
        }),
        headerStyle: {
            fontSize: '12px',
            width: '150px'
        },
        style: {
            fontSize: '12px'
        },
        formatter: (cell, row) => formatDate(cell)
    },
    {
        dataField: 'date_installed',
        text: 'Date Installed',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px" }
        }),
        headerStyle: {
            fontSize: '12px',
            width: '150px'
        },
        style: {
            fontSize: '12px'
        },
        formatter: (cell, row) => formatDate(cell)
    },
    {
        dataField: 'asset_type',
        text: 'Asset Type Affected',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px" }
        }),
        headerStyle: {
            fontSize: '12px',
            width: '150px'
        },
        style: {
            fontSize: '12px'
        },
        formatter: (cellContent, row) => {
            if (row.asset_type === "physical") {
                return (
                    <h6>
                        <span className="badge bg-warning text-dark">Physical</span>
                    </h6>
                );
            }
            else if (row.asset_type === "virtual") {
                return (
                    <h6>
                        <span className="badge bg-info text-dark">Virtual</span>
                    </h6>
                );
            }
        }
    },
    {
        dataField: 'model/os',
        text: 'Model/OS',
        headerAlign: 'center',
        sort: true,
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px" }
        }),
        headerStyle: {
            fontSize: '12px',
            width: '150px'
        },
        style: {
            fontSize: '12px'
        }
    },
    {
        dataField: 'notes',
        text: 'Notes',
        headerAlign: 'center',
        sort: true,
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px" }
        }),
        headerStyle: {
            fontSize: '12px',
            width: '150px'
        },
        style: {
            fontSize: '12px'
        }
    },
    {
        dataField: 'CHG_ticket',
        text: 'Change Control Ticket',
        headerAlign: 'center',
        sort: true,
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px" }
        }),
        headerStyle: {
            fontSize: '12px',
            width: '150px'
        },
        style: {
            fontSize: '12px'
        }
    },
]


function formatDate(dateString) {
    if (dateString === null) { return "" }
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}