import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { singleAssetColumns } from '../../assetInventoryTables/columns/singleAssetColumns';

const SelectedAssetsCheckboxTable = ({ selectedAssets, softwareUpdateRow }) => {
  const columns = singleAssetColumns

  // State to manage selected IDs in the child component
  const [selectedIds, setSelectedIds] = useState(softwareUpdateRow.assetIds);

  useEffect(() => {
    // This effect will run whenever selectedIds changes
    console.log(selectedIds);

    // Update the assetIds of softwareUpdateRow here
    softwareUpdateRow.assetIds = selectedIds;
    softwareUpdateRow.assets_selected_count = selectedIds.length;
  }, [selectedIds]);


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

  const divStyle = {
    border: '1px solid #000',  // 1px solid black border
    padding: '10px',           // Add padding for spacing
  };

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    selected: selectedIds, // Select all assets
    onSelect: (row, isSelected) => {
      // Update the selected asset IDs based on checkbox selection
      if (isSelected) {
        setSelectedIds((prevSelectedIds) => [...prevSelectedIds, row.id]);
      } else {
        setSelectedIds((prevSelectedIds) =>
          prevSelectedIds.filter((selectedId) => selectedId !== row.id)
        );
      }
    },
    onSelectAll: (isSelected, rows) => {
      // Handle select all
      if (isSelected) {
        const selectedIds = rows.map((row) => row.id);
        setSelectedIds(selectedIds);
      } else {
        setSelectedIds([]);
      }
    },
  };



  return (
    <div>
      <div style={divStyle}>
        <div style={{ overflowX: 'auto' }}>
          <BootstrapTable
            keyField="id"
            data={selectedAssets}
            columns={columns}
            hover
            //striped
            //bordered={false}
            //pagination={paginationFactory(paginationOptions)}
            selectRow={selectRow}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectedAssetsCheckboxTable;