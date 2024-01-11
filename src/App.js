import React from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";

import Sidenav from './navigation/sideNavBar/sidenav';
import AssetsPage from './pages/assetInventoryPages/assetsPage';
import ChangeControlsPage from './pages/changeControlPages/changeControlsPage';
import SoftwareUpdatesPage from './pages/softwareUpdatesPages/softwareUpdatesPage';
import ViewAsset from './pages/assetInventoryPages/viewAsset';
import ViewChangeControl from './pages/changeControlPages/viewChangeControl';
import ViewSoftwareUpdate from './pages/softwareUpdatesPages/viewSoftwareUpdate';
import UpdateBaselinePage from './pages/updateBaselinePages/updateBaselinePage';
import InsertNewAsset from './pages/updateBaselinePages/insertNewAsset';
import SelectExistingAssets from './pages/updateBaselinePages/selectExistingAssets';
import PdfReportsPage from './pages/pdfReportsPages/pdfReportsPage';


function App() {
  return (
    <div className="App">


      <Sidenav />

      <main>
        <Routes>
          <Route path="/" element={<AssetsPage />} />
          <Route path="/changeControls" element={<ChangeControlsPage />} />
          <Route path="/softwareUpdates" element={<SoftwareUpdatesPage />} />
          <Route path="/updateBaseline" element={<UpdateBaselinePage />} />
          <Route path="/pdfReports" element={<PdfReportsPage />} />
          <Route path="/:id" element={<ViewAsset />} />
          <Route path="/changeControls/:CHG_ticket" element={<ViewChangeControl />} />
          <Route path="/softwareUpdates/:patch_version" element={<ViewSoftwareUpdate />} />
          <Route path="/updateBaseline/newAsset" element={<InsertNewAsset />} />
          <Route path="/updateBaseline/existingAssets" element={<SelectExistingAssets />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;
