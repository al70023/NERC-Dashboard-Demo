import React, { useState, useEffect } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Modal } from "react-bootstrap";
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { Form, FloatingLabel, Row, Col } from "react-bootstrap";

function formatDate(dateString) {
    if (dateString === null || dateString === undefined) { return "" }
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
}

export default function ChangeControlsReport() {
    const [ChangeControlsList, setChangeControlsList] = useState([]);
    const [startDateFilter, setStartDateFilter] = useState('2017-01-01');
    const [endDateFilter, setEndDateFilter] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        fetch('http://localhost:3001/ChangeControls')
            .then((res) => res.json())
            .then((json) => {
                setChangeControlsList(json);
            });
    }, []);

    const applyFilter = () => {
        // Filter the data based on the selected criteria
        let filteredData = ChangeControlsList;

        // Parse the selected start and end dates (or default values)
        const startDate = startDateFilter;
        const endDate = endDateFilter;

        // Filter Change Controls by date range
        filteredData = filteredData.filter(row => row.CHG_date >= startDateFilter && row.CHG_date <= endDateFilter);

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

        const title = "Change Controls Report";
        const headers = [["Change Control", "Date Opened", "Security Update"]];

        const data = applyFilter().map((row) => [
            row.CHG_number,
            formatDate(row.CHG_date),
            row.security_update,
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

        doc.save("Change Controls Report.pdf");
    };

    return (
        <div className="wrapper">
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal.Dialog>
                    <Modal.Header style={{ justifyContent: "center" }}>
                        <Modal.Title>Change Control Report</Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ textAlign: "center" }}>
                        <br></br>
                        <h6>Select optional filters:</h6>
                        

                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <Form onSubmit={(e) => e.preventDefault()}>
                                    <Row>
                                        <Col>
                                            <FloatingLabel controlId="formGridDateStart" label="Starting Date">
                                                <Form.Control
                                                    type="date"
                                                    style={{ height: '70px' }}
                                                    placeholder="Starting Date"
                                                    value={startDateFilter}
                                                    onChange={(e) => setStartDateFilter(e.target.value)}
                                                />
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel controlId="formGridDateEnd" label="Ending Date">
                                                <Form.Control
                                                    type="date"
                                                    style={{ height: '70px' }}
                                                    placeholder="Ending Date"
                                                    value={endDateFilter}
                                                    onChange={(e) => setEndDateFilter(e.target.value)}
                                                />
                                            </FloatingLabel>
                                        </Col>
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
