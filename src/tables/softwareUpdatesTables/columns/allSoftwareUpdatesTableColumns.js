import { textFilter } from "react-bootstrap-table2-filter";


export const allSoftwareUpdatesTableColumns = [
    {
        dataField: 'patch_version',
        text: 'Patch',
        headerAlign: 'center',
        align: 'center',
        sort: true,
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
    },
    {
        dataField: 'source',
        text: 'Source',
        headerAlign: 'center',
        align: 'center',
        sort: true,
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
        headerAlign: 'center',
        align: 'center',
        sort: true,
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
        headerAlign: 'center',
        align: 'center',
        sort: true,
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
        dataField: 'model',
        text: 'Model Affected',
        headerAlign: 'center',
        align: 'center',
        sort: true,
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
        dataField: 'OS',
        text: 'OS Affected',
        headerAlign: 'center',
        align: 'center',
        sort: true,
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
        dataField: 'CHG_number',
        text: 'Change Control',
        headerAlign: 'center',
        align: 'center',
        sort: true,
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
        align: 'center',
        sort: true,
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
    }
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