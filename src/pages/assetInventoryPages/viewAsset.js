import React from 'react';
import SingleAsset from '../../tables/assetInventoryTables/singleAsset';
import PortsTable from '../../tables/assetInventoryTables/portsTable';
import ApplicationsTable from '../../tables/assetInventoryTables/applicationsTable';
import SoftwareUpdatesTable from '../../tables/assetInventoryTables/softwareUpdatesTable';

export default function ViewAsset() {
    return (
        <div className="wrapper">
            <SingleAsset />

            <div className="row">

                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6" >
                    <PortsTable />
                </div>

                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6" >
                    <ApplicationsTable />
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12" >
                    <SoftwareUpdatesTable />
                </div>
            </div>

        </div>
    )
} 
