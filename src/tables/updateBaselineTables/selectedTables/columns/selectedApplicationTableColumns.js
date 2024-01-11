import { Type } from 'react-bootstrap-table2-editor';
import EditNoteIcon from '@mui/icons-material/EditNote';

export const selectedApplicationsTableColumns = [
    {
        dataField: 'name',
        text: 'Application Name',
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '100px'
        },
        style: {
            fontSize: '12px'
        },
        editable: false
    },
    {
        dataField: 'type',
        text: 'Type',
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '100px'
        },
        style: {
            fontSize: '12px'
        },
        editable: false
    },
    {
        dataField: 'version',
        text: <span>Version &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
        dataField: 'initial_install',
        text: <span>Initial Install Date &nbsp;<EditNoteIcon fontSize="small"/></span>,
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '100px'
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
        dataField: 'upgrade_date',
        text: <span>Upgrade Date &nbsp;<EditNoteIcon fontSize="small"/></span>,
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '100px'
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
        dataField: 'add_upgrade_remove',
        text: <span>Add/Upgrade/Remove Application &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
              value: 'Add',
              label: 'Add'
            }, {
              value: 'Upgrade',
              label: 'Upgrade'
            }, {
              value: 'Remove',
              label: 'Remove'
            }]
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