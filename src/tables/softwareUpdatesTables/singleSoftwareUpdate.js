import React, { Component } from 'react'
import { withRouter } from '../../navigation/withRouter';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";

import { singleSoftwareUpdateColumns } from './columns/singleSoftwareUpdateColumns';


export class SingleSoftwareUpdate extends Component {
    state = {
        assets: [],
        columns: singleSoftwareUpdateColumns
    }

    componentDidMount() {
        const { params } = this.props;
        const patch_version = params.patch_version;
        fetch(process.env.REACT_APP_BACKEND_URL + `/SoftwareUpdates/${patch_version}`)
            .then((res) => res.json())
            .then((json) => {
                // console.log(json);
                this.setState({
                    assets: json
                });
            });
    }



    render() {
        const { params } = this.props;
        const patch_version = params.patch_version;

        return (
            <div className="card shadow mb-4">

                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                        Viewing Patch: {patch_version}
                    </h6>
                </div>

                <div className="card-body" style={{ marginTop: 10 }}>
                    <ToolkitProvider
                        bootstrap4
                        keyField="IPs"
                        data={this.state.assets}
                        columns={this.state.columns}
                    >
                        {props => (
                            <div style={{ overflowX: "auto" }}>
                                <BootstrapTable
                                    {...props.baseProps}
                                    filter={filterFactory()}
                                    striped
                                    hover
                                    bordered={false}
                                    filterPosition="top"
                                    rowEvents={{
                                        onClick: (e, row, rowIndex) => {
                                            const id = row.id;
                                            this.props.navigate(`/${id}`, {
                                                id: id
                                            });
                                        },
                                    }}
                                />
                            </div>
                        )}
                    </ToolkitProvider>
                </div>
            </div>
        )

    }
}

export default withRouter(SingleSoftwareUpdate);

