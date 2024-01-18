import React, { Component } from 'react'
import { withRouter } from '../../navigation/withRouter';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from 'react-bootstrap-table2-paginator';

import { softwareUpdatesTableColumns } from './columns/softwareUpdatesTableColumns';



export class SoftwareUpdatesTable extends Component {
    state = {
        softwareUpdatesList: [],
        columns: softwareUpdatesTableColumns
    }

    componentDidMount() {
        const { params } = this.props;
        const id = params.id;
        fetch(process.env.REACT_APP_BACKEND_URL + `/AssetInventory/${id}/softwareUpdates`)
            .then((res) => res.json())
            .then((json) => {
                // console.log(json);
                this.setState({
                    softwareUpdatesList: json
                });
            });
    }



    render() {

        const paginationOptions = {
            page: 1,
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.state.softwareUpdatesList.length
            }],
            sizePerPage: 10,
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
                    <h6 className="m-0 font-weight-bold text-primary">
                        Software Updates
                    </h6>
                </div>

                <div className="card-body" style={{ marginTop: 10 }}>
                    <ToolkitProvider
                        bootstrap4
                        keyField="asset_id"
                        data={this.state.softwareUpdatesList}
                        columns={this.state.columns}
                    >
                        {props => (
                            <div>

                                <div style={{ overflowX: "auto" }}>
                                    <BootstrapTable
                                        {...props.baseProps}
                                        noDataIndication="No software updates to show."
                                        striped
                                        bordered={false}
                                        pagination={paginationFactory(paginationOptions)}
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

export default withRouter(SoftwareUpdatesTable);

