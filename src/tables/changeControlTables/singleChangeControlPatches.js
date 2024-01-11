import React, { Component } from 'react'
import { withRouter } from '../../navigation/withRouter';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";

import { singleChangeControlPatchesColumns } from './columns/singleChangeControlPatchesColumns';


export class SingleChangeControlPatches extends Component {
    state = {
        patches: [],
        columns: singleChangeControlPatchesColumns
    }

    componentDidMount() {
        const { params } = this.props;
        const CHG_ticket = params.CHG_ticket;
        fetch(`http://localhost:3001/ChangeControls/${CHG_ticket}/patches`)
            .then((res) => res.json())
            .then((json) => {
                // console.log(json);
                // Add a unique 'id' field to each item in the patch list
                const patchesWithIds = json.map((item, index) => ({
                    ...item,
                    id: index + 1
                }));
                this.setState({
                    patches: patchesWithIds
                });
            });
    }



    render() {
        const { params } = this.props;
        const CHG_ticket = params.CHG_ticket;

        return (
            <div className="card shadow mb-4">

                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                        Patches for Ticket: {CHG_ticket}
                    </h6>
                </div>

                <div className="card-body" style={{ marginTop: 10 }}>
                    <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.state.patches}
                        columns={this.state.columns}
                    >
                        {props => (
                            <div style={{ overflowX: "auto" }}>
                                <BootstrapTable
                                    {...props.baseProps}
                                    noDataIndication="No patches to show."
                                    filter={filterFactory()}
                                    striped
                                    hover
                                    bordered={false}
                                    filterPosition="top"
                                    rowEvents={{
                                        onClick: (e, row, rowIndex) => {
                                            const patch_version = row.patch_version;
                                            this.props.navigate(`/softwareUpdates/${patch_version}`, {
                                                patch_version: patch_version
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

export default withRouter(SingleChangeControlPatches);

