import React, { useState, useEffect } from 'react';
import IpInventoryReport from '../../reports/IpInventoryReport';
import ChangeControlsReport from '../../reports/ChangeControlsReport';
import BaselineReport from '../../reports/BaselineReport';

export default function PdfReportsPage() {
    return (
        <div className="wrapper">
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <IpInventoryReport />
                </div>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <ChangeControlsReport />
                </div>
                <div style={{ flex: 1 }}>
                    <BaselineReport />
                </div>
            </div>
        </div>
    )
}
