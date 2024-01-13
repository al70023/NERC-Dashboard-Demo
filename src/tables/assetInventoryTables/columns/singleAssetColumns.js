

export const singleAssetColumns = [
    {
        dataField: 'id',
        text: 'ID',
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '50px'
        },
        style: {
            fontSize: '12px'
        }
    },
    {
        dataField: 'status',
        text: 'Status',
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '150px'
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
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