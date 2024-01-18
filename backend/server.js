require('dotenv').config();
const express         = require('express');
const cors            = require('cors');
const multer          = require('multer'); // Middleware for handling file uploads
const path            = require('path');
const fs              = require('fs');
const { v4: uuidv4 }  = require('uuid'); // For generating unique file names

const dbAPI           = require('./dbAPI');

const app             = express();
const port            = process.env.BACKEND_PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for cross-origin requests
app.use(cors());

// Start the server
function startServer(port) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      // Port is already in use, try the next one
      console.log(`Port ${port} is already in use. Trying the next port...`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
}

startServer(port);




// FOR TESTING CONNECTION TO THE DATABASE //


const { Pool }      = require('pg');
const config        = require('./dbConfig');


// Create a pool to manage database connections
const pool = new Pool(config);
const poolConnect = pool.connect();

// Test the database connection
poolConnect
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });




// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder within your project directory
    cb(null, '../src/Evidence_Screenshots/');
  },
  filename: function (req, file, cb) {
    let originalFileName = file.originalname;
    let filePath = path.join('../src/Evidence_Screenshots/', originalFileName);

    // Check if the file with the same name already exists
    if (fs.existsSync(filePath)) {
      // If a file with the same name exists, add an incrementing count
      let count = 1;
      let baseName = path.basename(originalFileName, path.extname(originalFileName));
      let extension = path.extname(originalFileName);

      while (fs.existsSync(filePath)) {
        originalFileName = `${baseName}(${count})${extension}`;
        filePath = path.join('../src/Evidence_Screenshots/', originalFileName);
        count++;
      }
    }

    cb(null, originalFileName);
  },
});

const upload = multer({ storage: storage });

// Define a POST endpoint for file uploads, and pass the filename back to the frontend as response
app.post('/upload', upload.single('file'), (req, res) => {
  const generatedFileName = req.file.filename;
  res.json({ message: 'File uploaded successfully', fileName: generatedFileName });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});


// Route to get all assets in database
app.get('/AssetInventory', dbAPI.getAssets);

// Route to get a specific asset by its ID
app.get('/AssetInventory/:id', dbAPI.getAssetById);

// Route to get an asset's ports
app.get('/AssetInventory/:id/ports', dbAPI.getPortsPerAsset);

// Route to get an asset's applications
app.get('/AssetInventory/:id/applications', dbAPI.getApplicationsPerAsset);

// Route to get an asset's software updates
app.get('/AssetInventory/:id/softwareUpdates', dbAPI.getUpdatesPerAsset);



// Route to get list of all Change Controls
app.get('/ChangeControls', dbAPI.getChangeControls);

// Route to get a change control ticket patches
app.get('/ChangeControls/:CHG_ticket/patches', dbAPI.getChangeControlPatches);

// Route to get a change control ticket info
app.get('/ChangeControls/:CHG_ticket/info', dbAPI.getChangeControlInfo);




// Route to get list of all Software Updates
app.get('/SoftwareUpdates', dbAPI.getAllSoftwareUpdates);
  
// Route to get all assets affected by a certain software update
app.get('/SoftwareUpdates/:patch_version', dbAPI.getAssetsPerUpdate);




// Route to insert a new asset
app.post('/AssetInventory/insert', dbAPI.insertAsset);

// Route to get list of all ports 
app.get('/Ports', dbAPI.getAllPorts);

// Route to get list of all applications
app.get('/Applications', dbAPI.getAllApplications);

// Route to insert an asset's or multiple assets' ports
app.post('/AssetInventory/insertPorts', dbAPI.insertAssetPorts);

// Route to insert a new asset's applications
app.post('/AssetInventory/insertApplications', dbAPI.insertAssetApplications);

// Route to insert a new asset's Change Control
app.post('/ChangeControls/insertCHG', dbAPI.insertCHG);

// Route to insert an existing asset's Software Update
app.post('/AssetInventory/insertSoftwareUpdate', dbAPI.insertSoftwareUpdate);


// Route to update an asset's or multiple assets' applications
app.put('/AssetInventory/updateApplications', dbAPI.updateAssetApplications);

// Route to update an asset by its ID
app.put('/AssetInventory/update/:id', dbAPI.updateAssetById);




// Route to delete an asset by its ID
app.delete('/AssetInventory/delete/:id', dbAPI.deleteAssetById);

// Route to remove an asset's or multiple assets' ports
app.delete('/AssetInventory/removePorts', dbAPI.removeAssetPorts);

// Route to remove an asset's or muultiple assets' applications
app.delete('/AssetInventory/removeApplications', dbAPI.removeAssetApplications);



