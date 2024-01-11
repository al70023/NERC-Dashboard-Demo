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
    let pool = await sql.connect(realConfig);
    let results = await pool.request().query(
      `SELECT DISTINCT
          Software_Updates_to_Asset."patch_version",
          Software_Updates_to_Asset."source",
          Software_Updates_to_Asset.model,
          Software_Updates_to_Asset.OS,
          Software_Updates_to_Asset.date_reviewed,
          Software_Updates_to_Asset.date_installed,
          Software_Updates_to_Asset.CHG_ticket,
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

    res.json(results.recordset);

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


////////////////////////// REVERTED BACK /////////////////////////////////////////////////////////////////////////////






////////////////////////// REVERTED BACK /////////////////////////////////////////////////////////////////////////////

// Get list of all of the assets that a certain software update has affected
// -- Used in Software Updates page, view specific software update
getAssetsPerUpdate = async (req, res) => {
  try {
    const patch_version = req.params.patch_version;
    let pool = await sql.connect(realConfig);

    // Define the SQL query to get the asset by ID
    const query = `SELECT 
                        Asset_Inventory."name",
                        Asset_Inventory."group",
                        Asset_Inventory.IPs,
                        Asset_Inventory.model_type,
                        Asset_Inventory."function",
                        Software_Updates_to_Asset.date_reviewed,
                        Software_Updates_to_Asset.date_installed,
                        Software_Updates_to_Asset.CHG_ticket,
                        Asset_Inventory.id
                    FROM 
                        Software_Updates_to_Asset
                    INNER JOIN
                        Asset_Inventory ON Asset_Inventory.id = Software_Updates_to_Asset.asset_id
                    WHERE 
                      Software_Updates_to_Asset.patch_version = @patch_version;`;

    // Prepare the query parameters
    const request = pool.request();
    request.input('patch_version', sql.VarChar, patch_version)

    // Execute the query
    const result = await request.query(query);

    // no error if results === 0, so that table will still render if empty list

    res.json(result.recordset);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

////////////////////////// REVERTED BACK /////////////////////////////////////////////////////////////////////////////








// Get full list of ports from Ports table, which is a unique list of ports that can be attached to assets
const getAllPorts = async (req, res) => {
  try {
    let pool = await sql.connect(realConfig);
    let results = await pool.request().query(
      `SELECT *, '' AS "add_remove" FROM Ports;`
    );

    res.json(results.recordset);

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
    let pool = await sql.connect(realConfig);
    // let results = await pool.request().query(
    //   `WITH RankedApplications AS (
    //     SELECT 
    //         Applications.id,
    //         Applications.name,
    //         Applications.type,
    //         Applications_to_Asset.version,
    //         Applications_to_Asset.initial_install,
    //         Applications_to_Asset.upgrade_date,
    //         '' AS "add_upgrade_remove",
    //         ROW_NUMBER() OVER(PARTITION BY Applications.name ORDER BY Applications.id) AS rn
    //     FROM Applications
    //     INNER JOIN Applications_to_Asset ON Applications.id = Applications_to_Asset.application_id
    //   )
    //   SELECT 
    //       id,
    //       name,
    //       type,
    //       version,
    //       initial_install,
    //       upgrade_date,
    //       '' AS "add_upgrade_remove"
    //   FROM RankedApplicatio  ns
    //   WHERE rn = 1;`
    // );
    let results = await pool.request().query(
      `SELECT id,
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

    res.json(results.recordset);

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


// ----------- END OF GETTERS ------------ //




// ----------- INSERTERS ---------------- //


// Insert a new asset into SQL database based on passed in optional parameters
// Also return the asset_id generated by the SQL table as a response to be used for other queries/functions
// -- Used in UpdateBaselineStepper NewAssetStepper.js
const insertAsset = async (req, res) => {
  try {

    let pool = await sql.connect(config);

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
      DecommissionDate } = req.body

    // Define the SQL query
    const query = `INSERT INTO Asset_Inventory 
                    (
                      serial_number, 
                      "name", 
                      IPs, 
                      "function", 
                      model_type, 
                      manufacturer, 
                      model, 
                      OS, 
                      "group", 
                      bes_class, 
                      impact_rating, 
                      "status", 
                      rack, 
                      "location", 
                      psp_id, 
                      esp_id, 
                      team, 
                      tech_owner, 
                      commission_date, 
                      decommission_date
                    ) 
                    VALUES 
                    (
                      @SerialNumber, 
                      @Name, 
                      @IPs, 
                      @Function, 
                      @Type, 
                      @Manufacturer,
                      @Model, 
                      @OS, 
                      @Group, 
                      @BESClass, 
                      @Impact, 
                      @Status, 
                      @Rack, 
                      @Location, 
                      @PSPid, 
                      @ESPid, 
                      @Team, 
                      @Owner, 
                      @CommissionDate, 
                      @DecommissionDate
                      );`
      ;

    // Prepare the query parameters
    const request = pool.request();

    request.input('SerialNumber', sql.VarChar, SerialNumber);
    request.input('Name', sql.VarChar, Name);
    request.input('IPs', sql.VarChar, IPs);
    request.input('Function', sql.VarChar, Function);
    request.input('Type', sql.VarChar, Type);
    request.input('Manufacturer', sql.VarChar, Manufacturer);
    request.input('Model', sql.VarChar, Model);
    request.input('OS', sql.VarChar, OS);
    request.input('Group', sql.VarChar, Group);
    request.input('BESClass', sql.VarChar, BESClass);
    request.input('Impact', sql.VarChar, Impact);
    request.input('Status', sql.VarChar, Status);
    request.input('Rack', sql.VarChar, Rack);
    request.input('Location', sql.VarChar, Location);
    request.input('PSPid', sql.VarChar, PSPid);
    request.input('ESPid', sql.VarChar, ESPid);
    request.input('Team', sql.VarChar, Team);
    request.input('Owner', sql.VarChar, Owner);

    // Check and handle commissionDate and decommissionDate
    if (CommissionDate) {
      request.input('CommissionDate', sql.Date, CommissionDate);
    } else {
      request.input('CommissionDate', sql.Date, null);
    }
    if (DecommissionDate) {
      request.input('DecommissionDate', sql.Date, DecommissionDate);
    } else {
      request.input('DecommissionDate', sql.Date, null);
    }

    // Execute the query
    await request.query(query);

    // Get the inserted asset_id
    const result = await pool.request().query('SELECT @@IDENTITY AS inserted_asset_id;');
    const inserted_asset_id = await result.recordset[0].inserted_asset_id;

    // Close the connection pool
    await pool.close();

    // Respond with a success message
    res.status(200).json({ message: 'Asset inserted successfully.', inserted_asset_id });

  } catch (err) {
    console.error('Error inserting asset:', err.message);
    res.status(500).json({ message: 'Failed to insert asset.' });
  }
}





////////////////////////// TO CHANGE THIS /////////////////////////////////////////////////////////////////////////////


// Insert a new change control into SQL database based on passed in parameters
// -- Used in UpdateBaselineStepper NewAssetStepper.js and ExistingAssetStepper.js
// old way: Ties the change control to the newly created asset, through a single patch_version within that CHG called 'New Deploy'
const insertCHG = async (req, res) => {
  try {

    let pool = await sql.connect(config);

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
    } = req.body

    // Define the SQL query
    const query = `INSERT INTO Change_Controls 
                (
                  CHG_number, 
                  CHG_date,  
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
                )
                VALUES
                (
                  @change_control,
                  @date_opened,
                  @security_update,
                  @security_review_date,
                  @description,
                  @test_approval_date,
                  @test_install_date,
                  @test_worknotes,
                  @test_before_screenshot,
                  @test_after_screenshot,
                  @prod_approval_date,
                  @prod_install_date,
                  @prod_worknotes,
                  @prod_before_screenshot,
                  @prod_after_screenshot
                );`
      ;

    // Prepare the query parameters
    const request = pool.request();

    
    request.input('change_control', sql.VarChar, change_control);
    request.input('date_opened', sql.Date, date_opened);
    request.input('security_update', sql.VarChar, security_update);

    if (security_review_date) {
      request.input('security_review_date', sql.Date, security_review_date);
    } else {
      request.input('security_review_date', sql.Date, null);
    }
    
    request.input('description', sql.Text, description);

    if (test_approval_date) {
      request.input('test_approval_date', sql.Date, test_approval_date);
    } else {
      request.input('test_approval_date', sql.Date, null);
    }

    if (test_install_date) {
      request.input('test_install_date', sql.Date, test_install_date);
    } else {
      request.input('test_install_date', sql.Date, null);
    }

    request.input('test_worknotes', sql.Text, test_worknotes);
    request.input('test_before_screenshot', sql.VarChar, test_before_screenshot);
    request.input('test_after_screenshot', sql.VarChar, test_after_screenshot);

    if (prod_approval_date) {
      request.input('prod_approval_date', sql.Date, prod_approval_date);
    } else {
      request.input('prod_approval_date', sql.Date, null);
    }

    if (prod_install_date) {
      request.input('prod_install_date', sql.Date, prod_install_date);
    } else {
      request.input('prod_install_date', sql.Date, null);
    }

    request.input('prod_worknotes', sql.Text, prod_worknotes);
    request.input('prod_before_screenshot', sql.VarChar, prod_before_screenshot);
    request.input('prod_after_screenshot', sql.VarChar, prod_after_screenshot);


    // Execute the query
    await request.query(query);

    // Close the connection pool
    await pool.close();

    // Respond with a success message
    res.status(200).json({ message: 'Change Control inserted successfully.' });

  } catch (err) {
    console.error('Error inserting change control:', err.message);
    res.status(500).json({ message: 'Failed to insert change control.' });
  }
}


////////////////////////// TO CHANGE THIS /////////////////////////////////////////////////////////////////////////////





////////////////////////// TO CHANGE THIS /////////////////////////////////////////////////////////////////////////////


// Insert a new software update into SQL database based on passed in parameters
// -- Used in UpdateBaselineStepper ExistingAssetStepper.js
// Loops through the list of patches, and all have the same CHG affecting the various assets
// const insertSoftwareUpdate = async (req, res) => {
//   try {

//     let pool = await sql.connect(config);

//     const { asset_ids, patch_versions, sources, asset_types, models, OSs, dates_reviewed, dates_installed, change_controls, notes } = req.body

//     // Define the SQL query
//     const query = `INSERT INTO Software_Updates_to_Asset 
//                     (asset_id, patch_version, source, asset_type, model, OS, date_reviewed, date_installed, CHG_ticket, notes) 
//                   VALUES 
//                     (
//                       @asset_id, @patch_version, @source, @asset_type, @model, @OS, @date_reviewed, @date_installed, @change_control, @notes
//                     );`
//       ;

//     // Check if asset_ids is an array (multiple assets having their patches added)
//     if (Array.isArray(asset_ids)) {
//       // Nested loop for multiple asset_ids
//       for (const asset_id of asset_ids) {
//         // Loop through the parallel arrays and insert each patch
//         for (let i = 0; i < patch_versions.length; i++) {
//           const request = pool.request();
//           request.input('asset_id', sql.Int, asset_id);
//           request.input('patch_version', sql.VarChar, patch_versions[i]);
//           request.input('source', sql.VarChar, sources[i]);
//           request.input('asset_type', sql.VarChar, asset_types[i]);
//           request.input('model', sql.VarChar, models[i]);
//           request.input('OS', sql.VarChar, OSs[i]);
//           // Check and handle dates
//           if (dates_reviewed[i]) {
//             request.input('date_reviewed', sql.Date, dates_reviewed[i]);
//           } else {
//             request.input('date_reviewed', sql.Date, null);
//           }
//           if (dates_installed[i]) {
//             request.input('date_installed', sql.Date, dates_installed[i]);
//           } else {
//             request.input('date_installed', sql.Date, null);
//           }
//           request.input('change_control', sql.VarChar, change_controls[i]);
//           request.input('notes', sql.VarChar, notes[i]);

//           // Execute the query for each application
//           await request.query(query);
//         }
//       }
//     } else {
//       // Single asset_ids
//       for (let i = 0; i < patch_versions.length; i++) {
//         const request = pool.request();
//         request.input('asset_id', sql.Int, asset_ids);
//         request.input('patch_version', sql.VarChar, patch_versions[i]);
//         request.input('source', sql.VarChar, sources[i]);
//         request.input('asset_type', sql.VarChar, asset_types[i]);
//         request.input('model', sql.VarChar, models[i]);
//         request.input('OS', sql.VarChar, OSs[i]);
//         // Check and handle dates
//         if (dates_reviewed[i]) {
//           request.input('date_reviewed', sql.Date, dates_reviewed[i]);
//         } else {
//           request.input('date_reviewed', sql.Date, null);
//         }
//         if (dates_installed[i]) {
//           request.input('date_installed', sql.Date, dates_installed[i]);
//         } else {
//           request.input('date_installed', sql.Date, null);
//         }
//         request.input('change_control', sql.VarChar, change_controls[i]);
//         request.input('notes', sql.VarChar, notes[i]);

//         // Execute the query for each application
//         await request.query(query);
//       }
//     }

//     // Close the connection pool
//     await pool.close();

//     // Respond with a success message
//     res.status(200).json({ message: 'Software Update inserted successfully.' });

//   } catch (err) {
//     console.error('Error inserting software update:', err.message);
//     res.status(500).json({ message: 'Failed to insert software update.' });
//   }
// }

const insertSoftwareUpdate = async (req, res) => {
  try {
    let pool = await sql.connect(config);

    const softwareUpdates = req.body; // Array of software update objects

    for (const softwareUpdate of softwareUpdates) {

      const { asset_ids, patch_version, source, model, os, date_reviewed, date_installed, CHG_ticket, notes } = softwareUpdate;

      // Define the SQL query
      const query = `INSERT INTO Software_Updates_to_Asset 
                    (asset_id, patch_version, source, model, OS, date_reviewed, date_installed, CHG_ticket, notes) 
                  VALUES 
                    (
                      @asset_id, @patch_version, @source, @model, @OS, @date_reviewed, @date_installed, @CHG_ticket, @notes
                    );`;

      // Check if asset_ids is an array (multiple assets having their patches added)
      if (Array.isArray(asset_ids)) {
        // Nested loop for multiple asset_ids
        for (const asset_id of asset_ids) {
          const request = pool.request();
          request.input('asset_id', sql.Int, asset_id);
          request.input('patch_version', sql.VarChar, patch_version);
          request.input('source', sql.VarChar, source);
          request.input('model', sql.VarChar, model);
          request.input('OS', sql.VarChar, os);
          // Check and handle dates
          if (date_reviewed) {
            request.input('date_reviewed', sql.Date, date_reviewed);
          } else {
            request.input('date_reviewed', sql.Date, null);
          }
          if (date_installed) {
            request.input('date_installed', sql.Date, date_installed);
          } else {
            request.input('date_installed', sql.Date, null);
          }
          request.input('CHG_ticket', sql.VarChar, CHG_ticket);
          request.input('notes', sql.VarChar, notes);

          // Execute the query for each application
          await request.query(query);
          
        }
      } else {
        // Single asset_ids
        for (let i = 0; i < patch_versions.length; i++) {
          const request = pool.request();
          request.input('asset_id', sql.Int, asset_id);
          request.input('patch_version', sql.VarChar, patch_version);
          request.input('source', sql.VarChar, source);
          request.input('model', sql.VarChar, model);
          request.input('OS', sql.VarChar, os);
          // Check and handle dates
          if (date_reviewed) {
            request.input('date_reviewed', sql.Date, date_reviewed);
          } else {
            request.input('date_reviewed', sql.Date, null);
          }
          if (date_installed) {
            request.input('date_installed', sql.Date, date_installed);
          } else {
            request.input('date_installed', sql.Date, null);
          }
          request.input('CHG_ticket', sql.VarChar, CHG_ticket);
          request.input('notes', sql.VarChar, notes);

          // Execute the query for each application
          await request.query(query);
        }
      }
    }

    // Close the connection pool
    await pool.close();

    // Respond with a success message
    res.status(200).json({ message: 'Software Updates inserted successfully.' });

  } catch (err) {
    console.error('Error inserting software updates:', err.message);
    res.status(500).json({ message: 'Failed to insert software updates.' });
  }
}



////////////////////////// TO CHANGE THIS /////////////////////////////////////////////////////////////////////////////








// Attach ports to an inserted asset in SQL database based on passed in parameters
// asset_id is fixed or an arry, ports_id is an array of port id's that the function loops thru to insert
// example: (asset_id, port_id_1)
//          (asset_id, port_id_2)
//          (asset_id, port_id_3)...
// -- Used in UpdateBaselineStepper NewAssetStepper.js
const insertAssetPorts = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const { asset_ids, port_ids } = req.body;

    // Prepare the SQL query
    const query = `INSERT INTO Ports_to_Asset (asset_id, port_id) VALUES (@asset_id, @port_id);`;

    // Check if asset_ids is an array (multiple assets having their ports added)
    if (Array.isArray(asset_ids)) {
      // Nested loop for multiple asset_ids
      for (const asset_id of asset_ids) {
        for (const port_id of port_ids) {
          const request = pool.request();
          request.input('asset_id', sql.Int, asset_id);
          request.input('port_id', sql.Int, port_id);

          // Execute the query for each port_id and asset_id combination
          await request.query(query);
        }
      }
    } else {
      // Single asset_id
      for (const port_id of port_ids) {
        const request = pool.request();
        request.input('asset_id', sql.Int, asset_ids);
        request.input('port_id', sql.Int, port_id);

        // Execute the query for each port_id
        await request.query(query);
      }
    }

    // Close the connection pool
    await pool.close();

    // Respond with a success message
    res.status(200).json({ message: 'Ports attached successfully.' });

  } catch (err) {
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
  try {
    const pool = await sql.connect(config);
    const { asset_ids, application_ids, application_versions, application_install_dates, application_upgrade_dates } = req.body;

    // Prepare the SQL query
    const query = `INSERT INTO Applications_to_Asset (asset_id, application_id, version, initial_install, upgrade_date) 
      VALUES (@asset_id, @application_id, @version, @initial_install, @upgrade_date);`;

    // Check if asset_ids is an array (multiple assets having their applications added)
    if (Array.isArray(asset_ids)) {
      // Nested loop for multiple asset_ids
      for (const asset_id of asset_ids) {
        // Loop through the parallel arrays and insert each application
        for (let i = 0; i < application_ids.length; i++) {
          const request = pool.request();
          request.input('asset_id', sql.Int, asset_id);
          request.input('application_id', sql.Int, application_ids[i]);
          request.input('version', sql.VarChar, application_versions[i]);
          request.input('initial_install', sql.Date, new Date(application_install_dates[i]));
          request.input('upgrade_date', sql.Date, new Date(application_upgrade_dates[i]));

          // Execute the query for each application
          await request.query(query);
        }
      }
    } else {
      // Single asset_ids
      for (let i = 0; i < application_ids.length; i++) {
        const request = pool.request();
        request.input('asset_id', sql.Int, asset_ids);
        request.input('application_id', sql.Int, application_ids[i]);
        request.input('version', sql.VarChar, application_versions[i]);
        request.input('initial_install', sql.Date, new Date(application_install_dates[i]));
        request.input('upgrade_date', sql.Date, new Date(application_upgrade_dates[i]));

        // Execute the query for each application
        await request.query(query);
      }
    }

    // Close the connection pool
    await pool.close();

    // Respond with a success message
    res.status(200).json({ message: 'Applications attached successfully.' });

  } catch (err) {
    console.error('Error attaching applications:', err.message);
    res.status(500).json({ message: 'Failed to attach applications.' });
  }
};



// ----------- END OF INSERTERS ------------ //




// ----------- UPDATERS ------------------ //


// Update applications to an inserted asset in SQL database based on passed in parameters
// asset_id is fixed or an array, applications_id, verions, dates are arrays that the function loops thru to update
// The arrays should be parallel, so that application_id[2] corresponds to version[2]
// example: (asset_id, application_id_1, version 1.0, 10/2/2013)
//          (asset_id, application_id_2, version 3.5, 7/16/2019)
//          (asset_id, application_id_3, version 1.0, 10/2/2013)...
// -- Used in UpdateBaselineStepper NewAssetStepper.js (single asset_id)
// -- Also used in ExistingAssetStepper.js (can have multiple asset_id's)
const updateAssetApplications = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const { asset_ids, application_ids, application_versions, application_install_dates, application_upgrade_dates } = req.body;

    // Prepare the SQL query
    const query =
      `UPDATE Applications_to_Asset 
      SET 
        version = @version,
        initial_install = @initial_install,
        upgrade_date = @upgrade_date 
      WHERE 
        asset_id = @asset_id
      AND
        application_id = @application_id;`
      ;

    // Check if asset_ids is an array (multiple assets having their applications upgraded)
    if (Array.isArray(asset_ids)) {
      // Nested loop for multiple asset_ids
      for (const asset_id of asset_ids) {
        // Loop through the parallel arrays and upgrade each application
        for (let i = 0; i < application_ids.length; i++) {
          const request = pool.request();
          request.input('asset_id', sql.Int, asset_id);
          request.input('application_id', sql.Int, application_ids[i]);
          request.input('version', sql.VarChar, application_versions[i]);
          request.input('initial_install', sql.Date, new Date(application_install_dates[i]));
          request.input('upgrade_date', sql.Date, new Date(application_upgrade_dates[i]));

          // Execute the query for each application
          await request.query(query);
        }
      }
    } else {
      // Single asset_ids
      for (let i = 0; i < application_ids.length; i++) {
        const request = pool.request();
        request.input('asset_id', sql.Int, asset_ids);
        request.input('application_id', sql.Int, application_ids[i]);
        request.input('version', sql.VarChar, application_versions[i]);
        request.input('initial_install', sql.Date, new Date(application_install_dates[i]));
        request.input('upgrade_date', sql.Date, new Date(application_upgrade_dates[i]));

        // Execute the query for each application
        await request.query(query);
      }
    }

    // Close the connection pool
    await pool.close();

    // Respond with a success message
    res.status(200).json({ message: 'Applications upgraded successfully.' });

  } catch (err) {
    console.error('Error upgrading applications:', err.message);
    res.status(500).json({ message: 'Failed to upgrade applications.' });
  }
};


// Update asset info in SQL database based on passed in parameters
// asset_id is array, all other parameters are columns of the asset to be updated that are parallel arrays
// The arrays should be parallel
// -- Used in ExistingAssetStepper.js (can have multiple asset_id's)
const updateAssetById = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const { asset_ids, names, serial_numbers, IPs, OSs, teams, tech_owners, model_types, manufacturers, models, groups, bes_classes, impact_ratings, racks, locations, psp_ids, esp_ids, functions, statuses,
      commission_dates, decommission_dates } = req.body;

    // Prepare the SQL query
    const query =
      `UPDATE Asset_Inventory 
      SET 
        "name" = @name,
        serial_number = @serial_number,
        IPs = @IPs,
        OS = @OS,
        team = @team,
        tech_owner = @tech_owner,
        model_type = @model_type,
        manufacturer = @manufacturer,
        model = @model,
        "group" = @group,
        bes_class = @bes_class,
        impact_rating = @impact_rating,
        rack = @rack,
        "location" = @location,
        psp_id = @psp_id,
        esp_id = @esp_id,
        "function" = @function,
        "status" = @status,
        commission_date = @commission_date,
        decommission_date = @decommission_date
      WHERE 
        id = @asset_id;`
      ;

    for (let i = 0; i < asset_ids.length; i++) {
      const request = pool.request();
      request.input('asset_id', sql.Int, asset_ids[i]);
      request.input('name', sql.VarChar, names[i]);
      request.input('serial_number', sql.VarChar, serial_numbers[i]);
      request.input('IPs', sql.VarChar, IPs[i]);
      request.input('OS', sql.VarChar, OSs[i]);
      request.input('team', sql.VarChar, teams[i]);
      request.input('tech_owner', sql.VarChar, tech_owners[i]);
      request.input('model_type', sql.VarChar, model_types[i]);
      request.input('manufacturer', sql.VarChar, manufacturers[i]);
      request.input('model', sql.VarChar, models[i]);
      request.input('group', sql.VarChar, groups[i]);
      request.input('bes_class', sql.VarChar, bes_classes[i]);
      request.input('impact_rating', sql.VarChar, impact_ratings[i]);
      request.input('rack', sql.VarChar, racks[i]);
      request.input('location', sql.VarChar, locations[i]);
      request.input('psp_id', sql.VarChar, psp_ids[i]);
      request.input('esp_id', sql.VarChar, esp_ids[i]);
      request.input('function', sql.VarChar, functions[i]);
      request.input('status', sql.VarChar, statuses[i]);
      request.input('commission_date', sql.Date, new Date(commission_dates[i]));
      request.input('decommission_date', sql.Date, new Date(decommission_dates[i]));

      // Execute the query for each application
      await request.query(query);
    }

    // Close the connection pool
    await pool.close();

    // Respond with a success message
    res.status(200).json({ message: 'Asset info updated successfully.' });

  } catch (err) {
    console.error('Error updating assets:', err.message);
    res.status(500).json({ message: 'Failed to update assets.' });
  }
};


// -------------- END OF UPDATERS ---------- //





// ----------- DELETERS ------------ //




////////////////////////// TO CHANGE THIS /////////////////////////////////////////////////////////////////////////////


const deleteAssetById = async (req, res) => {
  try {
    const id = req.params.id;
    let pool = await sql.connect(realConfig);

    // Define the SQL query to delete the asset by ID
    const query =
      `DELETE FROM Applications_to_Asset WHERE asset_id = @id;
     DELETE FROM Ports_to_Asset WHERE asset_id = @id;
     DELETE FROM Software_Updates_to_Asset WHERE asset_id = @id;
     DELETE FROM Asset_Inventory WHERE id = @id;`;

    // Prepare the query parameters
    const request = pool.request();
    request.input('id', sql.Int, id);

    // Execute the query
    const result = await request.query(query);

    // Check if any rows were affected (i.e., asset with the given ID was found and deleted)
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    // Close the connection pool
    await pool.close();

    // Respond with a success message
    res.status(200).json({ message: 'Asset deleted successfully.' });

  } catch (error) {
    console.error('Error deleting asset:', error.message);
    res.status(500).json({ error: 'Failed to delete asset.' });
  }
};

////////////////////////// TO CHANGE THIS /////////////////////////////////////////////////////////////////////////////







// Remove ports from an inserted asset in SQL database based on passed in parameters
// asset_id is fixed or array, ports_id is an array of port id's that the function loops thru to insert
// example: (asset_id, port_id_1)
//          (asset_id, port_id_2)
//          (asset_id, port_id_3)...
// -- Used in UpdateBaselineStepper ExistingAssetStepper.js
const removeAssetPorts = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const { asset_ids, port_ids } = req.body;

    // Prepare the SQL query
    const query = `DELETE FROM Ports_to_Asset where asset_id = @asset_id AND port_id = @port_id;`;

    // Check if asset_ids is an array (multiple assets having their ports removed)
    if (Array.isArray(asset_ids)) {
      // Nested loop for multiple asset_ids
      for (const asset_id of asset_ids) {
        for (const port_id of port_ids) {
          const request = pool.request();
          request.input('asset_id', sql.Int, asset_id);
          request.input('port_id', sql.Int, port_id);

          // Execute the query for each port_id and asset_id combination
          await request.query(query);
        }
      }
    } else {
      // Single asset_id
      for (const port_id of port_ids) {
        const request = pool.request();
        request.input('asset_id', sql.Int, asset_ids);
        request.input('port_id', sql.Int, port_id);

        // Execute the query for each port_id
        await request.query(query);
      }
    }

    // Close the connection pool
    await pool.close();

    // Respond with a success message
    res.status(200).json({ message: 'Ports removed successfully.' });

  } catch (err) {
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
  try {
    const pool = await sql.connect(config);
    const { asset_ids, application_ids } = req.body;

    // Prepare the SQL query
    const query = `DELETE FROM Applications_to_Asset where asset_id = @asset_id AND application_id = @application_id;`;

    // Check if asset_ids is an array (multiple assets having their applications removed)
    if (Array.isArray(asset_ids)) {
      // Nested loop for multiple asset_ids
      for (const asset_id of asset_ids) {
        for (const application_id of application_ids) {
          const request = pool.request();
          request.input('asset_id', sql.Int, asset_id);
          request.input('application_id', sql.Int, application_id);

          // Execute the query for each port_id and asset_id combination
          await request.query(query);
        }
      }
    } else {
      // Single asset_id
      for (const application_id of application_ids) {
        const request = pool.request();
        request.input('asset_id', sql.Int, asset_ids);
        request.input('application_id', sql.Int, application_id);

        // Execute the query for each port_id
        await request.query(query);
      }
    }

    // Close the connection pool
    await pool.close();

    // Respond with a success message
    res.status(200).json({ message: 'Applications removed successfully.' });

  } catch (err) {
    console.error('Error removing applications:', err.message);
    res.status(500).json({ message: 'Failed to remove applications.' });
  }
};

// ----------- END OF DELETERS ------------ //






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