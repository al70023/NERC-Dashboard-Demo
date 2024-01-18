import React, { Component, useEffect, useState } from 'react'
import { withRouter } from '../../navigation/withRouter';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { PDFDocument, PDFPage } from 'pdf-lib';
import { saveAs } from 'file-saver';


function ImageExists({ imagePath, alt, iframeSrc, width, height }) {
    const [imageExists, setImageExists] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = imagePath;

        img.onload = () => {
            setImageExists(true);
        };

        img.onerror = () => {
            setImageExists(false);
        };
    }, [imagePath]);

    if (imageExists) {
        return (
            <img
                src={imagePath}
                alt={alt}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
        );
    } else {
        return (
            <iframe
                src={iframeSrc}
                width={width}
                height={height}
                frameBorder="0"
            />
        );
    }
}


export class SingleChangeControlInfo extends Component {
    state = {
        savedData: {}
    }

    componentDidMount() {
        const { params } = this.props;
        const CHG_ticket = params.CHG_ticket;
        fetch(process.env.REACT_APP_BACKEND_URL + `/ChangeControls/${CHG_ticket}/info`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    savedData: json
                });
            });
    }

    formatDate(dateString) {
        if (dateString === null || dateString === undefined) { return "" }
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
    }


    exportPDF = async () => {
        const coverPagePdf = new jsPDF();
        coverPagePdf.setFontSize(15);

        // Add a border around the entire page
        coverPagePdf.rect(5, 5, coverPagePdf.internal.pageSize.width - 10, coverPagePdf.internal.pageSize.height - 10);
        const edprLogo = new Image();
        edprLogo.src = require(`../../edpr-logo.png`);
        coverPagePdf.addImage(edprLogo, 'PNG', 10, 10, 30, 15);

        var title = `Change Control Information for Ticket: ${this.props.params.CHG_ticket}`;

        // Calculate the X-coordinate to center the title
        var titleWidth = coverPagePdf.getStringUnitWidth(title) * coverPagePdf.internal.getFontSize() / coverPagePdf.internal.scaleFactor;
        var centerX = (coverPagePdf.internal.pageSize.width - titleWidth) / 2;

        coverPagePdf.setFont('helvetica', 'bold'); // Set the font to bold
        coverPagePdf.text(title, centerX, 40); // Center the title horizontally
        coverPagePdf.line(centerX, 41, centerX + coverPagePdf.getTextWidth(title), 41); // Add underline
        coverPagePdf.setFont('helvetica', 'normal'); // Reset the font to normal


        const formFieldsBasic = [
            { label: 'Change Control', value: this.state.savedData[0]?.CHG_number },
            { label: 'Security Update', value: this.state.savedData[0]?.security_update },
            { label: 'Date Opened', value: this.formatDate(this.state.savedData[0]?.CHG_date) },
            { label: 'Security Review Date', value: this.formatDate(this.state.savedData[0]?.security_review_date) },
            { label: 'Description', value: this.state.savedData[0]?.description },
        ];

        let currentY = 60; // Y-coordinate for drawing the form fields

        formFieldsBasic.forEach((field, index) => {
            coverPagePdf.setFont('helvetica', 'bold'); // Set the font to bold
            coverPagePdf.setTextColor(0, 115, 207); // Set the font color to blue
            coverPagePdf.setFontSize(15);

            if (index % 2 === 0) {
                // Print on the left side
                coverPagePdf.text(field.label, 10, currentY);
                coverPagePdf.setFont('helvetica', 'normal'); // Reset the font to normal
                coverPagePdf.setTextColor(0, 0, 0); // Reset the font color to black
                coverPagePdf.setFontSize(12);
                if (field.label === 'Description') {
                    coverPagePdf.setFontSize(8);
                }
                coverPagePdf.text(field.value, 10, currentY + 7);
            } else {
                // Print on the right side
                coverPagePdf.text(field.label, 140, currentY);
                coverPagePdf.setFont('helvetica', 'normal'); // Reset the font to normal
                coverPagePdf.setTextColor(0, 0, 0); // Reset the font color to black
                coverPagePdf.setFontSize(12);
                coverPagePdf.text(field.value, 140, currentY + 7);
                currentY += 30; // Move to the next line
            }

            if (index === formFieldsBasic.length - 1) {
                // Add a new page for other fields if these are the last form fields
                currentY = 40; // Reset the Y-coordinate for the new page
            }

        });
        

        const testWorknotesPagePdf = new jsPDF();

        currentY = 60; // Y-coordinate for drawing the form fields

        // Add a border around the entire page
        testWorknotesPagePdf.rect(5, 5, testWorknotesPagePdf.internal.pageSize.width - 10, testWorknotesPagePdf.internal.pageSize.height - 10);

        const testSectionTitle = `Test Environment`;
        testWorknotesPagePdf.setFontSize(15);

        // Calculate the X-coordinate to center the title
        const testSectionTitleWidth = testWorknotesPagePdf.getStringUnitWidth(testSectionTitle) * testWorknotesPagePdf.internal.getFontSize() / testWorknotesPagePdf.internal.scaleFactor;
        const testSectionTitleCenterX = (testWorknotesPagePdf.internal.pageSize.width - testSectionTitleWidth) / 2;
        
        testWorknotesPagePdf.setFont('helvetica', 'bold'); // Set the font to bold
        testWorknotesPagePdf.setTextColor(0, 0, 0); // Reset the font color to black
        testWorknotesPagePdf.setFontSize(15);
        testWorknotesPagePdf.text(testSectionTitle, testSectionTitleCenterX, 20); // Center the title horizontally
        testWorknotesPagePdf.line(testSectionTitleCenterX, 21, testSectionTitleCenterX + testWorknotesPagePdf.getTextWidth(testSectionTitle), 21); // Add underline
        testWorknotesPagePdf.setFont('helvetica', 'normal'); // Reset the font to normal

        const formFieldsTest = [
            { label: 'Test Approval Date', value: this.formatDate(this.state.savedData[0]?.test_approve_date) },
            { label: 'Test Install Date', value: this.formatDate(this.state.savedData[0]?.test_install_date) },
            { label: 'Test Worknotes', value: this.state.savedData[0]?.test_worknotes },
        ];

        formFieldsTest.forEach((field, index) => {
            testWorknotesPagePdf.setFont('helvetica', 'bold'); // Set the font to bold
            testWorknotesPagePdf.setTextColor(0, 115, 207); // Set the font color to blue
            testWorknotesPagePdf.setFontSize(15);

            if (index % 2 === 0) {
                // Print on the left side
                testWorknotesPagePdf.text(field.label, 10, currentY);
                testWorknotesPagePdf.setFont('helvetica', 'normal'); // Reset the font to normal
                testWorknotesPagePdf.setTextColor(0, 0, 0); // Reset the font color to black
                testWorknotesPagePdf.setFontSize(12);
                if (field.label === 'Test Worknotes') {
                    testWorknotesPagePdf.setFontSize(8);
                }
                testWorknotesPagePdf.text(field.value, 10, currentY + 7);
            } else {
                // Print on the right side
                testWorknotesPagePdf.text(field.label, 140, currentY);
                testWorknotesPagePdf.setFont('helvetica', 'normal'); // Reset the font to normal
                testWorknotesPagePdf.setTextColor(0, 0, 0); // Reset the font color to black
                testWorknotesPagePdf.setFontSize(12);
                testWorknotesPagePdf.text(field.value, 140, currentY + 7);
                currentY += 30; // Move to the next line
            }

            if (index === formFieldsTest.length - 1) {
                // Add a new page for other fields if these are the last form fields
                currentY = 40; // Reset the Y-coordinate for the new page
            }

        });


        const testBeforeEvidencePagePdf = new jsPDF();

        // Add a border around the entire page
        testBeforeEvidencePagePdf.rect(5, 5, testBeforeEvidencePagePdf.internal.pageSize.width - 10, testBeforeEvidencePagePdf.internal.pageSize.height - 10);


        title = `Test Environment Screenshot Evidence (Before)`;
        testBeforeEvidencePagePdf.setFontSize(15);

        // Calculate the X-coordinate to center the title
        titleWidth = testBeforeEvidencePagePdf.getStringUnitWidth(title) * testBeforeEvidencePagePdf.internal.getFontSize() / testBeforeEvidencePagePdf.internal.scaleFactor;
        centerX = (testBeforeEvidencePagePdf.internal.pageSize.width - titleWidth) / 2;

        testBeforeEvidencePagePdf.setFont('helvetica', 'bold'); // Set the font to bold
        testBeforeEvidencePagePdf.setTextColor(0, 0, 0); // Reset the font color to black
        testBeforeEvidencePagePdf.text(title, centerX, 20); // Center the title horizontally
        testBeforeEvidencePagePdf.line(centerX, 21, centerX + testBeforeEvidencePagePdf.getTextWidth(title), 21); // Add underline
        testBeforeEvidencePagePdf.setFont('helvetica', 'normal'); // Reset the font to normal

        // Handling Before Screenshots
        if (this.state.savedData[0]?.before_test_ss) {
            testBeforeEvidencePagePdf.setTextColor(0, 115, 207); // Set the font color to blue
            currentY += 10;
            const beforeTestImage = new Image();
            beforeTestImage.src = require(`../../Evidence_Screenshots/${this.state.savedData[0].before_test_ss}`);
            testBeforeEvidencePagePdf.addImage(beforeTestImage, 'JPEG', 10, currentY, 180, 180); // Adjust width and height as needed
        }


        const testAfterEvidencePagePdf = new jsPDF();

        // Add a border around the entire page
        testAfterEvidencePagePdf.rect(5, 5, testAfterEvidencePagePdf.internal.pageSize.width - 10, testAfterEvidencePagePdf.internal.pageSize.height - 10);

        title = `Test Environment Screenshot Evidence (After)`;
        testAfterEvidencePagePdf.setFontSize(15);

        // Calculate the X-coordinate to center the title
        titleWidth = testAfterEvidencePagePdf.getStringUnitWidth(title) * testAfterEvidencePagePdf.internal.getFontSize() / testAfterEvidencePagePdf.internal.scaleFactor;
        centerX = (testAfterEvidencePagePdf.internal.pageSize.width - titleWidth) / 2;

        testAfterEvidencePagePdf.setFont('helvetica', 'bold'); // Set the font to bold
        testAfterEvidencePagePdf.setTextColor(0, 0, 0); // Reset the font color to black
        testAfterEvidencePagePdf.text(title, centerX, 20); // Center the title horizontally
        testAfterEvidencePagePdf.line(centerX, 21, centerX + testAfterEvidencePagePdf.getTextWidth(title), 21); // Add underline
        testAfterEvidencePagePdf.setFont('helvetica', 'normal'); // Reset the font to normal
        
        // Handling After Screenshots
        if (this.state.savedData[0]?.after_test_ss) {
            testAfterEvidencePagePdf.rect(5, 5, testAfterEvidencePagePdf.internal.pageSize.width - 10, testAfterEvidencePagePdf.internal.pageSize.height - 10);
            testAfterEvidencePagePdf.setTextColor(0, 115, 207); // Set the font color to blue
            currentY += 10;
            const afterTestImage = new Image();
            afterTestImage.src = require(`../../Evidence_Screenshots/${this.state.savedData[0].after_test_ss}`);
            testAfterEvidencePagePdf.addImage(afterTestImage, 'JPEG', 10, currentY, 180, 180); // Adjust width and height as needed
        }


        const prodWorknotesPagePdf = new jsPDF();

        prodWorknotesPagePdf.rect(5, 5, prodWorknotesPagePdf.internal.pageSize.width - 10, prodWorknotesPagePdf.internal.pageSize.height - 10);
        currentY = 40; // Reset the Y-coordinate for the new page

        const prodSectionTitle = `Production Environment`;
        prodWorknotesPagePdf.setFontSize(15);

        // Calculate the X-coordinate to center the title
        const prodSectionTitleWidth = prodWorknotesPagePdf.getStringUnitWidth(prodSectionTitle) * prodWorknotesPagePdf.internal.getFontSize() / prodWorknotesPagePdf.internal.scaleFactor;
        const prodSectionTitleCenterX = (prodWorknotesPagePdf.internal.pageSize.width - prodSectionTitleWidth) / 2;

        prodWorknotesPagePdf.setFont('helvetica', 'bold'); // Set the font to bold
        prodWorknotesPagePdf.setTextColor(0, 0, 0); // Reset the font color to black
        prodWorknotesPagePdf.text(prodSectionTitle, prodSectionTitleCenterX, 20); // Center the title horizontally
        prodWorknotesPagePdf.line(prodSectionTitleCenterX, 21, prodSectionTitleCenterX + prodWorknotesPagePdf.getTextWidth(prodSectionTitle), 21); // Add underline
        prodWorknotesPagePdf.setFont('helvetica', 'normal'); // Reset the font to normal

        const formFieldsProd = [
            { label: 'Prod Approval Date', value: this.formatDate(this.state.savedData[0]?.prod_approve_date) },
            { label: 'Prod Install Date', value: this.formatDate(this.state.savedData[0]?.prod_install_date) },
            { label: 'Prod Worknotes', value: this.state.savedData[0]?.prod_worknotes },
        ];

        formFieldsProd.forEach((field, index) => {
            prodWorknotesPagePdf.setFont('helvetica', 'bold'); // Set the font to bold
            prodWorknotesPagePdf.setTextColor(0, 115, 207); // Set the font color to blue
            prodWorknotesPagePdf.setFontSize(15);

            if (index % 2 === 0) {
                // Print on the left side
                prodWorknotesPagePdf.text(field.label, 10, currentY);
                prodWorknotesPagePdf.setFont('helvetica', 'normal'); // Reset the font to normal
                prodWorknotesPagePdf.setTextColor(0, 0, 0); // Reset the font color to black
                prodWorknotesPagePdf.setFontSize(12);
                if (field.label === 'Prod Worknotes') {
                    prodWorknotesPagePdf.setFontSize(8);
                }
                prodWorknotesPagePdf.text(field.value, 10, currentY + 7);
            } else {
                // Print on the right side
                prodWorknotesPagePdf.text(field.label, 140, currentY);
                prodWorknotesPagePdf.setFont('helvetica', 'normal'); // Reset the font to normal
                prodWorknotesPagePdf.setTextColor(0, 0, 0); // Reset the font color to black
                prodWorknotesPagePdf.setFontSize(12);
                prodWorknotesPagePdf.text(field.value, 140, currentY + 7);
                currentY += 20; // Move to the next line
            }

            if (index === formFieldsProd.length - 1) {
                // Add a new page for other fields if these are the last form fields
                currentY = 40; // Reset the Y-coordinate for the new page
            }
        });


        const prodBeforeEvidencePagePdf = new jsPDF();

        prodBeforeEvidencePagePdf.rect(5, 5, prodBeforeEvidencePagePdf.internal.pageSize.width - 10, prodBeforeEvidencePagePdf.internal.pageSize.height - 10);

        title = `Production Environment Screenshot Evidence (Before)`;
        prodBeforeEvidencePagePdf.setFontSize(15);

        // Calculate the X-coordinate to center the title
        titleWidth = prodBeforeEvidencePagePdf.getStringUnitWidth(title) * prodBeforeEvidencePagePdf.internal.getFontSize() / prodBeforeEvidencePagePdf.internal.scaleFactor;
        centerX = (prodBeforeEvidencePagePdf.internal.pageSize.width - titleWidth) / 2;

        prodBeforeEvidencePagePdf.setFont('helvetica', 'bold'); // Set the font to bold
        prodBeforeEvidencePagePdf.setTextColor(0, 0, 0); // Reset the font color to black
        prodBeforeEvidencePagePdf.text(title, centerX, 20); // Center the title horizontally
        prodBeforeEvidencePagePdf.line(centerX, 21, centerX + prodBeforeEvidencePagePdf.getTextWidth(title), 21); // Add underline
        prodBeforeEvidencePagePdf.setFont('helvetica', 'normal'); // Reset the font to normal

        // Handling Before Screenshots 
        if (this.state.savedData[0]?.before_prod_ss) {
            prodBeforeEvidencePagePdf.setTextColor(0, 115, 207); // Set the font color to blue
            currentY += 10;
            const beforeProdImage = new Image();
            beforeProdImage.src = require(`../../Evidence_Screenshots/${this.state.savedData[0].before_prod_ss}`);
            prodBeforeEvidencePagePdf.addImage(beforeProdImage, 'JPEG', 10, currentY, 180, 180); // Adjust width and height as needed
        }

        const prodAfterEvidencePagePdf = new jsPDF();

        prodAfterEvidencePagePdf.rect(5, 5, prodAfterEvidencePagePdf.internal.pageSize.width - 10, prodAfterEvidencePagePdf.internal.pageSize.height - 10);

        title = `Production Environment Screenshot Evidence (After)`;
        prodAfterEvidencePagePdf.setFontSize(15);

        // Calculate the X-coordinate to center the title
        titleWidth = prodAfterEvidencePagePdf.getStringUnitWidth(title) * prodAfterEvidencePagePdf.internal.getFontSize() / prodAfterEvidencePagePdf.internal.scaleFactor;
        centerX = (prodAfterEvidencePagePdf.internal.pageSize.width - titleWidth) / 2;

        prodAfterEvidencePagePdf.setFont('helvetica', 'bold'); // Set the font to bold
        prodAfterEvidencePagePdf.setTextColor(0, 0, 0); // Reset the font color to black
        prodAfterEvidencePagePdf.text(title, centerX, 20); // Center the title horizontally
        prodAfterEvidencePagePdf.line(centerX, 21, centerX + prodAfterEvidencePagePdf.getTextWidth(title), 21); // Add underline
        prodAfterEvidencePagePdf.setFont('helvetica', 'normal'); // Reset the font to normal

        // Handling After Screenshots
        if (this.state.savedData[0]?.after_prod_ss) {
            prodAfterEvidencePagePdf.rect(5, 5, prodAfterEvidencePagePdf.internal.pageSize.width - 10, prodAfterEvidencePagePdf.internal.pageSize.height - 10);
            currentY = 20; // Reset the Y-coordinate for the new page
            prodAfterEvidencePagePdf.setTextColor(0, 115, 207); // Set the font color to blue
            currentY += 10;
            const afterProdImage = new Image();
            afterProdImage.src = require(`../../Evidence_Screenshots/${this.state.savedData[0].after_prod_ss}`);
            prodAfterEvidencePagePdf.addImage(afterProdImage, 'JPEG', 10, currentY, 180, 180); // Adjust width and height as needed
        }  


        // Convert the generated PDF to bytes
        const generatedCoverPdfBytes = coverPagePdf.output('arraybuffer');

        const generatedTestPdfBytes = testWorknotesPagePdf.output('arraybuffer');
        const generatedTestBeforeEvidencePdfBytes = testBeforeEvidencePagePdf.output('arraybuffer');
        const generatedTestAfterEvidencePdfBytes = testAfterEvidencePagePdf.output('arraybuffer');

        const generatedProdPdfBytes = prodWorknotesPagePdf.output('arraybuffer');
        const generatedProdBeforeEvidencePdfBytes = prodBeforeEvidencePagePdf.output('arraybuffer');
        const generatedProdAfterEvidencePdfBytes = prodAfterEvidencePagePdf.output('arraybuffer');

        // Load the locally saved PDFs
        const beforeTestPdfUrl = require(`../../Evidence_Screenshots/${this.state.savedData[0].before_test_ss}`);
        const beforeTestPdfBytes = await fetch(beforeTestPdfUrl).then((res) => res.arrayBuffer());

        const afterTestPdfUrl = require(`../../Evidence_Screenshots/${this.state.savedData[0].after_test_ss}`);
        const afterTestPdfBytes = await fetch(afterTestPdfUrl).then((res) => res.arrayBuffer());

        const beforeProdPdfUrl = require(`../../Evidence_Screenshots/${this.state.savedData[0].before_prod_ss}`);
        const beforeProdPdfBytes = await fetch(beforeProdPdfUrl).then((res) => res.arrayBuffer());

        const afterProdPdfUrl = require(`../../Evidence_Screenshots/${this.state.savedData[0].after_prod_ss}`);
        const afterProdPdfBytes = await fetch(afterProdPdfUrl).then((res) => res.arrayBuffer());

        // Create a new PDFDocument
        const pdfDoc = await PDFDocument.create();
        var page;

        // Embed the generated PDF
        const generatedCoverPdfDoc = await PDFDocument.load(generatedCoverPdfBytes);
        const generatedCoverPdfPages = generatedCoverPdfDoc.getPages();

        const generatedTestPdfDoc = await PDFDocument.load(generatedTestPdfBytes);
        const generatedTestPdfPages = generatedTestPdfDoc.getPages();

        const generatedTestBeforeEvidencePdfDoc = await PDFDocument.load(generatedTestBeforeEvidencePdfBytes);
        const generatedTestBeforeEvidencePdfPages = generatedTestBeforeEvidencePdfDoc.getPages();

        const generatedTestAfterEvidencePdfDoc = await PDFDocument.load(generatedTestAfterEvidencePdfBytes);
        const generatedTestAfterEvidencePdfPages = generatedTestAfterEvidencePdfDoc.getPages();

        const generatedProdPdfDoc = await PDFDocument.load(generatedProdPdfBytes);
        const generatedProdPdfPages = generatedProdPdfDoc.getPages();

        const generatedProdBeforeEvidencePdfDoc = await PDFDocument.load(generatedProdBeforeEvidencePdfBytes);
        const generatedProdBeforeEvidencePdfPages = generatedProdBeforeEvidencePdfDoc.getPages();

        const generatedProdAfterEvidencePdfDoc = await PDFDocument.load(generatedProdAfterEvidencePdfBytes);
        const generatedProdAfterEvidencePdfPages = generatedProdAfterEvidencePdfDoc.getPages();

        for (const generatedPage of generatedCoverPdfPages) {
            const embeddedPage = await pdfDoc.embedPage(generatedPage);
            // Add a blank new page to the document
            page = pdfDoc.addPage();
            // Draw the page
            page.drawPage(embeddedPage);
        }

        // Embed the locally saved PDFs
        const beforeTestPdfDoc = await PDFDocument.load(beforeTestPdfBytes);
        const beforeTestPdfPages = beforeTestPdfDoc.getPages();

        const afterTestPdfDoc = await PDFDocument.load(afterTestPdfBytes);
        const afterTestPdfPages = afterTestPdfDoc.getPages();

        const beforeProdPdfDoc = await PDFDocument.load(beforeProdPdfBytes);
        const beforeProdPdfPages = beforeProdPdfDoc.getPages();

        const afterProdPdfDoc = await PDFDocument.load(afterProdPdfBytes);
        const afterProdPdfPages = afterProdPdfDoc.getPages();


        for (const generatedPage of generatedTestPdfPages) {
            const embeddedPage = await pdfDoc.embedPage(generatedPage);
            // Add a blank new page to the document
            page = pdfDoc.addPage();
            // Draw the page
            page.drawPage(embeddedPage);
        }

        for (const generatedBeforeTestPage of generatedTestBeforeEvidencePdfPages) {
            const embeddedPage = await pdfDoc.embedPage(generatedBeforeTestPage);
            // Add a blank new page to the document
            page = pdfDoc.addPage();
            // Draw the page
            page.drawPage(embeddedPage);
        }
        for (const beforeTestPage of beforeTestPdfPages) {
            const embeddedPage = await pdfDoc.embedPage(beforeTestPage);
            // Add a blank new page to the document
            page = pdfDoc.addPage();
            // Draw the page
            page.drawPage(embeddedPage);
        }

        for (const generatedAfterTestPage of generatedTestAfterEvidencePdfPages) {
            const embeddedPage = await pdfDoc.embedPage(generatedAfterTestPage);
            // Add a blank new page to the document
            page = pdfDoc.addPage();
            // Draw the page
            page.drawPage(embeddedPage);
        }
        for (const afterTestPage of afterTestPdfPages) {
            const embeddedPage = await pdfDoc.embedPage(afterTestPage);
            // Add a blank new page to the document
            page = pdfDoc.addPage();
            // Draw the page
            page.drawPage(embeddedPage);
        }



        for (const generatedPage of generatedProdPdfPages) {
            const embeddedPage = await pdfDoc.embedPage(generatedPage);
            // Add a blank new page to the document
            page = pdfDoc.addPage();
            // Draw the page
            page.drawPage(embeddedPage);
        }

        for (const generatedProdTestPage of generatedProdBeforeEvidencePdfPages) {
            const embeddedPage = await pdfDoc.embedPage(generatedProdTestPage);
            // Add a blank new page to the document
            page = pdfDoc.addPage();
            // Draw the page
            page.drawPage(embeddedPage);
        }
        for (const beforeProdPage of beforeProdPdfPages) {
            const embeddedPage = await pdfDoc.embedPage(beforeProdPage);
            // Add a blank new page to the document
            page = pdfDoc.addPage();
            // Draw the page
            page.drawPage(embeddedPage);
        }

        for (const generatedProdTestPage of generatedProdAfterEvidencePdfPages) {
            const embeddedPage = await pdfDoc.embedPage(generatedProdTestPage);
            // Add a blank new page to the document
            page = pdfDoc.addPage();
            // Draw the page
            page.drawPage(embeddedPage);
        }
        for (const afterProdPage of afterProdPdfPages) {
            const embeddedPage = await pdfDoc.embedPage(afterProdPage);
            // Add a blank new page to the document
            page = pdfDoc.addPage();
            // Draw the page
            page.drawPage(embeddedPage);
        }


        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();

        // Trigger the browser to download the PDF document
        saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `ChangeControlInfo_${this.props.params.CHG_ticket}.pdf`);

    };



    render() {
        const { params } = this.props;
        const CHG_ticket = params.CHG_ticket;


        return (
            <div className="card shadow mb-4">

                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                        Information for Ticket: {CHG_ticket}
                    </h6>
                </div>

                <div className="card-body" style={{ marginTop: 10 }}>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        style={{ position: "absolute", right: 1025, top: 4, textTransform: "none" }}
                        startIcon={<DownloadIcon />}
                        onClick={this.exportPDF}
                    >
                        Download PDF Report
                    </Button>
                    <Form>
                        <Row className="mb-5">
                            <Col xs={4}>
                                <FloatingLabel controlId="formGridChangeControl" label="Change Control Ticket" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                                    <Form.Control disabled placeholder="Change Control" defaultValue={this.state.savedData[0]?.CHG_number} />
                                </FloatingLabel>
                            </Col>

                            <Form.Group xs={3} as={Col} controlId="formGridSpace"></Form.Group>

                            <Col xs={4}>
                                <FloatingLabel controlId="formGridSecurityUpdate" label="Security Update" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                                    <Form.Control disabled placeholder="Security Update" defaultValue={this.state.savedData[0]?.security_update} />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <Row className="mb-5">
                            <Col xs={4}>
                                <FloatingLabel controlId="formGridDateOpened" label="Date Entered">
                                    <Form.Control disabled style={{ height: '70px' }} placeholder="Date Opened" value={this.formatDate(this.state.savedData[0]?.CHG_date)} />
                                </FloatingLabel>
                            </Col>

                            <Form.Group xs={3} as={Col} controlId="formGridSpace"></Form.Group>

                            <Col xs={4}>
                                <FloatingLabel controlId="formGridSecurityReviewDate" label="Security Review Date">
                                    <Form.Control disabled style={{ height: '70px' }} placeholder="Security Review Date" defaultValue={this.formatDate(this.state.savedData[0]?.security_review_date)} />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <br></br>

                        <Row className="mb-5">
                            <Col>
                                <FloatingLabel controlId="formGridDescription" label="Description" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                                    <Form.Control disabled placeholder="Description" as="textarea" style={{ height: '300px' }} defaultValue={this.state.savedData[0]?.description} />
                                </FloatingLabel>
                            </Col>

                            <Form.Group as={Col} controlId="formGridSpace"></Form.Group>
                        </Row>

                        <br></br>
                        <br></br>
                        <br></br>

                        <h4>Test Environment</h4>

                        <br></br>

                        <Row className="mb-5">
                            <Col>
                                <FloatingLabel controlId="formGridTestApprovalDate" label="Test Approval Date">
                                    <Form.Control disabled style={{ height: '70px' }} placeholder="Test Approval Date" defaultValue={this.formatDate(this.state.savedData[0]?.test_approve_date)} />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="formGridTestInstallDate" label="Test Install Date">
                                    <Form.Control disabled style={{ height: '70px' }} placeholder="Test Install Date" defaultValue={this.formatDate(this.state.savedData[0]?.test_install_date)} />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <Row className="mb-5">
                            <Col>
                                <FloatingLabel controlId="formGridTestWorknotes" label="Test Worknotes" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                                    <Form.Control disabled placeholder="Test Worknotes" as="textarea" style={{ height: '300px' }} defaultValue={this.state.savedData[0]?.test_worknotes} />
                                </FloatingLabel>
                            </Col>

                            <Form.Group as={Col} controlId="formGridSpace"></Form.Group>
                        </Row>

                        <Row className="mb-5">
                            <Col>
                                <h6>Before Screenshot (Test)</h6>
                                {this.state.savedData[0]?.before_test_ss && (
                                    <ImageExists
                                        imagePath={require(`../../Evidence_Screenshots/${this.state.savedData[0].before_test_ss}`)}
                                        alt="Before Test Screenshot"
                                        iframeSrc={require(`../../Evidence_Screenshots/${this.state.savedData[0].before_test_ss}`)}
                                        width={1000}
                                        height={800}
                                    />
                                )}

                            </Col>

                            <Col>
                                <h6>After Screenshot (Test)</h6>
                                {this.state.savedData[0]?.after_test_ss && (
                                    <ImageExists
                                        imagePath={require(`../../Evidence_Screenshots/${this.state.savedData[0].after_test_ss}`)}
                                        alt="After Test Screenshot"
                                        iframeSrc={require(`../../Evidence_Screenshots/${this.state.savedData[0].after_test_ss}`)}
                                        width={1000}
                                        height={800}
                                    />
                                )}
                            </Col>
                        </Row>

                        <br></br>
                        <br></br>

                        <h4>Production Environment</h4>

                        <br></br>

                        <Row className="mb-5">
                            <Col>
                                <FloatingLabel controlId="formGridProdApprovalDate" label="Prod Approval Date">
                                    <Form.Control disabled style={{ height: '70px' }} placeholder="Prod Approval Date" defaultValue={this.formatDate(this.state.savedData[0]?.prod_approve_date)} />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="formGridProdInstallDate" label="Prod Install Date">
                                    <Form.Control disabled style={{ height: '70px' }} placeholder="Prod Install Date" defaultValue={this.formatDate(this.state.savedData[0]?.prod_install_date)} />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <Row className="mb-5">
                            <Col>
                                <FloatingLabel controlId="formGridProdWorknotes" label="Prod Worknotes" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                                    <Form.Control disabled placeholder="Prod Worknotes" as="textarea" style={{ height: '300px' }} defaultValue={this.state.savedData[0]?.prod_worknotes} />
                                </FloatingLabel>
                            </Col>

                            <Form.Group as={Col} controlId="formGridSpace"></Form.Group>
                        </Row>

                        <Row className="mb-5">
                            <Col>
                                <h6>Before Screenshot (Production)</h6>
                                {this.state.savedData[0]?.before_prod_ss && (
                                    <ImageExists
                                        imagePath={require(`../../Evidence_Screenshots/${this.state.savedData[0].before_prod_ss}`)}
                                        alt="Before Prod Screenshot"
                                        iframeSrc={require(`../../Evidence_Screenshots/${this.state.savedData[0].before_prod_ss}`)}
                                        width={1000}
                                        height={800}
                                    />
                                )}
                            </Col>

                            <Col>
                                <h6>After Screenshot (Production)</h6>
                                {this.state.savedData[0]?.after_prod_ss && (
                                    <ImageExists
                                        imagePath={require(`../../Evidence_Screenshots/${this.state.savedData[0].after_prod_ss}`)}
                                        alt="After Prod Screenshot"
                                        iframeSrc={require(`../../Evidence_Screenshots/${this.state.savedData[0].after_prod_ss}`)}
                                        width={1000}
                                        height={800}
                                    />
                                )}
                            </Col>
                        </Row>

                    </Form>
                </div>
            </div>
        );

    }
}

export default withRouter(SingleChangeControlInfo);

