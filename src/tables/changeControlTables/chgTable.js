import React, { Component } from 'react'
import { withRouter } from '../../navigation/withRouter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Button } from "react-bootstrap";

import { chgTableColumns } from './columns/chgTableColumns';


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


export class ChgTable extends Component {
    state = {
        changeControls: [],
        columns: chgTableColumns,
    }

    componentDidMount() {
        fetch('http://localhost:3001/ChangeControls')
            .then(res => res.json())
            .then(json => {
                // console.log(json);
                this.setState({
                    changeControls: json 
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
                text: 'All', value: this.state.changeControls.length
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
                    <h6 className="m-0 font-weight-bold text-primary">Change Controls</h6>
                </div>

                <div className="card-body" style={{ marginTop: 10 }}>

                    <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.state.changeControls}
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

                                <div style={{ overflowX: "hidden" }}>
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
                                            dataField: 'CHG_date',
                                            order: 'desc'
                                        }]}
                                        rowEvents={{
                                            onClick: (e, row, rowIndex) => {
                                                const CHG_ticket = row.CHG_number;
                                                this.props.navigate(`/changeControls/${CHG_ticket}`, {
                                                    CHG_ticket: CHG_ticket
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

export default withRouter(ChgTable);

