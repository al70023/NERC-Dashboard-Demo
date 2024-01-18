// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import NewAssetForm from './forms/newAssetForm';

import { PortsTableUpdateBaseline } from '../tables/updateBaselineTables/portsTable';
import SelectedPortsTable from '../tables/updateBaselineTables/selectedTables/selectedPortsTable';

import { ApplicationsTableUpdateBaseline } from '../tables/updateBaselineTables/applicationsTable';
import SelectedApplicationsTable from '../tables/updateBaselineTables/selectedTables/selectedApplicationsTable';

import NewCHGForm from './forms/newCHGForm';


const steps = ['Asset Information', 'Port Configuration', 'Applications Installed', 'Change Control Information', 'Submit'];

export default function NewAssetStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [newAssetInfo, setNewAssetInfo] = useState({});
    const [selectedPorts, setSelectedPorts] = useState([]);
    const [selectedApplications, setSelectedApplications] = useState([]);
    const [newCHGInfo, setNewCHGInfo] = useState({});

    const handleSave = (formInputs) => {
        if (activeStep === 0) setNewAssetInfo(formInputs);
        if (activeStep === 3) setNewCHGInfo(formInputs);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinish = async () => {
        await insertAsset();
        setActiveStep(0);
        setNewAssetInfo({});
        setSelectedPorts([]);
        setSelectedApplications([]);
        setNewCHGInfo({});
        
        // Redirect to another page after all the operations are complete
        window.location.replace(`/changeControls/${newCHGInfo.ChangeControl}`);
    };

    const insertAsset = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/AssetInventory/insert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAssetInfo)
            });

            const assetData = await response.json();
            const selectedPortIds = selectedPorts.map(port => port.id);

            const portData = {
                asset_ids: assetData.inserted_asset_id,
                port_ids: selectedPortIds
            };

            const portResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/AssetInventory/insertPorts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(portData)
            });

            await portResponse.json();

            const selectedApplicationIds = selectedApplications.map(application => application.id);
            const selectedApplicationVersions = selectedApplications.map(application => application.version);
            const selectedApplicationDates = selectedApplications.map(application => application.initial_install);
            const selectedApplicationUpgrades = selectedApplications.map(application => application.upgrade_date);

            const applicationData = {
                asset_ids: assetData.inserted_asset_id,
                application_ids: selectedApplicationIds,
                application_versions: selectedApplicationVersions,
                application_install_dates: selectedApplicationDates,
                application_upgrade_dates: selectedApplicationUpgrades
            }

            const applicationResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/AssetInventory/insertApplications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(applicationData)
            });

            await applicationResponse.json();

            const CHGData = {
                change_control:           newCHGInfo.ChangeControl,
                date_opened:              newCHGInfo.DateOpened,          
                security_update:          newCHGInfo.SecurityUpdate,
                security_review_date:     newCHGInfo.SecurityReviewDate,
                description:              newCHGInfo.Description,
                test_approval_date:       newCHGInfo.TestApprovalDate,
                test_install_date:        newCHGInfo.TestInstallDate,
                test_worknotes:           newCHGInfo.TestWorknotes,
                prod_approval_date:       newCHGInfo.ProdApprovalDate,
                prod_install_date:        newCHGInfo.ProdInstallDate,
                prod_worknotes:           newCHGInfo.ProdWorknotes,
                test_before_screenshot:   newCHGInfo.TestBeforeScreenshot,
                test_after_screenshot:    newCHGInfo.TestAfterScreenshot,
                prod_before_screenshot:   newCHGInfo.ProdBeforeScreenshot,
                prod_after_screenshot:    newCHGInfo.ProdAfterScreenshot
            }

            const CHGresponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/ChangeControls/insertCHG', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(CHGData)
            });

            await CHGresponse.json();

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRowSelect = (row, isSelected) => {
        if (isSelected) {
            if (activeStep === 1) setSelectedPorts((prevSelectedRows) => [...prevSelectedRows, row]);
            if (activeStep === 2) setSelectedApplications((prevSelectedRows) => [...prevSelectedRows, row]);
        } else {
            if (activeStep === 1) setSelectedPorts((prevSelectedRows) => prevSelectedRows.filter((selectedRow) => selectedRow.id !== row.id));
            if (activeStep === 2) setSelectedApplications((prevSelectedRows) => prevSelectedRows.filter((selectedRow) => selectedRow.id !== row.id));
        }
    };

    const handleAddRow = (rows) => {
        if (!Array.isArray(rows)) {
            rows = [rows];
        }
        if (activeStep === 1) setSelectedPorts((prevSelectedRows) => [...prevSelectedRows, ...rows]);
        if (activeStep === 2) setSelectedApplications((prevSelectedRows) => [...prevSelectedRows, ...rows]);
    };

    const handleRemoveRow = (rows) => {
        if (!Array.isArray(rows)) {
            rows = [rows];
        }
        if (activeStep === 1) setSelectedPorts((prevSelectedRows) => prevSelectedRows.filter((selectedRow) => !rows.some((row) => row.id === selectedRow.id)));
        if (activeStep === 2) setSelectedApplications((prevSelectedRows) => prevSelectedRows.filter((selectedRow) => !rows.some((row) => row.id === selectedRow.id)));
    };

    const handleSelectAllRows = (isSelected, rows) => {
        if (isSelected) {
            handleAddRow(rows);
        } else {
            handleRemoveRow(rows);
        }
    };


    // useEffect(() => {
    //   console.log(selectedPorts);
    // }, [selectedPorts]);

    // Render the current step based on the activeStep
    const renderStep = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <Typography sx={{ mt: 2, mb: 5, textAlign: 'center' }}> Please complete the following fields:</Typography>
                        <NewAssetForm onFormSave={handleSave} savedData={newAssetInfo} />
                    </>
                )
            case 1:
                return (
                    <>
                        <PortsTableUpdateBaseline
                            selectedPorts={selectedPorts}
                            onPortSelect={handleRowSelect}
                            onAllPortsSelect={handleSelectAllRows}
                        />
                        <SelectedPortsTable selectedPorts={selectedPorts} />
                    </>
                );
            case 2:
                return (
                    <>
                        <ApplicationsTableUpdateBaseline
                            selectedApplications={selectedApplications}
                            onApplicationSelect={handleRowSelect}
                            onAllApplicationsSelect={handleSelectAllRows}
                        />
                        <SelectedApplicationsTable selectedApplications={selectedApplications} />
                    </>
                );
            case 3:
                return (
                    <>
                        <Typography sx={{ mt: 2, mb: 5, textAlign: 'center' }}> Please complete the following fields:</Typography>
                        <NewCHGForm onFormSave={handleSave} savedData={newCHGInfo} />
                    </>
                );
            default:
                return null;
        }
    };


    return (
        <Box sx={{ width: '99.5%', marginTop: '10px' }}>

            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );

                })}
            </Stepper>

            {activeStep === steps.length - 1 ? (

                <React.Fragment>
                    {/* {console.log(newAssetInfo, selectedPorts, selectedApplications, newCHGInfo)} */}

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, margin: "30px" }}>
                        <Button variant="outlined" color="primary" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1, paddingLeft: '200px', paddingRight: '200px' }}>
                            Previous
                        </Button>

                        <Box sx={{ flex: '1 1 auto' }} />

                        <Button variant="outlined" color="primary" onClick={handleFinish} sx={{ mr: 1, paddingLeft: '200px', paddingRight: '200px' }}>
                            Finish
                        </Button>
                    </Box>

                    <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}> All steps completed - hit Finish to submit. </Typography>

                </React.Fragment>

            ) : (

                <React.Fragment>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, margin: "30px" }}>

                        <Button variant="outlined" color="primary" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1, paddingLeft: '200px', paddingRight: '200px' }}>
                            Previous
                        </Button>

                        <Box sx={{ flex: '1 1 auto' }} />

                        <Button variant="outlined" color="primary" onClick={handleNext} sx={{ mr: 1, paddingLeft: '200px', paddingRight: '200px' }}>
                            Next
                        </Button>

                    </Box>

                </React.Fragment>

            )}

            <br></br>

            {renderStep(activeStep)}

        </Box>
    );
}
