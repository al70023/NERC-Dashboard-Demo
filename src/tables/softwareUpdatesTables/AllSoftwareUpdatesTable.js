import React, { Component } from 'react'
import { withRouter } from '../../navigation/withRouter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Button } from "react-bootstrap";

import { allSoftwareUpdatesTableColumns } from './columns/allSoftwareUpdatesTableColumns';


const { SearchBar } = Search;

const ClearButton = props => {
    const handleClick = () => {
        props.onSearch("");
    };
    return (
        <Button
            variant="secondary"
            onClick={handleClick}
            style={{
                fontSize: "16px",
                padding: "5px",
                margin: "10px",
                height: "40px"
            }}
        >
            Clear
        </Button>
    );
};


export class AllSoftwareUpdatesTable extends Component {
    state = {
        softwareUpdatesList: [],
        columns: allSoftwareUpdatesTableColumns
    }

    componentDidMount() {
        fetch(`http://localhost:3001/SoftwareUpdates`)
            .then((res) => res.json())
            .then((json) => {
                // console.log(json);
                // Add a unique 'id' field to each item in the softwareUpdatesList
                const softwareUpdatesListWithIds = json.map((item, index) => ({
                    ...item,
                    id: index + 1
                }));
                this.setState({
                    softwareUpdatesList: softwareUpdatesListWithIds 
                });
            });
    }



    render() {

        const paginationOptions = {
            page: 1,
            sizePerPageList: [{
                text: '10', value: 10
            }, {
                text: '20', value: 20
            }, {
                text: 'All', value: this.state.softwareUpdatesList.length
            }],
            sizePerPage: 20,
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
                        keyField="id"
                        data={this.state.softwareUpdatesList}
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
                                        noDataIndication="No software updates to show."
                                        striped
                                        hover
                                        bordered={false}
                                        pagination={paginationFactory(paginationOptions)}
                                        filter={filterFactory()}
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

                            </div>
                        )}
                    </ToolkitProvider>
                </div>
            </div>
        )

    }
}

export default withRouter(AllSoftwareUpdatesTable);

