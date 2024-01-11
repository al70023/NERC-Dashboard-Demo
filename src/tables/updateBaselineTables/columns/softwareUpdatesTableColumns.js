import { Type } from 'react-bootstrap-table2-editor';
import EditNoteIcon from '@mui/icons-material/EditNote';

export const softwareUpdatesTableColumns = [
    {
        dataField: 'delete',
        text: '',
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '10px'
        },
        style: {
            fontSize: '12px'
        },
        editable: false
    },
    {
        dataField: 'patch_version',
        text: <span>Patch &nbsp;<EditNoteIcon fontSize="small"/></span>,
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '100px'
        },
        style: {
            fontSize: '12px'
        },
    },
    {
        dataField: 'source',
        text: <span>Source &nbsp;<EditNoteIcon fontSize="small"/></span>,
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '100px'
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
        dataField: 'os',
        text: <span>OS &nbsp;<EditNoteIcon fontSize="small"/></span>,
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '150px'
        },
        style: {
            fontSize: '12px'
        },
        editor: {
            type: Type.SELECT,
            options: [{
              value: 'Windows Server 2008r2',
              label: 'Windows Server 2008r2'
            }, {
                value: 'Windows Server 2012',
                label: 'Windows Server 2012'
            },
            {
                value: 'Windows Server 2016',
                label: 'Windows Server 2016'
            },
            {
                value: 'Windows Server 2019',
                label: 'Windows Server 2019'
            }]
          }
    },
    {
        dataField: 'date_reviewed',
        text: <span>Date Reviewed &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        dataField: 'date_installed',
        text: <span>Date Installed &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        dataField: 'CHG_ticket',
        text: <span>Change Control &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        dataField: 'notes',
        text: <span>Notes &nbsp;<EditNoteIcon fontSize="small"/></span>,
        headerAlign: 'center',
        align: 'center',
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