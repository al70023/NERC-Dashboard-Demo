const { Pool } = require('pg');
const config = require('./dbConfig')

// Create a pool to manage database connections
const pool = new Pool(config);


// * SQL DATABASE TABLE CALLS * //








// ----------- GETTERS ------------ //


// Get the full list of Asset Inventory 
// -- Used in Asset Inventory homepage table
const getAssets = async (req, res) => {
  try {
    const client = await pool.connect();
    const results = await client.query("SELECT * FROM Asset_Inventory;");
    await res.json(results.rows);
    await client.release();
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


// Get a specific asset from the Asset Inventory by unique id
// -- used in asset_inventory page : view specific asset when clicking on one
const getAssetById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await pool.connect();

    try {
      // Define the SQL query to get the asset by ID
      const query = 'SELECT * FROM Asset_Inventory WHERE id = $1;';
  
      // Execute the query
      const result = await client.query(query, [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Asset not found' });
      }
  
      res.json(result.rows[0]);
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get all the ports attached to a specific asset
// -- Used in View specific asset from asset Inventory home page when clicking on an asset
const getPortsPerAsset = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await pool.connect();

    // Define the SQL query to get the asset by ID
    const query = `
      SELECT 
        Ports.number,
        Ports.name,
        Ports.allows,
        Ports.description,
        Ports_to_Asset.justification,
        Ports_to_Asset.vendor_docs
      FROM 
        Ports_to_Asset
      INNER JOIN
        Ports ON Ports.id = Ports_to_Asset.port_id
      INNER JOIN
        Asset_Inventory ON Asset_Inventory.id = Ports_to_Asset.asset_id
      WHERE asset_id = $1;`;

    // Execute the query
    const result = await client.query(query, [id]);

    // no error if results === 0, so that table will still render if the port list is empty
    await res.json(result.rows);
    await client.release();
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



// Get all the applications attached to a specific asset
// -- Used in View specific asset from asset Inventory home page when clicking on an asset
const getApplicationsPerAsset = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await pool.connect();

    // Define the SQL query to get the asset by ID
    const query = `
      SELECT 
        Applications.name,
        Applications.type,
        Applications_to_Asset.version,
        Applications_to_Asset.initial_install,
        Applications_to_Asset.upgrade_date
      FROM 
        Applications_to_Asset
      INNER JOIN
        Applications ON Applications.id = Applications_to_Asset.application_id
      INNER JOIN
        Asset_Inventory ON Asset_Inventory.id = Applications_to_Asset.asset_id
      WHERE asset_id = $1;`;

    // Execute the query
    const result = await client.query(query, [id]);

    // no error if results === 0, so that the table will still render if the apps list is empty
    await res.json(result.rows);
    await client.release();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




// Get all the software updates attached to a specific asset
// -- Used in View specific asset from asset Inventory home page when clicking on an asset
const getUpdatesPerAsset = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await pool.connect();

    // Define the SQL query to get the asset by ID
    const query = `
      SELECT 
        Software_Updates_to_Asset.patch_version,
        Software_Updates_to_Asset.source,
        Software_Updates_to_Asset.model,
        Software_Updates_to_Asset."OS",
        Software_Updates_to_Asset.date_reviewed,
        Software_Updates_to_Asset.date_installed,
        Software_Updates_to_Asset."CHG_ticket",
        Software_Updates_to_Asset.notes
      FROM 
        Software_Updates_to_Asset
      INNER JOIN
        Asset_Inventory ON Asset_Inventory.id = Software_Updates_to_Asset.asset_id
      WHERE 
        asset_id = $1
      ORDER BY
        Software_Updates_to_Asset.date_installed DESC;`;

    // Execute the query
    const result = await client.query(query, [id]);

    // no error if results === 0, so that the table will still render if the updates list is empty
    await res.json(result.rows);
    await client.release();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



// Get the full list of all UNIQUE Change Controls found in the baseline
// -- Used in Change Controls tab page
const getChangeControls = async (req, res) => {
  try {
    const client = await pool.connect();

    let results = await client.query(`
      SELECT
        Change_Controls."CHG_number",
        Change_Controls."CHG_date",
        COUNT(DISTINCT Software_Updates_to_Asset.patch_version) AS patches_included,
        Change_Controls.security_update
      FROM
        Change_Controls
      LEFT JOIN
        Software_Updates_to_Asset ON Software_Updates_to_Asset."CHG_ticket" = Change_Controls."CHG_number"
      GROUP BY
        Change_Controls."CHG_number",
        Change_Controls."CHG_date",
        Change_Controls.security_update
      ORDER BY
        Change_Controls."CHG_date";`
    );

    await res.json(results.rows);
    await client.release();
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}





// Get a specific Change Control's patches/KB's that it encompasses
// -- Used in Change Controls page when clicking on a Change Control to view its detailed specific page
const getChangeControlPatches = async (req, res) => {
  try {
    const CHG_ticket = req.params.CHG_ticket;
    const client = await pool.connect();

    // Define the SQL query to get the asset by ID
    const query = `
      SELECT DISTINCT 
          Software_Updates_to_Asset.patch_version, 
          Software_Updates_to_Asset.source, 
          Software_Updates_to_Asset.date_reviewed, 
          Software_Updates_to_Asset.date_installed,			
          Software_Updates_to_Asset."CHG_ticket",
          Software_Updates_to_Asset.notes
      FROM 
          Change_Controls
      LEFT JOIN
          Software_Updates_to_Asset ON Change_Controls."CHG_number" = Software_Updates_to_Asset."CHG_ticket"
      WHERE 
          "CHG_number" = $1
      ORDER BY 
          date_reviewed DESC;`;


    // Execute the query
    const result = await client.query(query, [CHG_ticket]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Change Control ticket not found' });
    }

    await res.json(result.rows);
    await client.release();

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Get a specific Change Control's information 
// -- Used in Change Controls page when clicking on a Change Control to view its detailed specific page
const getChangeControlInfo = async (req, res) => {
  try {
    const CHG_ticket = req.params.CHG_ticket;
    const client = await pool.connect();

    // Define the SQL query to get the asset by ID
    const query = `SELECT * FROM Change_Controls WHERE "CHG_number" = $1;`;

    // Execute the query
    const result = await client.query(query, [CHG_ticket]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Change Control ticket not found' });
    }

    await res.json(result.rows);
    await client.release();

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




// Get the full list of all UNIQUE Software Updates found in the baseline
// -- Used in Software Updates tab page
const getAllSoftwareUpdates = async (req, res) => {
  try {
    const client = await pool.connect();

    const results = await client.query(`
      SELECT DISTINCT
          Software_Updates_to_Asset."patch_version",
          Software_Updates_to_Asset."source",
          Software_Updates_to_Asset.model,
          Software_Updates_to_Asset."OS",
          Software_Updates_to_Asset.date_reviewed,
          Software_Updates_to_Asset.date_installed,
          Software_Updates_to_Asset."CHG_ticket",
          Software_Updates_to_Asset.notes
      FROM 
          Software_Updates_to_Asset
      INNER JOIN
          Asset_Inventory ON Asset_Inventory.id = Software_Updates_to_Asset.asset_id
      WHERE 
          Software_Updates_to_Asset."patch_version" != 'No applicable updates'
      ORDER BY 
          Software_Updates_to_Asset."patch_version" DESC;`
    );

    await res.json(results.rows);
    await client.release();

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



// Get list of all of the assets that a certain software update has affected
// -- Used in Software Updates page, view specific software update
getAssetsPerUpdate = async (req, res) => {
  try {
    const patch_version = req.params.patch_version;

    const client = await pool.connect();

    // Define the SQL query to get the asset by ID
    const query = `
      SELECT 
          Asset_Inventory."name",
          Asset_Inventory."group",
          Asset_Inventory."IPs",
          Asset_Inventory.model_type,
          Asset_Inventory."function",
          Software_Updates_to_Asset.date_reviewed,
          Software_Updates_to_Asset.date_installed,
          Software_Updates_to_Asset."CHG_ticket",
          Asset_Inventory.id
      FROM 
          Software_Updates_to_Asset
      INNER JOIN
          Asset_Inventory ON Asset_Inventory.id = Software_Updates_to_Asset.asset_id
      WHERE 
          Software_Updates_to_Asset.patch_version = $1;`;

    // Execute the query
    const result = await client.query(query, [patch_version]);

    // no error if results === 0, so that table will still render if empty list
    await res.json(result.rows);
    await client.release();

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}





// Get full list of ports from Ports table, which is a unique list of ports that can be attached to assets
const getAllPorts = async (req, res) => {
  try {
    const client = await pool.connect();

    const results = await client.query(`SELECT *, '' AS "add_remove" FROM Ports;`);

    await res.json(results.rows);
    await client.release();

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


// Get full list of applications from Applications table, which is a unique list of applications that can be attached to assets
// -- this chooses the first version of each unique application in the application table, as some applications repeat with different versions
// -- Used in UpdateBaselineStepper NewAssetInsert.js for selecting applications to add to your new asset
const getAllApplications = async (req, res) => {
  try {
    const client = await pool.connect();

    let results = await client.query(`
      SELECT id,
        "name",
        "type",
        '' AS "version",
        '' AS "initial_install",
        '' AS "upgrade_date",
        '' AS "add_upgrade_remove"
      FROM Applications 
      ORDER BY "name" 
      ASC;`
    )

    await res.json(results.rows);
    await client.release();

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


// ------------------------------------- END OF GETTERS -------------------------------------------- //






// -------------------------------------- INSERTERS ----------------------------------------------- //


// Insert a new asset into SQL database based on passed in optional parameters
// Also return the asset_id generated by the SQL table as a response to be used for other queries/functions
// -- Used in UpdateBaselineStepper NewAssetStepper.js
const insertAsset = async (req, res) => {
  try {

    const client = await pool.connect();

    const {
      SerialNumber,
      Name,
      IPs,
      Function,
      Type,
      Manufacturer,
      Model,
      OS,
      Group,
      BESClass,
      Impact,
      Status,
      Rack,
      Location,
      PSPid,
      ESPid,
      Team,
      Owner,
      CommissionDate,
      DecommissionDate 
    } = req.body;

    // Define the SQL query
    const query = 
    `INSERT INTO Asset_Inventory 
      (
        "serial_number", 
        "name", 
        "IPs", 
        "function", 
        "model_type", 
        "manufacturer", 
        "model", 
        "OS", 
        "group", 
        "bes_class", 
        "impact_rating", 
        "status", 
        "rack", 
        "location", 
        "psp_id", 
        "esp_id", 
        "team", 
        "tech_owner", 
        "commission_date", 
        "decommission_date"
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING id;
    `;

    // Prepare the query parameters with the values from req.body
    const params = [
      SerialNumber,
      Name,
      IPs,
      Function,
      Type,
      Manufacturer,
      Model,
      OS,
      Group,
      BESClass,
      Impact,
      Status,
      Rack,
      Location,
      PSPid,
      ESPid,
      Team,
      Owner,
      CommissionDate || null,
      DecommissionDate || null,
    ];

    // Execute the query and get the inserted asset_id
    const result = await client.query(query, params);
    const inserted_asset_id = result.rows[0].id; // Assuming 'id' is the returning column from the INSERT statement

    // Close the client connection
    await client.release();

    // Respond with a success message
    res.status(200).json({ message: 'Asset inserted successfully.', inserted_asset_id });

  } catch (err) {
    client.release();
    console.error('Error inserting asset:', err.message);
    res.status(500).json({ message: 'Failed to insert asset.' });
  }
}






// Insert a new change control into SQL database based on passed in parameters
// -- Used in UpdateBaselineStepper NewAssetStepper.js and ExistingAssetStepper.js
const insertCHG = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      change_control,
      date_opened,
      security_update,
      security_review_date,
      description,
      test_approval_date,
      test_install_date,
      test_worknotes,
      prod_approval_date,
      prod_install_date,
      prod_worknotes,
      test_before_screenshot,
      test_after_screenshot,
      prod_before_screenshot,
      prod_after_screenshot
    } = req.body;

    const query = `
      INSERT INTO Change_Controls (
        "CHG_number", 
        "CHG_date",  
        security_update, 
        security_review_date, 
        description,
        test_approve_date, 
        test_install_date, 
        test_worknotes, 
        before_test_ss, 
        after_test_ss, 
        prod_approve_date, 
        prod_install_date, 
        prod_worknotes, 
        before_prod_ss, 
        after_prod_ss
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);
    `;

    // Prepare the values to be inserted
    const values = [
      change_control,
      date_opened,
      security_update,
      security_review_date || null,
      description,
      test_approval_date || null,
      test_install_date || null,
      test_worknotes,
      test_before_screenshot,
      test_after_screenshot,
      prod_approval_date || null,
      prod_install_date || null,
      prod_worknotes,
      prod_before_screenshot,
      prod_after_screenshot,
    ];

    // Execute the query with the values
    await client.query(query, values);

    // Release the client back to the pool
    client.release();

    // Respond with a success message
    res.status(200).json({ message: 'Change Control inserted successfully.' });
  } catch (err) {
    // Release the client back to the pool in case of error
    client.release();
    console.error('Error inserting change control:', err.message);
    res.status(500).json({ message: 'Failed to insert change control.' });
  }
};




const insertSoftwareUpdate = async (req, res) => {
  const client = await pool.connect();
  try {
    const softwareUpdates = req.body; // Array of software update objects

    for (const softwareUpdate of softwareUpdates) {
      const { asset_ids, patch_version, source, model, os, date_reviewed, date_installed, CHG_ticket, notes } = softwareUpdate;

      // Define the SQL query with parameterized values for PostgreSQL
      const query = `
        INSERT INTO Software_Updates_to_Asset 
        (asset_id, patch_version, source, model, "OS", date_reviewed, date_installed, "CHG_ticket", notes) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9);
      `;

      // Check if asset_ids is an array (multiple assets having their patches added)
      if (Array.isArray(asset_ids)) {
        // Nested loop for multiple asset_ids
        for (const asset_id of asset_ids) {
          const values = [
            asset_id,
            patch_version,
            source,
            model,
            os,
            date_reviewed || null,
            date_installed || null,
            CHG_ticket,
            notes,
          ];

          await client.query(query, values);
        }
      } else {
        // Single asset_id
        const values = [
          asset_ids,
          patch_version,
          source,
          model,
          os,
          date_reviewed || null,
          date_installed || null,
          CHG_ticket,
          notes,
        ];

        await client.query(query, values);
      }
    }

    // Release the client back to the pool
    client.release();

    // Respond with a success message
    res.status(200).json({ message: 'Software Updates inserted successfully.' });

  } catch (err) {
    // Release the client back to the pool in case of error
    client.release();
    console.error('Error inserting software updates:', err.message);
    res.status(500).json({ message: 'Failed to insert software updates.' });
  }
};






// Attach ports to an inserted asset in SQL database based on passed in parameters
// asset_id is fixed or an arry, ports_id is an array of port id's that the function loops thru to insert
// example: (asset_id, port_id_1)
//          (asset_id, port_id_2)
//          (asset_id, port_id_3)...
// -- Used in UpdateBaselineStepper NewAssetStepper.js
const insertAssetPorts = async (req, res) => {
  const client = await pool.connect();
  try {
    const { asset_ids, port_ids } = req.body;

    // Prepare the SQL query with parameterized values for PostgreSQL
    const query = `INSERT INTO Ports_to_Asset (asset_id, port_id) VALUES ($1, $2);`;

    // Check if asset_ids is an array (multiple assets having their ports added)
    if (Array.isArray(asset_ids)) {
      // Nested loop for multiple asset_ids
      for (const asset_id of asset_ids) {
        for (const port_id of port_ids) {
          await client.query(query, [asset_id, port_id]);
        }
      }
    } else {
      // Single asset_id
      for (const port_id of port_ids) {
        await client.query(query, [asset_ids, port_id]);
      }
    }

    client.release();

    res.status(200).json({ message: 'Ports attached successfully.' });

  } catch (err) {
    // Release the client back to the pool in case of error
    client.release();
    console.error('Error attaching ports:', err.message);
    res.status(500).json({ message: 'Failed to attach ports.' });
  }
};



// Attach applications to an inserted asset in SQL database based on passed in parameters
// asset_id is fixed or an array, applications_id, verions, dates are arrays that the function loops thru to insert
// The arrays should be parallel, so that application_id[2] corresponds to version[2]
// example: (asset_id, application_id_1, version 1.0, 10/2/2013)
//          (asset_id, application_id_2, version 3.5, 7/16/2019)
//          (asset_id, application_id_3, version 1.0, 10/2/2013)...
// -- Used in UpdateBaselineStepper NewAssetStepper.js (single asset_id)
// -- Also used in ExistingAssetStepper.js (can have multiple asset_id's)
const insertAssetApplications = async (req, res) => {
  const client = await pool.connect();
  try {
    const { asset_ids, application_ids, application_versions, application_install_dates, application_upgrade_dates } = req.body;

    // Prepare the SQL query with parameterized values for PostgreSQL
    const query = `INSERT INTO Applications_to_Asset 
      (asset_id, application_id, version, initial_install, upgrade_date) 
      VALUES ($1, $2, $3, $4, $5);`;

    // Check if asset_ids is an array (multiple assets having their applications added)
    if (Array.isArray(asset_ids)) {
      // Nested loop for multiple asset_ids
      for (const asset_id of asset_ids) {
        // Loop through the parallel arrays and insert each application
        for (let i = 0; i < application_ids.length; i++) {
          const values = [
            asset_id,
            application_ids[i],
            application_versions[i],
            application_install_dates[i] ? new Date(application_install_dates[i]) : null,
            application_upgrade_dates[i] ? new Date(application_upgrade_dates[i]) : null,
          ];

          // Execute the query for each application
          await client.query(query, values);
        }
      }
    } else {
      // Single asset_ids
      for (let i = 0; i < application_ids.length; i++) {
        const values = [
          asset_ids,
          application_ids[i],
          application_versions[i],
          application_install_dates[i] ? new Date(application_install_dates[i]) : null,
          application_upgrade_dates[i] ? new Date(application_upgrade_dates[i]) : null,
        ];

        // Execute the query for each application
        await client.query(query, values);
      }
    }

    // Release the client back to the pool
    client.release();

    // Respond with a success message
    res.status(200).json({ message: 'Applications attached successfully.' });

  } catch (err) {
    // Release the client back to the pool in case of error
    client.release();
    console.error('Error attaching applications:', err.message);
    res.status(500).json({ message: 'Failed to attach applications.' });
  }
};



// -------------------------------------- END OF INSERTERS -------------------------------------- //







// --------------------------------------- UPDATERS -------------------------------------------- //


// Update applications to an inserted asset in SQL database based on passed in parameters
// asset_id is fixed or an array, applications_id, verions, dates are arrays that the function loops thru to update
// The arrays should be parallel, so that application_id[2] corresponds to version[2]
// example: (asset_id, application_id_1, version 1.0, 10/2/2013)
//          (asset_id, application_id_2, version 3.5, 7/16/2019)
//          (asset_id, application_id_3, version 1.0, 10/2/2013)...
// -- Used in UpdateBaselineStepper NewAssetStepper.js (single asset_id)
// -- Also used in ExistingAssetStepper.js (can have multiple asset_id's)
const updateAssetApplications = async (req, res) => {
  const client = await pool.connect();
  try {
    const { asset_ids, application_ids, application_versions, application_install_dates, application_upgrade_dates } = req.body;

    // Prepare the SQL query with parameterized values for PostgreSQL
    const query = `
      UPDATE Applications_to_Asset 
      SET 
        version = $3,
        initial_install = $4,
        upgrade_date = $5 
      WHERE 
        asset_id = $1
      AND
        application_id = $2;
    `;

    // Check if asset_ids is an array (multiple assets having their applications upgraded)
    if (Array.isArray(asset_ids)) {
      // Nested loop for multiple asset_ids
      for (const asset_id of asset_ids) {
        // Loop through the parallel arrays and upgrade each application
        for (let i = 0; i < application_ids.length; i++) {
          const values = [
            asset_id,
            application_ids[i],
            application_versions[i],
            application_install_dates[i] ? new Date(application_install_dates[i]) : null,
            application_upgrade_dates[i] ? new Date(application_upgrade_dates[i]) : null,
          ];

          await client.query(query, values);
        }
      }
    } else {
      // Single asset_ids
      for (let i = 0; i < application_ids.length; i++) {
        const values = [
          asset_ids,
          application_ids[i],
          application_versions[i],
          application_install_dates[i] ? new Date(application_install_dates[i]) : null,
          application_upgrade_dates[i] ? new Date(application_upgrade_dates[i]) : null,
        ];

        await client.query(query, values);
      }
    }

    client.release();

    res.status(200).json({ message: 'Applications upgraded successfully.' });

  } catch (err) {
    // Release the client back to the pool in case of error
    client.release();
    console.error('Error upgrading applications:', err.message);
    res.status(500).json({ message: 'Failed to upgrade applications.' });
  }
};


// Update asset info in SQL database based on passed in parameters
// asset_id is array, all other parameters are columns of the asset to be updated that are parallel arrays
// The arrays should be parallel
// -- Used in ExistingAssetStepper.js (can have multiple asset_id's)
const updateAssetById = async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      asset_ids, names, serial_numbers, IPs, OSs, teams, tech_owners, model_types, manufacturers, models, groups, bes_classes, impact_ratings, racks, locations, psp_ids, esp_ids, functions, statuses,
      commission_dates, decommission_dates
    } = req.body;

    // Prepare the SQL query with parameterized values for PostgreSQL
    const query = `
      UPDATE Asset_Inventory 
      SET 
        "name" = $2,
        "serial_number" = $3,
        "IPs" = $4,
        "OS" = $5,
        "team" = $6,
        "tech_owner" = $7,
        "model_type" = $8,
        "manufacturer" = $9,
        "model" = $10,
        "group" = $11,
        "bes_class" = $12,
        "impact_rating" = $13,
        "rack" = $14,
        "location" = $15,
        "psp_id" = $16,
        "esp_id" = $17,
        "function" = $18,
        "status" = $19,
        "commission_date" = $20,
        "decommission_date" = $21
      WHERE 
        "id" = $1;
    `;

    for (let i = 0; i < asset_ids.length; i++) {
      const values = [
        asset_ids[i], names[i], serial_numbers[i], IPs[i], OSs[i], teams[i], tech_owners[i],
        model_types[i], manufacturers[i], models[i], groups[i], bes_classes[i], impact_ratings[i],
        racks[i], locations[i], psp_ids[i], esp_ids[i], functions[i], statuses[i],
        commission_dates[i] ? new Date(commission_dates[i]) : null,
        decommission_dates[i] ? new Date(decommission_dates[i]) : null
      ];

      await client.query(query, values);
    }

    client.release();

    res.status(200).json({ message: 'Asset info updated successfully.' });

  } catch (err) {
    // Release the client back to the pool in case of error
    client.release();
    console.error('Error updating assets:', err.message);
    res.status(500).json({ message: 'Failed to update assets.' });
  }
};


// ------------------------------------- END OF UPDATERS ---------------------------------------- //





// --------------------------------------- DELETERS ------==------------------------------------ //





const deleteAssetById = async (req, res) => {
  const client = await pool.connect();
  try {
    const id = req.params.id;

    // Define the SQL queries to delete the asset by ID
    await client.query('DELETE FROM Applications_to_Asset WHERE asset_id = $1;', [id]);
    await client.query('DELETE FROM Ports_to_Asset WHERE asset_id = $1;', [id]);
    await client.query('DELETE FROM Software_Updates_to_Asset WHERE asset_id = $1;', [id]);
    const result = await client.query('DELETE FROM Asset_Inventory WHERE "id" = $1;', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    client.release();
    res.status(200).json({ message: 'Asset deleted successfully.' });

  } catch (error) {
    client.release();
    console.error('Error deleting asset:', error.message);
    res.status(500).json({ error: 'Failed to delete asset.' });
  }
};







// Remove ports from an inserted asset in SQL database based on passed in parameters
// asset_id is fixed or array, ports_id is an array of port id's that the function loops thru to insert
// example: (asset_id, port_id_1)
//          (asset_id, port_id_2)
//          (asset_id, port_id_3)...
// -- Used in UpdateBaselineStepper ExistingAssetStepper.js
const removeAssetPorts = async (req, res) => {
  const client = await pool.connect();
  try {
    const { asset_ids, port_ids } = req.body;
    const query = 'DELETE FROM Ports_to_Asset WHERE asset_id = $1 AND port_id = $2;';

    if (Array.isArray(asset_ids)) {
      for (const asset_id of asset_ids) {
        for (const port_id of port_ids) {
          await client.query(query, [asset_id, port_id]);
        }
      }
    } else {
      for (const port_id of port_ids) {
        await client.query(query, [asset_ids, port_id]);
      }
    }

    client.release();
    res.status(200).json({ message: 'Ports removed successfully.' });

  } catch (err) {
    client.release();
    console.error('Error removing ports:', err.message);
    res.status(500).json({ message: 'Failed to remove ports.' });
  }
};




// Remove applications from an inserted asset in SQL database based on passed in parameters
// asset_id is fixed or array, ports_id is an array of port id's that the function loops thru to insert
// example: (asset_id, port_id_1)
//          (asset_id, port_id_2)
//          (asset_id, port_id_3)...
// -- Used in UpdateBaselineStepper ExistingAssetStepper.js
const removeAssetApplications = async (req, res) => {
  const client = await pool.connect();

  try {
    const { asset_ids, application_ids } = req.body;
    const query = 'DELETE FROM Applications_to_Asset WHERE asset_id = $1 AND application_id = $2;';

    if (Array.isArray(asset_ids)) {
      for (const asset_id of asset_ids) {
        for (const application_id of application_ids) {
          await client.query(query, [asset_id, application_id]);
        }
      }
    } else {
      for (const application_id of application_ids) {
        await client.query(query, [asset_ids, application_id]);
      }
    }

    client.release();
    res.status(200).json({ message: 'Applications removed successfully.' });

  } catch (err) {
    client.release();
    console.error('Error removing applications:', err.message);
    res.status(500).json({ message: 'Failed to remove applications.' });
  }
};



// ----------------------------------------- END OF DELETERS ----------------------------------------- //




module.exports = {
  getAssets,
  getAssetById,
  getPortsPerAsset,
  getApplicationsPerAsset,
  getUpdatesPerAsset,

  getChangeControls,
  getChangeControlPatches,
  getChangeControlInfo,

  getAllSoftwareUpdates,
  getAssetsPerUpdate,

  insertAsset,
  getAllPorts,
  getAllApplications,
  insertAssetPorts,
  insertAssetApplications,
  insertCHG,
  insertSoftwareUpdate,

  updateAssetApplications,
  updateAssetById,

  deleteAssetById,
  removeAssetPorts,
  removeAssetApplications
}