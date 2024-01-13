import React, { useState, useEffect } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Modal } from "react-bootstrap";
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { Form, FloatingLabel, Row, Col } from "react-bootstrap";

export default function IpInventoryReport() {
    const [ipInventory, setIpInventory] = useState([]);
    const [groupFilterCriteria, setGroupFilterCriteria] = useState("Show All");

    useEffect(() => {
        fetch('http://localhost:3001/AssetInventory')
            .then((res) => res.json())
            .then((json) => {
                setIpInventory(json);
            });
    }, []);

    const applyFilter = () => {
        // Filter the data based on the selected criteria
        let filteredData = ipInventory;

        if (groupFilterCriteria !== "Show All") {
            filteredData = filteredData.filter(row => row.group === groupFilterCriteria);
        }

        return filteredData;

    };

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const pageWidth = 595.276; // A4 page width in points

        const marginLeft = pageWidth / 2; // Center horizontally
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "IP Inventory Report";
        const headers = [["ID", "Name", "IPs", "Group", "Rack", "Location"]];

        const data = applyFilter().map((row) => [
            row.id,
            row.name,
            row.IPs,
            row.group,
            row.rack,
            row.location,
        ]);

        let content = {
            startY: 80, // Adjust the vertical position as needed
            head: headers,
            body: data,
        };

        // Calculate the text width and set the X position to center
        const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const titleX = (pageWidth - titleWidth) / 2;

        const edprLogo = new Image();
        edprLogo.src = require(`../edpr-logo.png`);
        doc.addImage(edprLogo, 'PNG', 10, 10, 90, 45);

        doc.setFont('helvetica', 'bold'); // Set the font to bold
        doc.text(titleX, 60, title); // Center the title horizontally
        doc.line(titleX, 61, titleX + doc.getTextWidth(title), 61); // Add underline
        doc.setFont('helvetica', 'normal'); // Set the font to bold
        
        doc.autoTable(content);

        doc.save("IP Inventory Report.pdf");
    };

    return (
        <div className="wrapper">
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal.Dialog>
                    <Modal.Header style={{ justifyContent: "center" }}>
                        <Modal.Title>IP Inventory Report</Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ textAlign: "center" }}>
                        <br></br>
                        <h6>Select optional filters:</h6>

                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <Form onSubmit={(e) => e.preventDefault()}>
                                    <Row>
                                        <Form.Group xs={2} as={Col} controlId="formGridSpace"></Form.Group>
                                        <Col>
                                            <FloatingLabel controlId="formGridGroup" label="Group">
                                                <Form.Select
                                                    value={groupFilterCriteria}
                                                    onChange={(e) => setGroupFilterCriteria(e.target.value)}
                                                    style={{ marginBottom: "10px" }}
                                                >
                                                    <option value="Show All">Show All</option>
                                                    <option value="IT Equipment">IT Equipment</option>
                                                    <option value="Networking Equipment">Networking Equipment</option>
                                                    <option value="Office Equipment">Office Equipment</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Form.Group xs={2} as={Col} controlId="formGridSpace"></Form.Group>
                                    </Row>
                                    <br></br>
                                    <Row>
                                        <Col>
                                            <Button
                                                size="large"
                                                variant="contained"
                                                color="primary"
                                                style={{ marginTop: "20px", paddingLeft: "29px", paddingRight: "29px", textTransform: "none" }}
                                                startIcon={<DownloadIcon />}
                                                onClick={() => exportPDF()}
                                            >
                                                Download Report
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <br></br>
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
