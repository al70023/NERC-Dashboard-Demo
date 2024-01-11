import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

import { softwareUpdatesTableColumns } from './columns/softwareUpdatesTableColumns';
import SelectedAssetsCheckboxTable from './selectedTables/selectedAssetsCheckboxTable';



const SoftwareUpdatesTableUpdateBaseline = ({ softwareUpdates, selectedAssets }) => {
  const columns = softwareUpdatesTableColumns

  const expandRow = {
    renderer: row => (
      <div>
        {<SelectedAssetsCheckboxTable
          selectedAssets={selectedAssets}
          softwareUpdateRow={row}
        />}
      </div>
    ),
    onlyOneExpanding: true,
    showExpandColumn: true,
    expandByColumnOnly: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      if (isAnyExpands) {
        return <b>-</b>;
      }
      return <b>+</b>;
    },
    expandColumnRenderer: ({ expanded }) => {
      if (expanded) {
        return (
          <b>-</b>
        );
      }
      return (
        <b>...</b>
      );
    }
  };



  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Showing {softwareUpdates.length} Patches</h6>
      </div>
      <div className="card-body" style={{ marginTop: 10 }}>
        <div style={{ overflowX: 'auto' }}>
          <BootstrapTable
            keyField="id"
            data={softwareUpdates}
            columns={columns}
            expandRow={expandRow}
            striped
            bordered={false}
            cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
          />
        </div>
      </div>
    </div>
  );
};

export default SoftwareUpdatesTableUpdateBaseline;