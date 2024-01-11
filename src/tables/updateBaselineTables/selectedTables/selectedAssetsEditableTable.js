import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';

import { selectedAssetsTableColumns } from './columns/selectedAssetsTableColumns';

const SelectedAssetsEditableTable = ({ selectedAssets }) => {
  const columns = selectedAssetsTableColumns

  const paginationOptions = {
    page: 1,
    sizePerPageList: [
      { text: '5', value: 5 },
      { text: '10', value: 10 },
      { text: 'All', value: selectedAssets.length },
    ],
    sizePerPage: 10,
    pageStartIndex: 1,
    paginationSize: 3,
    prePage: 'Prev',
    nextPage: 'Next',
    firstPage: 'First',
    lastPage: 'Last',
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Showing {selectedAssets.length} Selected Assets</h6>
      </div>
      <div className="card-body" style={{ marginTop: 10 }}>
        <div style={{ overflowX: 'auto' }}>
          <BootstrapTable
            keyField="id"
            data={selectedAssets}
            columns={columns}
            striped
            bordered={false}
            pagination={paginationFactory(paginationOptions)}
            cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
          />
        </div>
      </div>
    </div>
  );
};

export default SelectedAssetsEditableTable;