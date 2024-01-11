import React, { Component } from 'react'
import { withRouter } from '../../navigation/withRouter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

import { applicationsTableColumns } from './columns/applicationTableColumns';



export class ApplicationsTableUpdateBaseline extends Component {
    state = {
        applicationsList: [],
        columns: applicationsTableColumns
    }

    componentDidMount() {
        fetch('http://localhost:3001/Applications')
            .then(res => res.json())
            .then(json => {
                // console.log(json);
                this.setState({
                    applicationsList: json
                });
            });
    }

    render() {

        const { selectedApplications, onApplicationSelect, onAllApplicationsSelect } = this.props;

        const selectedIds = selectedApplications.map((row) => row.id);

        const paginationOptions = {
            page: 1,
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.state.applicationsList.length
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
                    <h6 className="m-0 font-weight-bold text-primary">Applications List</h6>
                </div>

                <div className="card-body" style={{ marginTop: 10 }}>

                    <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.state.applicationsList}
                        columns={this.state.columns}
                    >
                        {props => (
                            <div>
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
                                            onSelect: onApplicationSelect,
                                            onSelectAll: onAllApplicationsSelect,
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

export default withRouter(ApplicationsTableUpdateBaseline);

