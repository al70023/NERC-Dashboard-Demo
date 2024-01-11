import React from 'react';
import SingleChangeControlPatches from '../../tables/changeControlTables/singleChangeControlPatches';
import SingleChangeControlInfo  from '../../tables/changeControlTables/singleChangeControlInfo';

export default function ViewChangeControl() {
    return (
        <div className="wrapper">
            <SingleChangeControlInfo />
            <br></br>
            <br></br>
            <SingleChangeControlPatches />
        </div>
    )
} 
