import { textFilter } from "react-bootstrap-table2-filter";


export const assetTableColumns = [
    {
        dataField: 'id',
        text: 'ID',
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '50px',
        },
        style: {
            fontSize: '12px'
        },
        hidden: true
    },
    {
        dataField: 'status',
        text: 'Status',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
        }),
        headerStyle: {
            fontSize: '12px',
            width: '150px',
        },
        style: {
            fontSize: '12px'
        },
        formatter: (cellContent, row) => {
            if (row.status === "Active") {
                return (
                    <h6>
                        <span className="badge rounded-pill bg-primary bg-gradient">Active</span>
                    </h6>
                );
            }
            else if (row.status === "Offline") {
                return (
                    <h6>
                        <span className="badge rounded-pill bg-warning text-dark bg-gradient">Offline</span>
                    </h6>
                );
            }
            else if (row.status === "" || row.status === "Decommissioned") {
                return (
                    <h6>
                        <span className="badge rounded-pill bg-danger bg-gradient">Decommissioned</span>
                    </h6>
                );
            }
        }
    },
    {
        dataField: 'serial_number',
        text: 'Serial Number',
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'name',
        text: 'Name',
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        text: 'OS',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'team',
        text: 'Team',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'tech_owner',
        text: 'Owner',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        text: 'Type',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'manufacturer',
        text: 'Manufacturer',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'model',
        text: 'Model',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        text: 'Group',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'bes_class',
        text: 'BES Class',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'impact_rating',
        text: 'Impact Rating',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'rack',
        text: 'Rack',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'location',
        text: 'Location',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'psp_id',
        text: 'PSP ID',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'esp_id',
        text: 'ESP ID',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'function',
        text: 'Function',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'commission_date',
        text: 'Commission Date',
        sort: true,
        headerAlign: 'center',
        align: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
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
        dataField: 'decommission_date',
        text: 'Decommission Date',
        sort: true,
        headerAlign: 'center',
        filter: textFilter({
            placeholder: 'Search column...',
            style: { fontSize: '10px', width: "130px"}
        }),
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '150px'
        },
        style: {
            fontSize: '12px'
        },
        formatter: (cell, row) => formatDate(cell)
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