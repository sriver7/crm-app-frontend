import React, {useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import {onError} from "../libs/errorLib";
import "./NewCustomer.css";
import {Col} from "react-bootstrap";
import {API} from "aws-amplify";

export default function NewCustomer() {
    const history = useHistory();
    const [customer_name, setCustomer_name] = useState("");
    const [customer_phone_1, setCustomer_phone_1] = useState("");
    const [customer_phone_2, setCustomer_phone_2] = useState("");
    const [customer_address_1, setCustomer_address_1] = useState("");
    const [customer_address_2, setCustomer_address_2] = useState("");
    const [customer_city, setCustomer_city] = useState("");
    const [customer_state, setCustomer_state] = useState("");
    const [customer_zip, setCustomer_zip] = useState("");
    const [customer_email, setCustomer_email] = useState("");
    const [customer_note, setCustomer_note] = useState("");
    const [customer_is_active, setCustomer_active] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    
    function validateForm() {
        return customer_name.length > 0 && customer_phone_1.length > 0;
    }

  /*function handleFormChange(event) {
      blah = blah.target.blah
  }*/
  
    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await createCustomer({customer_name, customer_phone_1, customer_phone_2, customer_address_1, customer_city, customer_state, customer_zip, customer_email, customer_note, customer_is_active});
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function createCustomer(customer_name, customer_phone_1, customer_phone_2, customer_address_1, customer_address_2, customer_city, customer_state, customer_zip, customer_email, customer_note, customer_is_active) {
        return API.post("rml-crm-app", "/customers", {
            body: 
                customer_name,
                customer_phone_1,
                customer_phone_2,
                customer_address_1,
                customer_address_2,
                customer_city,
                customer_state,
                customer_zip,
                customer_email,
                customer_note,
                customer_is_active
        })
    }
    
    return (
    <div className="NewCustomer">
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} xs={7} controlId="Name">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control value={customer_name} onChange={(e) => setCustomer_name(e.target.value)}/>
                    <Form.Text>Required</Form.Text>
                </Form.Group>
                <Form.Group as={Col} controlId="Email">
                    <Form.Label>Customer E-mail</Form.Label>
                    <Form.Control type="email" value={customer_email} placeholder="email@email.com" onChange={(e) => setCustomer_email(e.target.value)}/>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Label>Preferred Phone Number:</Form.Label>
                    <Form.Control required type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={customer_phone_1} placeholder="000-000-0000"onChange={(e) => setCustomer_phone_1(e.target.value)}/>
                    <Form.Text>Required</Form.Text>
                </Col>
                <Col>
                    <Form.Label>Alternative Phone Number:</Form.Label>
                    <Form.Control type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={customer_phone_2} placeholder="000-000-0000" onChange={(e) => setCustomer_phone_2(e.target.value)}/>
                </Col> 
            </Form.Row>
            <Form.Row> </Form.Row>
            <Form.Group controlId="content">
                <Form.Label>Mailing Address Line 1:</Form.Label>
                <Form.Control value={customer_address_1} placeholder="123 Main Street" onChange={(e) => setCustomer_address_1(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>Mailing Address Line 2:</Form.Label>
                <Form.Control value={customer_address_2} placeholder="Suite 123" onChange={(e) => setCustomer_address_2(e.target.value)}/>
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} xs={7} controlId="City">
                    <Form.Label>City</Form.Label>
                    <Form.Control value={customer_city} onChange={(e) => setCustomer_city(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} controlId="State">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" defaultValue="MD" value={customer_state} onChange={(e) => setCustomer_state(e.target.value)}>
                        <option>MD</option>
                        <option>AL</option>
                        <option>AK</option>
                        <option>AZ</option>
                        <option>AR</option>
                        <option>CA</option>
                        <option>CO</option>
                        <option>CT</option>
                        <option>DE</option>
                        <option>DC</option>
                        <option>FL</option>
                        <option>GA</option>
                        <option>HI</option>
                        <option>ID</option>
                        <option>IL</option>
                        <option>IN</option>
                        <option>IA</option>
                        <option>KS</option>
                        <option>KY</option>
                        <option>LA</option>
                        <option>ME</option>
                        <option>MA</option>
                        <option>MI</option>
                        <option>MN</option>
                        <option>MS</option>
                        <option>MO</option>
                        <option>MT</option>
                        <option>NE</option>
                        <option>NV</option>
                        <option>NH</option>
                        <option>NJ</option>
                        <option>NM</option>
                        <option>NY</option>
                        <option>NC</option>
                        <option>ND</option>
                        <option>OH</option>
                        <option>OK</option>
                        <option>OR</option>
                        <option>PA</option>
                        <option>RI</option>
                        <option>SC</option>
                        <option>SD</option>
                        <option>TN</option>
                        <option>TX</option>
                        <option>UT</option>
                        <option>VT</option>
                        <option>VA</option>
                        <option>WA</option>
                        <option>WV</option>
                        <option>WI</option>
                        <option>WY</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="ZipCode">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control value={customer_zip} pattern="[0-9]{5}" onChange={(e) => setCustomer_zip(e.target.value)}/>
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="content">
                <Form.Label>Customer Is Active:</Form.Label>
                <Form.Check type="switch" id="customer_is_active" value={customer_is_active} onChange={(e) => setCustomer_active(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>Note:</Form.Label>
                <Form.Control value={customer_note} as="textarea" onChange={(e) => setCustomer_note(e.target.value)}/>
            </Form.Group>
            <LoaderButton
                block
                type="submit"
                size="lg"
                variant="primary"
                isLoading={isLoading}
                disabled={!validateForm()}
            >
            Create Customer
            </LoaderButton>
        </Form>
    </div>
  );
}