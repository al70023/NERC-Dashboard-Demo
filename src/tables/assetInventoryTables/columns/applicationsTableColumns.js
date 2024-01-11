

export const applicationsTableColumns = [
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
        }
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
        }
    },
    {
        dataField: 'version',
        text: 'Version',
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
        dataField: 'initial_install',
        text: 'Initial Install',
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
        dataField: 'upgrade_date',
        text: 'Upgrade Date',
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