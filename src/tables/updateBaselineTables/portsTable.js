import React, { Component } from 'react'
import { withRouter } from '../../navigation/withRouter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { Button } from "react-bootstrap";
import AddIcon from '@mui/icons-material/Add';

import { portsTableColumns } from './columns/portsTableColumns';


export class PortsTableUpdateBaseline extends Component {
    state = {
        portsList: [],
        columns: portsTableColumns,
        modalOpen: false
    }

    componentDidMount() {
        fetch('http://localhost:3001/Ports')
            .then(res => res.json())
            .then(json => {
                // console.log(json);
                this.setState({
                    portsList: json
                });
            });
    }

    openModal = () => this.setState({ modalOpen: true });
    closeModal = () => this.setState({ modalOpen: false });

    render() {

        const { selectedPorts, onPortSelect, onAllPortsSelect } = this.props;

        const selectedIds = selectedPorts.map((row) => row.id);

        const paginationOptions = {
            page: 1,
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.state.portsList.length
            }],
            sizePerPage: 5,
            pageStartIndex: 1,
            paginationSize: 3,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last'
        };

        return (
            <div className="card shadow mb-4">

                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Ports List</h6>
                </div>

                <div className="card-body" style={{ marginTop: 10 }}>

                    <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.state.portsList}
                        columns={this.state.columns}
                    >
                        {props => (
                            <div>

                                <Button variant="success" onClick={this.openModal} style={{ position: "absolute", right: 25, top: 6 }}>
                                    <AddIcon /> &nbsp;
                                    Add New Port &nbsp;
                                </Button>

                                <div style={{ overflowX: "auto" }}>
                                    <BootstrapTable
                                        {...props.baseProps}
                                        filter={filterFactory()}
                                        striped
                                        hover
                                        bordered={false}
                                        filterPosition="top"
                                        pagination={paginationFactory(paginationOptions)}
                                        defaultSorted={[{
                                            dataField: 'id',
                                            order: 'asc'
                                        }]}
                                        selectRow={{
                                            mode: 'checkbox',
                                            clickToSelect: true,
                                            onSelect: onPortSelect,
                                            onSelectAll: onAllPortsSelect,
                                            selected: selectedIds
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </ToolkitProvider>
                </div>

            </div>
        )

    }
}

export default withRouter(PortsTableUpdateBaseline);

