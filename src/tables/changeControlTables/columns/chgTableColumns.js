import { textFilter } from "react-bootstrap-table2-filter";


export const chgTableColumns = [
    {
        dataField: 'CHG_number',
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
    {
        dataField: 'CHG_date',
        text: 'Date Entered',
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
        dataField: 'patches_included',
        text: 'Number of Patches Included',
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
        dataField: 'security_update',
        text: 'Security Update',
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
            if (row.security_update === "Yes") {
                return (
                    <h6>
                        <span className="badge bg-primary ">Yes</span>
                    </h6>
                );
            }
            else {
                return (
                    <h6>
                        <span className="badge bg-secondary ">No</span>
                    </h6>
                );
            }
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