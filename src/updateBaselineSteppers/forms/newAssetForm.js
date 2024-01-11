// eslint-disable-next-line
import { useEffect } from 'react';
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";

function NewAssetForm({ onFormSave, savedData }) {

    // useEffect(() => {
    //     console.log(formData);
    // }, [formData]);

    const handleSave = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        const formInputs = {
            SerialNumber:           form.elements.formGridSerialNumber.value,
                Name:               form.elements.formGridName.value,
                IPs:                form.elements.formGridIPs.value,
                Function:           form.elements.formGridFunction.value,
                Type:               form.elements.formGridType.value,
                Manufacturer:       form.elements.formGridManufacturer.value,
                Model:              form.elements.formGridModel.value,
                OS:                 form.elements.formGridOS.value,
                Group:              form.elements.formGridGroup.value,
                BESClass:           form.elements.formGridClass.value,
                Impact:             form.elements.formGridImpact.value,
                Status:             form.elements.formGridStatus.value,
                Rack:               form.elements.formGridRack.value,
                Location:           form.elements.formGridLocation.value,
                PSPid:              form.elements.formGridPSP.value,
                ESPid:              form.elements.formGridESP.value,
                Team:               form.elements.formGridTeam.value,
                Owner:              form.elements.formGridOwner.value,
                CommissionDate:     form.elements.formGridDate1.value,
                DecommissionDate:   form.elements.formGridDate2.value,
        };

        onFormSave(formInputs);

    };


    return (
        <Form onChange={handleSave}>

            <Row className="mb-5">
                <Col>
                    <FloatingLabel controlId="formGridSerialNumber" label="Serial Number" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                        <Form.Control placeholder="Serial Number" defaultValue={savedData.SerialNumber} />
                    </FloatingLabel>
                </Col>

                <Col>
                    <FloatingLabel controlId="formGridName" label="Host Name" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                        <Form.Control placeholder="Name" defaultValue={savedData.Name} />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col>
                    <FloatingLabel controlId="formGridIPs" label="IP Address" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                        <Form.Control placeholder="IPs" as="textarea" style={{ height: '100px' }} defaultValue={savedData.IPs} />
                    </FloatingLabel>
                </Col>

                <Form.Group as={Col} controlId="formGridSpace"></Form.Group>
            </Row>

            <Row className="mb-5">
                <Col>
                    <FloatingLabel controlId="formGridFunction" label="Business Function" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                        <Form.Control placeholder="Function" as="textarea" style={{ height: '100px' }} defaultValue={savedData.Function} />
                    </FloatingLabel>
                </Col>

                <Form.Group as={Col} controlId="formGridSpace"></Form.Group>
            </Row>

            <br></br>

            <Row className="mb-5">
                <Col>
                    <FloatingLabel controlId="formGridType" label="Type">
                        <Form.Select defaultValue={savedData.Type}>
                            <option></option>
                            <option>Physical</option>
                            <option>Virtual</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Col>
                    <FloatingLabel controlId="formGridManufacturer" label="Manufacturer" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }} >
                        <Form.Control placeholder="Manufacturer" defaultValue={savedData.Manufacturer} />
                    </FloatingLabel>
                </Col>

                <Col>
                    <FloatingLabel controlId="formGridModel" label="Model" style={{ color: 'rgba(var(--bs-body-color-rgb),.65)' }}>
                        <Form.Control placeholder="Model" defaultValue={savedData.Model} />
                    </FloatingLabel>
                </Col>

                <Col>
                    <FloatingLabel controlId="formGridOS" label="OS">
                        <Form.Select defaultValue={savedData.OS}>
                            <option></option>
                            <option>2016</option>
                            <option>2012</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
            <br></br>

            <Row className="mb-5">
                <Col>
                    <FloatingLabel controlId="formGridGroup" label="Group">
                        <Form.Select defaultValue={savedData.Group}>
                            <option></option>
                            <option>IT Infrastructure</option>
                            <option>KOI</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Col>
                    <FloatingLabel controlId="formGridClass" label="BES Classification">
                        <Form.Select defaultValue={savedData.BESClass}>
                            <option></option>
                            <option>PACS</option>
                            <option>EACMS</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Col>
                    <FloatingLabel controlId="formGridImpact" label="Impact Rating">
                        <Form.Select defaultValue={savedData.Impact}>
                            <option></option>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Col>
                    <FloatingLabel controlId="formGridStatus" label="Status">
                        <Form.Select defaultValue={savedData.Status}>
                            <option></option>
                            <option>Deployed</option>
                            <option>Decommissioned</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
            <br></br>

            <Row className="mb-4">
                <Col>
                    <FloatingLabel controlId="formGridRack" label="Rack">
                        <Form.Select defaultValue={savedData.Rack}>
                            <option></option>
                            <option>Test</option>
                            <option>Production</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Col>
                    <FloatingLabel controlId="formGridLocation" label="Location">
                        <Form.Select defaultValue={savedData.Location}>
                            <option></option>
                            <option>...</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Form.Group as={Col} controlId="formGridSpace"></Form.Group>
                <Form.Group as={Col} controlId="formGridSpace"></Form.Group>
            </Row>

            <Row className="mb-5">
                <Col>
                    <FloatingLabel controlId="formGridPSP" label="PSP ID">
                        <Form.Select defaultValue={savedData.PSPid}>
                            <option></option>
                            <option>...</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Col>
                    <FloatingLabel controlId="formGridESP" label="ESP ID">
                        <Form.Select defaultValue={savedData.ESPid}>
                            <option></option>
                            <option>...</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Form.Group as={Col} controlId="formGridSpace"></Form.Group>
                <Form.Group as={Col} controlId="formGridSpace"></Form.Group>
            </Row>
            <br></br>

            <Row className="mb-5">
                <Col>
                    <FloatingLabel controlId="formGridTeam" label="Team">
                        <Form.Select defaultValue={savedData.Team}>
                            <option></option>
                            <option>Network</option>
                            <option>Systems</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Col>
                    <FloatingLabel controlId="formGridOwner" label="Tech Owner">
                        <Form.Select defaultValue={savedData.Owner}>
                            <option></option>
                            <option>Jimmy</option>
                            <option>Leo</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Form.Group as={Col} controlId="formGridSpace"></Form.Group>
                <Form.Group as={Col} controlId="formGridSpace"></Form.Group>
            </Row>

            <br></br>

            <Row className="mb-5">
                <Col>
                    <FloatingLabel controlId="formGridDate1" label="Commission Date">
                        <Form.Control type="date" style={{ height: '70px' }} placeholder="Commission date" defaultValue={savedData.CommissionDate} />
                    </FloatingLabel>
                </Col>

                <Col>
                    <FloatingLabel controlId="formGridDate2" label="Decommission Date">
                        <Form.Control type="date" style={{ height: '70px' }} placeholder="Decommission Date" defaultValue={savedData.DecommissionDate} />
                    </FloatingLabel>
                </Col>


                <Form.Group xs={1} as={Col} controlId="formGridSpace"></Form.Group>
                <Form.Group xs={1} as={Col} controlId="formGridSpace"></Form.Group>
            </Row>

        </Form>
    );
}


export default NewAssetForm;