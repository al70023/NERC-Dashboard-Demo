import React from 'react'
import Button from '@mui/material/Button';
import { Modal } from "react-bootstrap";
import AddIcon from '@mui/icons-material/Add';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';

export default function UpdateBaselinePage() {
  return (
    <div className="wrapper">
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header style={{ justifyContent: "center" }}>
            <Modal.Title>Update Baseline</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ textAlign: "center" }}>
            <p>What type of change will you be doing?</p>

            <div className="row">

              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12" >
                <Button
                  size="large"
                  variant="contained"
                  color="success"
                  style={{ marginTop: "20px", paddingLeft: "29px", paddingRight: "29px", textTransform: "none" }}
                  startIcon={<AddIcon />}
                  href="/updateBaseline/newAsset">
                  Inserting New Asset
                </Button>
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12" >
                <Button
                  size="large"
                  variant="contained"
                  style={{ marginTop: "30px", marginBottom: "20px", paddingLeft: "10px", paddingRight: "10px", textTransform: "none" }}
                  startIcon={<SwitchAccessShortcutAddIcon />}
                  href="/updateBaseline/existingAssets">
                  Modifying Existing Assets
                </Button>
              </div>

            </div>
          </Modal.Body>

          <Modal.Footer>
            <br></br>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  )
}
