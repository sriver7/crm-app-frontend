import React, {useState, useEffect} from "react";
import {useParams, useHistory, Link} from "react-router-dom";
import {API} from "aws-amplify";
import {onError} from "../libs/errorLib";
import {Form} from "react-bootstrap";
import "./NewCustomer.css";
import LoaderButton from "../components/LoaderButton";
import {Col} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import Table from "react-bootstrap/Table"
import Accordion from "react-bootstrap/Accordion"
import {BsCardList} from "react-icons/bs"
import {MdAttachMoney} from "react-icons/md"
import {FaFileInvoiceDollar} from "react-icons/fa"
import Card from "react-bootstrap/Card"

export default function Customer(){
    const{id} = useParams();

    const history = useHistory();
    const [customer, setCustomer] = useState(null);
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
    const [isDeleting, setIsDeleting] = useState(false);

    const [locations, setLocations] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        function loadCustomer() {
            return API.get("rml-crm-app", `/customers/${id}`);
        }

        async function onLoad(){
            try {
                const customer = await loadCustomer();
                const {
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
                } = customer;

                setCustomer_name(customer_name);
                setCustomer_phone_1(customer_phone_1);
                setCustomer_phone_2(customer_phone_2);
                setCustomer_address_1(customer_address_1);
                setCustomer_address_2(customer_address_2);
                setCustomer_city(customer_city);
                setCustomer_state(customer_state);
                setCustomer_zip(customer_zip);
                setCustomer_email(customer_email);
                setCustomer_note(customer_note);
                setCustomer_active(customer_is_active);
                setCustomer(customer);

                const locations = await loadLocations();
                const locations_json = locations.Items;
                const invoices = await loadInvoices();
                const invoices_json = invoices.Items;
                const payments = await loadPayments();
                const payments_json = payments.Items;
                setLocations(locations_json);
                setInvoices(invoices_json);
                setPayments(payments_json);
            } catch (e){
                onError(e);
            }
        }

        onLoad();
    }, [id]);

    function loadLocations(){
        return API.get("rml-crm-app", `/locations/customer/${id}`);
    }

    function loadInvoices(){
        return API.get("rml-crm-app", `/invoices/customer/${id}`);
    }

    function loadPayments(){
        return API.get("rml-crm-app", `/payments/customer/${id}`);
    }

    function validateForm(){
        return customer_name.length > 0 && customer_phone_1.length > 0;
    }

    function saveCustomer(customer){
        return API.put("rml-crm-app", `/customers/${id}`, {
            body: customer
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        
        try {
            
            await saveCustomer({
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
            });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function deleteCustomer() {
        return API.del("rml-crm-app", `/customers/${id}`);
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this customer? This action is not reversable."
        );

        if(!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            await deleteCustomer();
            history.push("/");
        } catch (e) {
            onError(e);
            setIsDeleting(false);
        }
    }

    function renderLocationsList(locations) {
        return (
            <>
            {locations.map(({ locationId, loc_address_1, loc_city, loc_grass, loc_mulch, loc_fallCleanup, loc_fertilizer}) => (
            <LinkContainer key={locationId} to={`/locations/${locationId}`}>
                <ListGroup.Item action>
                <span className="font-weight-bold float-left">
                    Address: {loc_address_1}
                </span>
                <span className="font-weight-bold float-right">
                    {loc_city}
                </span>
                <br></br>
                <span className="text-muted float-left">
                    Grass Cut: ${loc_grass}
                </span>
                    <span className="text-muted float-right">
                    Mulch: ${loc_mulch}
                </span>
                <br></br>
                <span className="text-muted float-left">
                    Fall Cleanup: ${loc_fallCleanup}
                </span>
                    <span className="text-muted float-right">
                    Fertilizer: ${loc_fertilizer}
                </span>
                </ListGroup.Item>
            </LinkContainer>
            ))}
            </>
        );
    }

    function renderInvoicesList(invoices) {
        return (
            <>
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Invoice Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(({invoiceId, invoice_amount}) => (
            <tr>
              <td>{invoiceId}</td>
              <td>{invoice_amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
            </>
        );
    }

    function renderPaymentsList(payments) {
        return (
            <>
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Payment Amount</th>
            <th>Check Number</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(({paymentId, payment_amount, payment_check_num}) => (
            <tr>
                <td>{paymentId}</td>
                <td>{payment_amount}</td>
                <td>{payment_check_num}</td>
            </tr>
          ))}
        </tbody>
      </Table>
            </>
        );
    }



    return (
        <div className="Customer">
            {customer && (
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} xs={7} controlId="Name">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control 
                                value={customer_name} 
                                onChange={(e) => setCustomer_name(e.target.value)}/>
                            <Form.Text>Required</Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="Email">
                            <Form.Label>Customer E-mail</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={customer_email} 
                                placeholder="email@email.com" 
                                onChange={(e) => setCustomer_email(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Label>Preferred Phone Number:</Form.Label>
                            <Form.Control 
                                required type="tel" 
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                                value={customer_phone_1} 
                                placeholder="000-000-0000"
                                onChange={(e) => setCustomer_phone_1(e.target.value)}
                            />
                            <Form.Text>Required</Form.Text>
                        </Col>
                        <Col>
                            <Form.Label>Alternative Phone Number:</Form.Label>
                            <Form.Control 
                                type="tel" 
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                                value={customer_phone_2} 
                                placeholder="000-000-0000" 
                                onChange={(e) => setCustomer_phone_2(e.target.value)}
                            />
                        </Col> 
                    </Form.Row>
                    <Form.Row><br></br></Form.Row>
                    <Form.Group controlId="mailing_address_1">
                        <Form.Label>Mailing Address Line 1:</Form.Label>
                        <Form.Control 
                            value={customer_address_1} 
                            placeholder="123 Main Street" 
                            onChange={(e) => setCustomer_address_1(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="mailing_address_2">
                        <Form.Label>Mailing Address Line 2:</Form.Label>
                        <Form.Control value={customer_address_2} placeholder="Suite 123" onChange={(e) => setCustomer_address_2(e.target.value)}/>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} xs={7} controlId="City">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                value={customer_city} 
                                onChange={(e) => setCustomer_city(e.target.value)}
                            />
                        </Form.Group>
                    <Form.Group as={Col} controlId="State">
                        <Form.Label>State</Form.Label>
                        <Form.Control 
                            as="select" 
                            defaultValue="MD" 
                            value={customer_state} 
                            onChange={(e) => setCustomer_state(e.target.value)}
                        >
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
                        <Form.Control 
                            value={customer_zip} 
                            pattern="[0-9]{5}" 
                            onChange={(e) => setCustomer_zip(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="content">
                    <Form.Label>Customer Is Active:</Form.Label>
                    <Form.Check 
                        type="switch" id="customer_is_active" 
                        value={customer_is_active} onChange={(e) => setCustomer_active(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="customer_note">
                    <Form.Control
                        as="textarea"
                        value={customer_note}
                        onChange={(e) => setCustomer_note(e.target.value)}
                    />
                </Form.Group>
                <LoaderButton
                    block
                    size="lg"
                    type="submit"
                    isLoading={isLoading}                        
                    disabled={!validateForm()}
                >
                    Save
                </LoaderButton>
                <LoaderButton
                    block
                    size="lg"
                    variant="danger"
                    onClick={handleDelete}
                    isLoading={isDeleting}
                >
                    Delete
                </LoaderButton>
            </Form>
            )

            }
            <LinkContainer 
                to={{
                    pathname: `/locations/new/${id}`
                }}>
                <ListGroup.Item action className="py-3 text-nowrap text-truncate">
                <span className="ml-2 font-weight-bold">Create a new Location</span>
                </ListGroup.Item>
            </LinkContainer>
            <ListGroup>{!isLoading && renderLocationsList(locations)}</ListGroup>
            

            <LinkContainer 
                to={{
                    pathname: `/invoice/new/${id}`
                }}>
                <ListGroup.Item action className="py-3 text-nowrap text-truncate">
                <span className="ml-2 font-weight-bold">Add a New Invoice</span>
                <span className="ml-2 float-left"><FaFileInvoiceDollar size={23} /></span>
                
                </ListGroup.Item>
            </LinkContainer>
            <LinkContainer 
                to={{
                    pathname: `/payment/new/${id}`
                }}>
                <ListGroup.Item action className="py-3 text-nowrap text-truncate">
                <span className="ml-2 font-weight-bold">Enter a Payment</span>
                <span className="ml-2 float-left"><MdAttachMoney size={23} /></span>
                </ListGroup.Item>
            </LinkContainer>
            <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" className="font-weight-bold py-3 text-nowrap text-truncate">

                <span className="ml-2">View Payments/Invoices</span>
                <span className="ml-2 float-left"><BsCardList size={23} /></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="Invoices" title="Invoices">
                    <br></br>
                   {!isLoading && renderInvoicesList(invoices)}
                </Tab>
                <Tab eventKey="Payments" title="Payments">
                    <br></br>
                    {!isLoading && renderPaymentsList(payments)}
                </Tab>
                </Tabs>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
        </div>
    );
}