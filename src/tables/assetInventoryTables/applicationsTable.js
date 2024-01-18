import React, { Component } from 'react'
import { withRouter } from '../../navigation/withRouter';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from "react-bootstrap-table2-toolkit";

import { applicationsTableColumns } from './columns/applicationsTableColumns';


export class ApplicationsTable extends Component {
    state = {
        applicationsList: [],
        columns: applicationsTableColumns
    }

    componentDidMount() {
        const { params } = this.props;
        const id = params.id;
        fetch(process.env.REACT_APP_BACKEND_URL + `/AssetInventory/${id}/applications`)
            .then((res) => res.json())
            .then((json) => {
                // console.log(json);
                this.setState({
                    applicationsList: json
                });
            });
    }



    render() {

        return (
            <div className="card shadow mb-4">

                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                        Applications
                    </h6>
                </div>

                <div className="card-body" style={{ marginTop: 10 }}>
                    <ToolkitProvider
                        bootstrap4
                        keyField="asset_id"
                        data={this.state.applicationsList}
                        columns={this.state.columns}
                    >
                        {props => (
                            <div>

                                <div style={{ overflowX: "auto" }}>
                                    <BootstrapTable
                                        {...props.baseProps}
                                        noDataIndication="No applications to show."
                                        striped
                                        bordered={false}
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

export default withRouter(ApplicationsTable);

