// eslint-disable-next-line
import { useEffect, useState } from 'react';
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';

function NewCHGForm({ onFormSave, savedData }) {

    const [selectedFileTestBefore, setSelectedFileTestBefore] = useState(savedData.TestBeforeScreenshot || null);
    const [selectedFileTestAfter, setSelectedFileTestAfter] = useState(savedData.TestAfterScreenshot || null);
    const [selectedFileProdBefore, setSelectedFileProdBefore] = useState(savedData.ProdBeforeScreenshot || null);
    const [selectedFileProdAfter, setSelectedFileProdAfter] = useState(savedData.ProdAfterScreenshot || null);

    const handleSave = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        const formInputs = {
            ChangeControl:        form.elements.formGridChangeControl.value,
            DateOpened:           form.elements.formGridDateOpened.value,
            SecurityUpdate:       form.elements.formGridSecurityUpdate.value,
            SecurityReviewDate:   form.elements.formGridSecurityReviewDate.value,
            Description:          form.elements.formGridDescription.value,
            TestApprovalDate:     form.elements.formGridTestApprovalDate.value,
            TestInstallDate:      form.elements.formGridTestInstallDate.value,
            TestWorknotes:        form.elements.formGridTestWorknotes.value,
            ProdApprovalDate:     form.elements.formGridProdApprovalDate.value,
            ProdInstallDate:      form.elements.formGridProdInstallDate.value,
            ProdWorknotes:        form.elements.formGridProdWorknotes.value,
            TestBeforeScreenshot: selectedFileTestBefore,
            TestAfterScreenshot:  selectedFileTestAfter,
            ProdBeforeScreenshot: selectedFileProdBefore,
            ProdAfterScreenshot:  selectedFileProdAfter
        };

        onFormSave(formInputs);

        console.log(formInputs);
        //console.log(formInputs.TestBeforeScreenshot.name);
    };

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    



    const VisuallyHiddenInput = styled('input')({
        clip: 'react(0 0 0 0)',
        clipPath: 'insert(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1
    });

    const handleFileChangeTestBefore = (event) => {
        const file = event.target.files[0];
        if (file) {

          // Create a FormData object to send the file to the server
          const formData = new FormData();
          formData.append('file', file);

          // Make an HTTP POST request using the fetch API
          fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the response from the server (e.g., show a success message)
              console.log(data);
              // Save the uploaded filename to frontend
              setSelectedFileTestBefore(data.fileName);
            })
            .catch((error) => {
              // Handle any errors (e.g., show an error message)
              console.error(error);
            });
        }
      };
    const handleFileChangeTestAfter = (event) => {
        const file = event.target.files[0];
        if (file) {

          // Create a FormData object to send the file to the server
          const formData = new FormData();
          formData.append('file', file);

          // Make an HTTP POST request using the fetch API
          fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the response from the server (e.g., show a success message)
              console.log(data);
              // Save the uploaded filename to frontend
              setSelectedFileTestAfter(data.fileName);
            })
            .catch((error) => {
              // Handle any errors (e.g., show an error message)
              console.error(error);
            });
        }
    };
    const handleFileChangeProdBefore = (event) => {
        const file = event.target.files[0];
        if (file) {

          // Create a FormData object to send the file to the server
          const formData = new FormData();
          formData.append('file', file);

          // Make an HTTP POST request using the fetch API
          fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the response from the server (e.g., show a success message)
              console.log(data);
              // Save the uploaded filename to frontend
              setSelectedFileProdBefore(data.fileName);
            })
            .catch((error) => {
              // Handle any errors (e.g., show an error message)
              console.error(error);
            });
        }
    };
    const handleFileChangeProdAfter = (event) => {
        const file = event.target.files[0];
        if (file) {

          // Create a FormData object to send the file to the server
          const formData = new FormData();
          formData.append('file', file);

          // Make an HTTP POST request using the fetch API
          fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the response from the server (e.g., show a success message)
              console.log(data);
              // Save the uploaded filename to frontend
              setSelectedFileProdAfter(data.fileName);
            })
            .catch((error) => {
              // Handle any errors (e.g., show an error message)
              console.error(error);
            });
        }
    };

    const resetFileTestBefore = () => {
        setSelectedFileTestBefore(null);
    };
    const resetFileTestAfter = () => {
        setSelectedFileTestAfter(null);
    };
    const resetFileProdBefore = () => {
        setSelectedFileProdBefore(null);
    };
    const resetFileProdAfter = () => {
        setSelectedFileProdAfter(null);
    };

    return (
        <Form onChange={handleSave}>

            <Row className="mb-5">
                <Col xs={4}>
                    <FloatingLabel controlId="formGridChangeControl" label="Change Control Ticket" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                        <Form.Control placeholder="Change Control" defaultValue={savedData.ChangeControl} />
                    </FloatingLabel>
                </Col>

                <Form.Group xs={3} as={Col} controlId="formGridSpace"></Form.Group>

                <Col xs={4}>
                    <FloatingLabel controlId="formGridSecurityUpdate" label="Security Update">
                        <Form.Select defaultValue={savedData.SecurityUpdate}>
                            <option></option>
                            <option>Yes</option>
                            <option>No</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col xs={4}>
                    <FloatingLabel controlId="formGridDateOpened" label="Date Entered">
                        <Form.Control type="date" style={{ height: '70px' }} placeholder="Date Entered" defaultValue={savedData.DateOpened || getCurrentDate()} />
                    </FloatingLabel>
                </Col>

                <Form.Group xs={3} as={Col} controlId="formGridSpace"></Form.Group>

                <Col xs={4}>
                    <FloatingLabel controlId="formGridSecurityReviewDate" label="Security Review Date">
                        <Form.Control type="date" style={{ height: '70px' }} placeholder="Security Review Date" defaultValue={savedData.SecurityReviewDate} />
                    </FloatingLabel>
                </Col>
            </Row>

            <br></br>

            <Row className="mb-5">
                <Col>
                    <FloatingLabel controlId="formGridDescription" label="Description" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                        <Form.Control placeholder="Description" as="textarea" style={{ height: '300px' }} defaultValue={savedData.Description} />
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
                        <Form.Control type="date" style={{ height: '70px' }} placeholder="Test Approval Date" defaultValue={savedData.TestApprovalDate} />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="formGridTestInstallDate" label="Test Install Date">
                        <Form.Control type="date" style={{ height: '70px' }} placeholder="Test Install Date" defaultValue={savedData.TestInstallDate} />
                    </FloatingLabel>
                </Col>

                <Form.Group as={Col} controlId="formGridSpace">
                    <Button
                        component="label"
                        size="large"
                        variant="contained"
                        onClick={resetFileTestBefore}
                        style={{ marginTop: "17px", marginBottom: "20px", marginLeft: "80px", padding: "12px", textTransform: "none" }}
                    >
                        {selectedFileTestBefore ? ( <> <TaskOutlinedIcon /> {selectedFileTestBefore} </>) : ( <> <UploadFileIcon /> Upload Test Screenshots Before </>)}
                        <VisuallyHiddenInput type="file" onChange={handleFileChangeTestBefore}/>
                    </Button>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridSpace">
                    <Button
                        component="label"
                        size="large"
                        variant="contained"
                        onClick={resetFileTestAfter}
                        style={{ marginTop: "17px", marginBottom: "20px", marginLeft: "80px", padding: "12px", textTransform: "none" }}
                    >
                        {selectedFileTestAfter ? ( <> <TaskOutlinedIcon /> {selectedFileTestAfter} </>) : ( <> <UploadFileIcon /> Upload Test Screenshots After </>)}
                        <VisuallyHiddenInput type="file" onChange={handleFileChangeTestAfter}/>
                    </Button>
                </Form.Group>
            </Row>

            <Row className="mb-5">
                <Col>
                    <FloatingLabel controlId="formGridTestWorknotes" label="Test Worknotes" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                        <Form.Control placeholder="Test Worknotes" as="textarea" style={{ height: '300px' }} defaultValue={savedData.TestWorknotes} />
                    </FloatingLabel>
                </Col>

                <Form.Group as={Col} controlId="formGridSpace"></Form.Group>
            </Row>

            <br></br>
            <br></br>

            <h4>Production Environment</h4>

            <br></br>

            <Row className="mb-5">
                <Col>
                    <FloatingLabel controlId="formGridProdApprovalDate" label="Prod Approval Date">
                        <Form.Control type="date" style={{ height: '70px' }} placeholder="Prod Approval Date" defaultValue={savedData.ProdApprovalDate} />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="formGridProdInstallDate" label="Prod Install Date">
                        <Form.Control type="date" style={{ height: '70px' }} placeholder="Prod Install Date" defaultValue={savedData.ProdInstallDate} />
                    </FloatingLabel>
                </Col>

                <Form.Group as={Col} controlId="formGridSpace">
                    <Button
                        component="label"
                        size="large"
                        variant="contained"
                        onClick={resetFileProdBefore}
                        style={{ marginTop: "17px", marginBottom: "20px", marginLeft: "80px", padding: "12px", textTransform: "none" }}
                    >
                        {selectedFileProdBefore ? ( <> <TaskOutlinedIcon /> {selectedFileProdBefore} </>) : ( <> <UploadFileIcon /> Upload Production Screenshots Before </>)}
                        <VisuallyHiddenInput type="file" onChange={handleFileChangeProdBefore}/>
                    </Button>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridSpace">
                    <Button
                        component="label"
                        size="large"
                        variant="contained"
                        onClick={resetFileProdAfter}
                        style={{ marginTop: "17px", marginBottom: "20px", marginLeft: "80px", padding: "12px", textTransform: "none" }}
                    >
                        {selectedFileProdAfter ? ( <> <TaskOutlinedIcon /> {selectedFileProdAfter} </>) : ( <> <UploadFileIcon /> Upload Production Screenshots After </>)}
                        <VisuallyHiddenInput type="file" onChange={handleFileChangeProdAfter}/>
                    </Button>
                </Form.Group>
            </Row>

            <Row className="mb-5">
                <Col>
                    <FloatingLabel controlId="formGridProdWorknotes" label="Prod Worknotes" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                        <Form.Control placeholder="Prod Worknotes" as="textarea" style={{ height: '300px' }} defaultValue={savedData.ProdWorknotes} />
                    </FloatingLabel>
                </Col>

                <Form.Group as={Col} controlId="formGridSpace"></Form.Group>
            </Row>

        </Form>
    );
}


export default NewCHGForm;