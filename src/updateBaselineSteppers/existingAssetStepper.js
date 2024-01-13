// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { FormControl, FormLabel } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';


import { AssetTableUpdateBaseline } from '../tables/updateBaselineTables/assetTable';
import SelectedAssetsTable from '../tables/updateBaselineTables/selectedTables/selectedAssetsTable';

import { PortsTableUpdateBaseline } from '../tables/updateBaselineTables/portsTable';
import SelectedPortsTable from '../tables/updateBaselineTables/selectedTables/selectedPortsTable';

import { ApplicationsTableUpdateBaseline } from '../tables/updateBaselineTables/applicationsTable';
import SelectedApplicationsTable from '../tables/updateBaselineTables/selectedTables/selectedApplicationsTable';

import SoftwareUpdatesTableUpdateBaseline from '../tables/updateBaselineTables/softwareUpdatesTable';

import SelectedAssetsEditableTable from '../tables/updateBaselineTables/selectedTables/selectedAssetsEditableTable';

import NewCHGForm from './forms/newCHGForm';



const steps = ['Change Control Information', 'Select Assets', 'Port Configuration', 'Applications Installed', 'Software Updates', 'Modify Status', 'Submit'];

export default function ExistingAssetStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const [changeControlRadio, setChangeControlRadio] = useState("");
  const [newCHGInfo, setNewCHGInfo] = useState({});

  const [selectedAssets, setSelectedAssets] = useState([]);

  const [selectedPortRadio, setSelectedPortRadio] = useState("");
  const [selectedPorts, setSelectedPorts] = useState([]);

  const [selectedApplicationRadio, setSelectedApplicationRadio] = useState("");
  const [selectedApplications, setSelectedApplications] = useState([]);

  const [softwareUpdatesRadio, setSoftwareUpdatesRadio] = useState("");
  const [softwareUpdates, setSoftwareUpdates] = useState([]);

  const [statusRadio, setStatusRadio] = useState("");



  const handleSave = (formInputs) => {
    if (activeStep === 0) setNewCHGInfo(formInputs);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleFinish = async () => {
    await changeAssets();

    let isChangeControl = false;
    let chg_ticket = "";

    if (changeControlRadio != "") {
      chg_ticket = newCHGInfo.ChangeControl;
      isChangeControl = true;
    }

    setActiveStep(0);

    setChangeControlRadio("");
    setNewCHGInfo({});

    setSelectedAssets([]);

    setSelectedPorts([]);
    setSelectedPortRadio("");

    setSelectedApplications([]);
    setSelectedApplicationRadio("");

    setSoftwareUpdates([]);
    setSoftwareUpdatesRadio("");

    setStatusRadio("");

    // Redirect to another page after all the operations are complete
    if (isChangeControl) {
      window.location.replace(`/changeControls/${chg_ticket}`);
    } else {
      window.location.replace('/updateBaseline');
    }
    
  };


  const changeAssets = async () => {
    try {

      // 1. Establish list of assets to modify
      const selectedAssetIds = selectedAssets.map(asset => asset.id);


      // 2a. Check if this update to the Baseline is a change control
      if (changeControlRadio === "Yes") {

        // 2b. Send CHG info
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

        const CHGresponse = await fetch('http://localhost:3001/ChangeControls/insertCHG', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(CHGData)
        });

        await CHGresponse.json();

        console.log(CHGData);
      }


      // 3a. Check if there are ports changes
      if (selectedPortRadio === "Yes") {

        // 3b. Get lists of ports to add
        const selectedPortIdsToAdd = selectedPorts
          .filter(port => port.add_remove === "Add")
          .map(port => port.id);

        // 3b.1. If there are ports to add, fetch request and insert
        if (selectedPortIdsToAdd.length > 0) {
          const portDataToAdd = {
            asset_ids: selectedAssetIds,
            port_ids: selectedPortIdsToAdd
          };

          const portAddResponse = await fetch('http://localhost:3001/AssetInventory/insertPorts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(portDataToAdd)
          });

          await portAddResponse.json();
        }

        // 3c. Get list of ports to remove
        const selectedPortIdsToRemove = selectedPorts
          .filter(port => port.add_remove === "Remove")
          .map(port => port.id);

        // 3c.1. If there are ports to remove, fetch request and remove
        if (selectedPortIdsToRemove.length > 0) {
          const portDataToRemove = {
            asset_ids: selectedAssetIds,
            port_ids: selectedPortIdsToRemove
          };

          const portRemoveResponse = await fetch('http://localhost:3001/AssetInventory/removePorts', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(portDataToRemove)
          });

          await portRemoveResponse.json();
        }

      }



      // 4a. Check if there are applications to update/install/remove
      if (selectedApplicationRadio === "Yes") {

        // 4b. Get list of Applications to add, along with their new versions/dates
        const selectedApplicationIdsToAdd = selectedApplications
          .filter(application => application.add_upgrade_remove === "Add")
          .map(application => application.id);

        const selectedApplicationVersionsToAdd = selectedApplications
          .filter(application => application.add_upgrade_remove === "Add")
          .map(application => application.version);

        const selectedApplicationDatesToAdd = selectedApplications
          .filter(application => application.add_upgrade_remove === "Add")
          .map(application => application.initial_install);

        const selectedApplicationUpgradesToAdd = selectedApplications
          .filter(application => application.add_upgrade_remove === "Add")
          .map(application => application.upgrade_date);



        // 4b.1. If there are Applications to add, fetch request and insert
        if (selectedApplicationIdsToAdd.length > 0) {
          const applicationDataToAdd = {
            asset_ids: selectedAssetIds,
            application_ids: selectedApplicationIdsToAdd,
            application_versions: selectedApplicationVersionsToAdd,
            application_install_dates: selectedApplicationDatesToAdd,
            application_upgrade_dates: selectedApplicationUpgradesToAdd
          };

          const applicationAddResponse = await fetch('http://localhost:3001/AssetInventory/insertApplications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(applicationDataToAdd)
          });

          await applicationAddResponse.json();
        }

        // 4c. Get list of Applications to upgrade, along with their new versions/dates
        const selectedApplicationIdsToUpgrade = selectedApplications
          .filter(application => application.add_upgrade_remove === "Upgrade")
          .map(application => application.id);

        const selectedApplicationVersionsToUpgrade = selectedApplications
          .filter(application => application.add_upgrade_remove === "Upgrade")
          .map(application => application.version);

        const selectedApplicationDatesToUpgrade = selectedApplications
          .filter(application => application.add_upgrade_remove === "Upgrade")
          .map(application => application.initial_install);

        const selectedApplicationUpgradesToUpgrade = selectedApplications
          .filter(application => application.add_upgrade_remove === "Upgrade")
          .map(application => application.upgrade_date);


        // 4c.1. If there are Applications to upgrade, fetch request and insert
        if (selectedApplicationIdsToUpgrade.length > 0) {
          const applicationDataToUpgrade = {
            asset_ids: selectedAssetIds,
            application_ids: selectedApplicationIdsToUpgrade,
            application_versions: selectedApplicationVersionsToUpgrade,
            application_install_dates: selectedApplicationDatesToUpgrade,
            application_upgrade_dates: selectedApplicationUpgradesToUpgrade
          };

          const applicationUpgradeResponse = await fetch('http://localhost:3001/AssetInventory/updateApplications', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(applicationDataToUpgrade)
          });

          await applicationUpgradeResponse.json();
        }

        // 4d. Get list of Applications to remove
        const selectedApplicationIdsToRemove = selectedApplications
          .filter(application => application.add_upgrade_remove === "Remove")
          .map(application => application.id);

        // 4d.1. If there are Applications to remove, fetch request and insert
        if (selectedApplicationIdsToRemove.length > 0) {
          const applicationDataToRemove = {
            asset_ids: selectedAssetIds,
            application_ids: selectedApplicationIdsToRemove
          };

          const applicationRemoveResponse = await fetch('http://localhost:3001/AssetInventory/removeApplications', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(applicationDataToRemove)
          });

          await applicationRemoveResponse.json();
        }
      }


      // 5a. Check if there are software updates to add
      if (softwareUpdatesRadio === "Yes") {

        // 5b. Get all the software updates to add, along with their columns
        const softwareUpdatesPatchVersions = softwareUpdates
          .map(softwareUpdate => softwareUpdate.patch_version);

        const softwareUpdatesSources = softwareUpdates
          .map(softwareUpdate => softwareUpdate.source);

        const softwareUpdatesAssetTypes = softwareUpdates
          .map(softwareUpdate => softwareUpdate.asset_type);

        const softwareUpdatesModels = softwareUpdates
          .map(softwareUpdate => softwareUpdate.model);

        const softwareUpdatesOS = softwareUpdates
          .map(softwareUpdate => softwareUpdate.os);

        const softwareUpdatesDatesReviewed = softwareUpdates
          .map(softwareUpdate => softwareUpdate.date_reviewed);

        const softwareUpdatesDatesInstalled = softwareUpdates
          .map(softwareUpdate => softwareUpdate.date_installed);

        const softwareUpdatesChangeControls = softwareUpdates
          .map(softwareUpdate => softwareUpdate.CHG_ticket);

        const softwareUpdatesNotes = softwareUpdates
          .map(softwareUpdate => softwareUpdate.notes);


        // const softwareUpdateData = {
        //   asset_ids:       selectedAssetIds,
        //   patch_versions:  softwareUpdatesPatchVersions,
        //   sources:         softwareUpdatesSources,
        //   asset_types:     softwareUpdatesAssetTypes,
        //   models:          softwareUpdatesModels,
        //   OSs:             softwareUpdatesOS,
        //   dates_reviewed:  softwareUpdatesDatesReviewed,
        //   dates_installed: softwareUpdatesDatesInstalled,
        //   change_controls: softwareUpdatesChangeControls,
        //   notes:           softwareUpdatesNotes
        // }

        // const softwareUpdateResponse = await fetch('http://localhost:3001/AssetInventory/insertSoftwareUpdate', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(softwareUpdateData)
        // });

        const softwareUpdateData = softwareUpdates.map(softwareUpdate => {
          const softwareUpdateObject = {
            asset_ids:        softwareUpdate.assetIds, // Array of asset IDs for this software update
            patch_version:    softwareUpdate.patch_version,
            source:           softwareUpdate.source,
            model:            softwareUpdate.model,
            os:               softwareUpdate.os,
            date_reviewed:    softwareUpdate.date_reviewed,
            date_installed:   softwareUpdate.date_installed,
            CHG_ticket:       softwareUpdate.CHG_ticket,
            notes:            softwareUpdate.notes
          };
          console.log(softwareUpdateObject);
          return softwareUpdateObject;
        });

        console.log(softwareUpdateData);

        
        
        const softwareUpdateResponse = await fetch('http://localhost:3001/AssetInventory/insertSoftwareUpdate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(softwareUpdateData),
        });

        await softwareUpdateResponse.json();

      }


      // 6a. Check if status of assets should be modified
      if (statusRadio === "Yes") {

        // 6b. Overwrite old info with changes by sending the selectedAssets back to the server
        // select from asset_inventory by asset id's, set row=selectedAsset[i]

        // 5b. Get all the software updates to add, along with their columns
        const assetStatuses = selectedAssets
          .map(asset => asset.status);

        const assetSerialNumbers = selectedAssets
          .map(asset => asset.serial_number);

        const assetNames = selectedAssets
          .map(asset => asset.name);

        const assetIPs = selectedAssets
          .map(asset => asset.IPs);

        const assetOSs = selectedAssets
          .map(asset => asset.OS);

        const assetTeams = selectedAssets
          .map(asset => asset.team);

        const assetTechOwners = selectedAssets
          .map(asset => asset.tech_owner);

        const assetModelTypes = selectedAssets
          .map(asset => asset.model_type);

        const assetManufacturers = selectedAssets
          .map(asset => asset.manufacturer);

        const assetModels = selectedAssets
          .map(asset => asset.model);

        const assetGroups = selectedAssets
          .map(asset => asset.group);

        const assetBESClasses = selectedAssets
          .map(asset => asset.bes_class);

        const assetImpactRatings = selectedAssets
          .map(asset => asset.impact_rating);

        const assetRacks = selectedAssets
          .map(asset => asset.rack);

        const assetLocations = selectedAssets
          .map(asset => asset.location);

        const assetPSPIDs = selectedAssets
          .map(asset => asset.psp_id);

        const assetESPIDs = selectedAssets
          .map(asset => asset.esp_id);

        const assetFunctions = selectedAssets
          .map(asset => asset.function);

        const assetCcommissionDates = selectedAssets
          .map(asset => asset.commission_date);

        const assetDecommissionDates = selectedAssets
          .map(asset => asset.decommission_date);


        const assetUpdateStatusData = {
          asset_ids: selectedAssetIds,
          names: assetNames,
          serial_numbers: assetSerialNumbers,
          IPs: assetIPs,
          OSs: assetOSs,
          teams: assetTeams,
          tech_owners: assetTechOwners,
          model_types: assetModelTypes,
          manufacturers: assetManufacturers,
          models: assetModels,
          groups: assetGroups,
          bes_classes: assetBESClasses,
          impact_ratings: assetImpactRatings,
          racks: assetRacks,
          locations: assetLocations,
          psp_ids: assetPSPIDs,
          esp_ids: assetESPIDs,
          functions: assetFunctions,
          statuses: assetStatuses,
          commission_dates: assetCcommissionDates,
          decommission_dates: assetDecommissionDates
        }

        const assetUpdateStatusResponse = await fetch('http://localhost:3001/AssetInventory/update/:id', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(assetUpdateStatusData)
        });

        await assetUpdateStatusResponse.json();
      }


    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRowSelect = (row, isSelected) => {
    if (isSelected) {
      if (activeStep === 1) setSelectedAssets((prevSelectedRows) => [...prevSelectedRows, row]);
      if (activeStep === 2) setSelectedPorts((prevSelectedRows) => [...prevSelectedRows, row]);
      if (activeStep === 3) setSelectedApplications((prevSelectedRows) => [...prevSelectedRows, row]);
    } else {
      if (activeStep === 1) setSelectedAssets((prevSelectedRows) => prevSelectedRows.filter((selectedRow) => selectedRow.id !== row.id));
      if (activeStep === 2) setSelectedPorts((prevSelectedRows) => prevSelectedRows.filter((selectedRow) => selectedRow.id !== row.id));
      if (activeStep === 3) setSelectedApplications((prevSelectedRows) => prevSelectedRows.filter((selectedRow) => selectedRow.id !== row.id));
    }
  };

  const handleAddRow = (rows) => {
    if (!Array.isArray(rows)) {
      rows = [rows];
    }
    if (activeStep === 1) setSelectedAssets((prevSelectedRows) => [...prevSelectedRows, ...rows]);
    if (activeStep === 2) setSelectedPorts((prevSelectedRows) => [...prevSelectedRows, ...rows]);
    if (activeStep === 3) setSelectedApplications((prevSelectedRows) => [...prevSelectedRows, ...rows]);
  };

  const handleRemoveRow = (rows) => {
    if (!Array.isArray(rows)) {
      rows = [rows];
    }
    if (activeStep === 1) setSelectedAssets((prevSelectedRows) => prevSelectedRows.filter((selectedRow) => !rows.some((row) => row.id === selectedRow.id)));
    if (activeStep === 2) setSelectedPorts((prevSelectedRows) => prevSelectedRows.filter((selectedRow) => !rows.some((row) => row.id === selectedRow.id)));
    if (activeStep === 3) setSelectedApplications((prevSelectedRows) => prevSelectedRows.filter((selectedRow) => !rows.some((row) => row.id === selectedRow.id)));
  };

  const handleSelectAllRows = (isSelected, rows) => {
    if (isSelected) {
      handleAddRow(rows);
    } else {
      handleRemoveRow(rows);
    }
  };

  function handleRadioChange(event) {
    if (activeStep === 0) setChangeControlRadio(event.target.value);
    if (activeStep === 2) setSelectedPortRadio(event.target.value);
    if (activeStep === 3) setSelectedApplicationRadio(event.target.value);
    if (activeStep === 4) setSoftwareUpdatesRadio(event.target.value);
    if (activeStep === 5) setStatusRadio(event.target.value);
  }

  const handleAddSoftwareUpdateRow = () => {
    const newSoftwareUpdate = {
      id: new Date().getTime(), // Generate a unique ID for the new software update

      // other properties for the new software update
      delete: (
        <span>
          <IconButton aria-label="delete" size="small" onClick={() => handleRemoveSoftwareUpdateRow(newSoftwareUpdate)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </span>
      ),
      assets_selected_count: selectedAssets.length,
      patch_version: "",
      source: softwareUpdates[0] ? softwareUpdates[0].source : "",
      model: "",
      os: "",
      date_reviewed: softwareUpdates[0] ? softwareUpdates[0].date_reviewed : "",
      date_installed: "",
      CHG_ticket: newCHGInfo.ChangeControl !== undefined && newCHGInfo.ChangeControl !== null ? newCHGInfo.ChangeControl : "",
      notes: softwareUpdates[0] ? softwareUpdates[0].notes : "",
      assetIds: selectedAssets.map((asset) => asset.id)
    };

    setSoftwareUpdates(prevUpdates => [...prevUpdates, newSoftwareUpdate]);
  };


  const handleRemoveSoftwareUpdateRow = (rowToRemove) => {
    setSoftwareUpdates(prevUpdates => prevUpdates.filter(row => row.id !== rowToRemove.id));
  };

  

  // Render the current step based on the activeStep
  const renderStep = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography sx={{ mt: 2, mb: 3, textAlign: 'center' }}>Is this a Change Control?</Typography>

            <FormControl style={{ marginLeft: '46%', marginBottom: '30px', textAlign: 'center' }}>
              <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
              <RadioGroup
                value={changeControlRadio}
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={handleRadioChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {changeControlRadio === "Yes" ? (
              <>
                <Typography sx={{ mt: 2, mb: 5, textAlign: 'center' }}> Please complete the following fields:</Typography>
                <NewCHGForm onFormSave={handleSave} savedData={newCHGInfo} />
              </>
            ) : (
              <p></p>
            )}
          </>
        );
      case 1:
        if (selectedAssets.length > 0) {
          return (
            <>
              <AssetTableUpdateBaseline
                selectedAssets={selectedAssets}
                onRowSelect={handleRowSelect}
                onAllRowsSelect={handleSelectAllRows}
              />
              <SelectedAssetsTable selectedAssets={selectedAssets} />
            </>
          );
        } else {
          return (
            <>
              <AssetTableUpdateBaseline
                selectedAssets={selectedAssets}
                onRowSelect={handleRowSelect}
                onAllRowsSelect={handleSelectAllRows}
              />
              <h4> &nbsp; Showing 0 assets selected — please select assets to continue.</h4>
            </>
          );
        }
      case 2:
        return (
          <>
            <Typography sx={{ mt: 2, mb: 3, textAlign: 'center' }}>Are there changes to Port Configurations?</Typography>

            <FormControl style={{ marginLeft: '46%', marginBottom: '30px', textAlign: 'center' }}>
              <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
              <RadioGroup
                value={selectedPortRadio}
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={handleRadioChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {selectedPortRadio === "Yes" ? (
              <>
                <PortsTableUpdateBaseline
                  selectedPorts={selectedPorts}
                  onPortSelect={handleRowSelect}
                  onAllPortsSelect={handleSelectAllRows}
                />
                <SelectedPortsTable selectedPorts={selectedPorts} />
              </>
            ) : (
              <p></p>
            )}
          </>
        );
      case 3:
        return (
          <>
            <Typography sx={{ mt: 2, mb: 3, textAlign: 'center' }}>Are there changes to Applications Installed?</Typography>

            <FormControl style={{ marginLeft: '46%', marginBottom: '30px', textAlign: 'center' }}>
              <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
              <RadioGroup
                value={selectedApplicationRadio}
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={handleRadioChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {selectedApplicationRadio === "Yes" ? (
              <>
                <ApplicationsTableUpdateBaseline
                  selectedApplications={selectedApplications}
                  onApplicationSelect={handleRowSelect}
                  onAllApplicationsSelect={handleSelectAllRows}
                />
                <SelectedApplicationsTable selectedApplications={selectedApplications} />
              </>
            ) : (
              <p></p>
            )}
          </>
        );
      case 4:
        return (
          <>
            <Typography sx={{ mt: 2, mb: 3, textAlign: 'center' }}>Are there Software Updates?</Typography>

            <FormControl style={{ marginLeft: '46%', marginBottom: '30px', textAlign: 'center' }}>
              <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
              <RadioGroup
                value={softwareUpdatesRadio}
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={handleRadioChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {softwareUpdatesRadio === "Yes" ? (
              <>
                <br></br>
                <Typography sx={{ mt: 2, mb: 3, textAlign: 'center' }}>If "Asset Type" is Physical, patches will map to assets by Models.</Typography>
                <Typography sx={{ mt: 2, mb: 3, textAlign: 'center' }}>If "Asset Type" is Virtual, patches will map to assets by OS Versions.</Typography>
                <br></br>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddSoftwareUpdateRow}
                  style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '46%' }}
                >
                  Add Row
                </Button>
                <SoftwareUpdatesTableUpdateBaseline
                  softwareUpdates={softwareUpdates}
                  selectedAssets={selectedAssets} 
                />
              </>
            ) : (
              <p></p>
            )}       
          </>
        );
      case 5:
        return (
          <>
            <Typography sx={{ mt: 2, mb: 3, textAlign: 'center' }}>Are there changes to Assets' Status?</Typography>

            <FormControl style={{ marginLeft: '46%', marginBottom: '30px', textAlign: 'center' }}>
              <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
              <RadioGroup
                value={statusRadio}
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={handleRadioChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {statusRadio === "Yes" ? (
              <>
                <SelectedAssetsEditableTable selectedAssets={selectedAssets} />
              </>
            ) : (
              <p></p>
            )}
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

            <Button variant="outlined"
              color="primary"
              disabled={(activeStep === 1 && selectedAssets.length === 0) || (activeStep === 2 && selectedPortRadio === "")
                || (activeStep === 3 && selectedApplicationRadio === "") || (activeStep === 4 && softwareUpdatesRadio === "")
                || (activeStep === 5 && statusRadio === "") || (activeStep === 0 && changeControlRadio === "")}
              onClick={handleNext}
              sx={{ mr: 1, paddingLeft: '200px', paddingRight: '200px' }}
            >
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
