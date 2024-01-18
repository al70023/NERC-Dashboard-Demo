import React, { Component } from 'react'
import { withRouter } from '../../navigation/withRouter';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { Button } from '@mui/material';

import { singleAssetColumns } from './columns/singleAssetColumns';



export class SingleAsset extends Component {
    state = {
        assetInventory: [],
        columns: singleAssetColumns
    }

    componentDidMount() {
        const { params } = this.props;
        const id = params.id;
        fetch(process.env.REACT_APP_BACKEND_URL + `/AssetInventory/${id}`)
            .then((res) => res.json())
            .then((json) => {
                // console.log(json);
                this.setState({
                    assetInventory: [json]
                });
            });
    }

    deleteAsset = (id) => {
        const requestOptions = {
            method: 'DELETE'
        };

        fetch(process.env.REACT_APP_BACKEND_URL + `/AssetInventory/delete/${id}`, requestOptions)
            .then(res => res.json())
            .then(() => {
                // Perform any actions after successful delete
                window.location.replace('/');
            })
            .catch((error) => {
                console.error('Error deleting asset:', error);
                // Handle the error or display an error message to the user
            });
    };

    render() {
        

        return (
            <div className="card shadow mb-4">

                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                        Viewing Asset
                    </h6>
                </div>

                <div className="card-body" style={{ marginTop: 10 }}>
                    <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.state.assetInventory}
                        columns={this.state.columns}
                    >
                        {props => (
                            <div>

                                <Button
                                    color="error"
                                    onClick={() => {
                                        const { params } = this.props;
                                        const id = params.id;
                                        this.deleteAsset(id); 
                                    }}
                                    style={{ position: "absolute", right: 50, top: 7 }}
                                >
                                    Delete Asset
                                </Button>

                                <div style={{ overflowX: "auto" }}>
                                    <BootstrapTable
                                        {...props.baseProps}
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

export default withRouter(SingleAsset);

