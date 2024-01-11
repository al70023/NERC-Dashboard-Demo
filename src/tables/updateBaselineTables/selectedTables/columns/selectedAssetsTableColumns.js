import { Type } from 'react-bootstrap-table2-editor';
import EditNoteIcon from '@mui/icons-material/EditNote';


export const selectedAssetsTableColumns = [
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
        editable: false
    },
    {
        dataField: 'status',
        text: <span>Status &nbsp;<EditNoteIcon fontSize="small"/></span>,
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '150px',
        },
        style: {
            fontSize: '12px'
        },
        formatter: (cellContent, row) => {
            if (row.status === "Deployed" || row.status === "deployed") {
                return (
                    <p>
                        <span className="badge rounded-pill bg-primary bg-gradient">Deployed</span>
                    </p>
                );
            }
            else if (row.status === "" || row.status === "Decommissioned" || row.status === "decommissioned") {
                return (
                    <p>
                        <span className="badge rounded-pill bg-danger bg-gradient">Decommissioned</span>
                    </p>
                );
            } else return (row.status);
        }
    },
    {
        dataField: 'serial_number',
        text: <span>Serial Number &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>Name &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>IPs &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>OS &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>Team &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>Owner &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>Type &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>Manufacturer &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>Model &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>Group &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>BES Class &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>Impact Rating &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>Rack &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>Location &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>PSP ID &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>ESP ID &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>Function &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        text: <span>Commission Date &nbsp;<EditNoteIcon fontSize="small"/></span>,
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '150px'
        },
        style: {
            fontSize: '12px'
        },
        formatter: (cell, row) => formatDate(cell),
        editor: {
            type: Type.DATE
        }
    },
    {
        dataField: 'decommission_date',
        text: <span>Decommission Date &nbsp;<EditNoteIcon fontSize="small"/></span>,
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '150px'
        },
        style: {
            fontSize: '12px'
        },
        formatter: (cell, row) => formatDate(cell),
        editor: {
            type: Type.DATE
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