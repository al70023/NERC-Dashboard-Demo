import React, { Component } from 'react'
import { withRouter } from '../../navigation/withRouter';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from "react-bootstrap-table2-toolkit";

import { portsTableColumns } from './columns/portsTableColumns';


export class PortsTable extends Component {
    state = {
        portsList: [],
        columns: portsTableColumns
    }

    componentDidMount() {
        const { params } = this.props;
        const id = params.id;
        fetch(`http://localhost:3001/AssetInventory/${id}/ports`)
            .then((res) => res.json())
            .then((json) => {
                // console.log(json);
                this.setState({
                    portsList: json
                });
            });
    }



    render() {

        return (
            <div className="card shadow mb-4">

                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                        Ports
                    </h6>
                </div>

                <div className="card-body" style={{ marginTop: 10 }}>
                    <ToolkitProvider
                        bootstrap4
                        keyField="asset_id"
                        data={this.state.portsList}
                        columns={this.state.columns}
                    >
                        {props => (
                            <div>

                                <div style={{ overflowX: "auto" }}>
                                    <BootstrapTable
                                        {...props.baseProps}
                                        noDataIndication="No ports to show."
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

export default withRouter(PortsTable);

