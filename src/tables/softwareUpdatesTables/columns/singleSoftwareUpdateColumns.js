import { textFilter } from "react-bootstrap-table2-filter";


export const singleSoftwareUpdateColumns = [
    {
        dataField: 'name',
        text: 'Asset Name',
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
        dataField: 'group',
        text: 'Asset Group',
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
        }
    },
    {
        dataField: 'IPs',
        text: 'IPs',
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
        }
    },
    {
        dataField: 'model_type',
        text: 'Model Type',
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
            if (row.model_type === "Virtual" || row.model_type === "virtual") {
                return (
                    <h6>
                        <span className="badge bg-info text-dark">Virtual</span>
                    </h6>
                );
            } else if (row.model_type === "Physical" || row.model_type === "physical") {
                return (
                    <h6>
                        <span className="badge bg-warning text-dark">Physical</span>
                    </h6>
                );
            }
        }
    },
    {
        dataField: 'function',
        text: 'Function',
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
        dataField: 'CHG_ticket',
        text: 'Change Control',
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