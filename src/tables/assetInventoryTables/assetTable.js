import React, { Component } from 'react'
import { withRouter } from '../../navigation/withRouter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Button from '@mui/material/Button';

import { assetTableColumns } from './columns/assetTableColumns';

const { SearchBar } = Search;

const ClearButton = props => {
    const handleClick = () => {
        props.onSearch("");
    };
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            style={{
                fontSize: "14px",
                padding: "5px",
                margin: "10px",
                marginBottom: "15px",
                height: "30px"
            }}
        >
            Clear
        </Button>
    );
};


export class AssetTable extends Component {
    state = {
        assetInventory: [],
        columns: assetTableColumns
    }

    componentDidMount() {
         fetch('http://localhost:3001/AssetInventory')
            .then(res => res.json())
            .then(json => {
                // console.log(json);
                this.setState({
                    assetInventory: json
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
                text: 'All', value: this.state.assetInventory.length
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
                    <h6 className="m-0 font-weight-bold text-primary">Asset Inventory</h6>
                </div>

                <div className="card-body" style={{ marginTop: 10 }}>

                    <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.state.assetInventory}
                        columns={this.state.columns}
                        search
                    >
                        {props => (
                            <div>
                                <div >
                                    <SearchBar
                                        {...props.searchProps}
                                        style={{ width: "400px", height: "40px" }}
                                        srText=""
                                        placeholder='Search table...'
                                    />

                                    <ClearButton
                                        {...props.searchProps}
                                        clearAllFilter={this.clearAllFilter}
                                    />
                                </div>

                                <div style={{ overflowX: "auto" }}>
                                    <BootstrapTable
                                        {...props.baseProps}
                                        filter={filterFactory()}
                                        noDataIndication="No matching entries found."
                                        striped
                                        hover
                                        bordered={false}
                                        filterPosition="top"
                                        pagination={paginationFactory(paginationOptions)}
                                        defaultSorted={[{
                                            dataField: 'id',
                                            order: 'asc'
                                        }]}
                                        remote={{
                                            filter: false,
                                            pagination: false,
                                            sort: false,
                                            cellEdit: false
                                        }}
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
                            </div>
                        )}
                    </ToolkitProvider>
                </div>

            </div>
        )

    }
}

export default withRouter(AssetTable);

