import { Type } from 'react-bootstrap-table2-editor';
import EditNoteIcon from '@mui/icons-material/EditNote';

export const selectedPortsTableColumns = [
    {
        dataField: 'number',
        text: 'Port Number',
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
        dataField: 'name',
        text: 'Port Name',
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
        dataField: 'allows',
        text: 'Ports Allow',
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
        dataField: 'description',
        text: 'Description',
        headerAlign: 'center',
        align: 'center',
        headerStyle: {
            fontSize: '12px',
            width: '150px'
        },
        style: {
            fontSize: '12px'
        },
        editable: false
    },
    {
        dataField: 'add_remove',
        text: <span>Add/Remove Port &nbsp;<EditNoteIcon fontSize="small"/></span>,
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
              value: 'Remove',
              label: 'Remove'
            }]
          }
    },
]
