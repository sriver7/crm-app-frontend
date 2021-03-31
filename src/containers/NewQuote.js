import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {API} from "aws-amplify";
import {onError} from "../libs/errorLib";
import {Form} from "react-bootstrap";
import "./NewCustomer.css";
import LoaderButton from "../components/LoaderButton";
import {Col} from "react-bootstrap";

export default function Quote(){
    const history = useHistory();
    const{id} = useParams();

    const [docuSign, setDocuSign] = useState("");
    const [customer_name, setCustomerName] = useState("");
    const [customer_email, setCustomerEmail] = useState("");
    const [loc_address_1, setLoc_address_1] = useState("");
    const [loc_address_2, setLoc_address_2] = useState("");
    const [loc_city, setLoc_City] = useState("");
    const [loc_state, setLoc_State] = useState("");
    const [loc_zip, setLoc_zip] = useState("");
    const [loc_grass, setLoc_grass] = useState("");
    const [loc_mulch, setLoc_mulch] = useState("");
    const [loc_fallCleanup, setLoc_fall_cleanup] = useState("");
    const [loc_fertilizer, setLoc_fertilizer] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateForm(){
        return loc_address_1.length>0;
    }

    function sendQuote(quote){
        return API.put("rml-crm-app", `/locations/${id}`, {
            body: quote
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        
        try {
            
            await sendQuote({
                    docuSign,
                    customer_name,
                    customer_email,
                    loc_address_1,
                    loc_address_2,
                    loc_city,
                    loc_state,
                    loc_zip,
                    loc_grass,
                    loc_mulch,
                    loc_fallCleanup,
                    loc_fertilizer
            });
            alert("Quote Sent Successfully");
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    return (
        <div className="Quote">
            {(
                <Form onSubmit={handleSubmit}>
                     <Form.Group controlId="DocuSignID">
                        <Form.Label>ID</Form.Label>
                        <Form.Control 
                            value={docuSign} 
                            onChange={(e) => setDocuSign(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Name">
                        <Form.Label>Customer Name:</Form.Label>
                        <Form.Control 
                            value={customer_name} 
                            placeholder="Name" 
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Email">
                        <Form.Label>Customer Email:</Form.Label>
                        <Form.Control 
                            value={customer_email} 
                            placeholder="email@email.com" 
                            onChange={(e) => setCustomerEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Address1">
                        <Form.Label>Address Line 1:</Form.Label>
                        <Form.Control 
                            value={loc_address_1} 
                            placeholder="123 Main Street" 
                            onChange={(e) => setLoc_address_1(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Address2">
                        <Form.Label>Address Line 2:</Form.Label>
                        <Form.Control 
                            value={loc_address_2} 
                            placeholder="Suite 123" 
                            onChange={(e) => setLoc_address_2(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} xs={7} controlId="City">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                value={loc_city} 
                                onChange={(e) => setLoc_City(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="State">
                            <Form.Label>State</Form.Label>
                            <Form.Control 
                                onChange={(e) => setLoc_State(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="ZipCode">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control 
                                value={loc_zip} 
                                pattern="[0-9]{5}" 
                                onChange={(e) => setLoc_zip(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="GrassCut">
                            <Form.Label>Grass Cut</Form.Label>
                            <Form.Control 
                                value={loc_grass} 
                                onChange={(e) => setLoc_grass(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="MulchJob">
                            <Form.Label>Mulch Job</Form.Label>
                            <Form.Control 
                                value={loc_mulch} 
                                onChange={(e) => setLoc_mulch(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="FallCleanup">
                            <Form.Label>Fall Cleanup</Form.Label>
                            <Form.Control 
                                value={loc_fallCleanup} 
                                onChange={(e) => setLoc_fall_cleanup(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="Fertilizer">
                            <Form.Label>Fertilizer</Form.Label>
                            <Form.Control 
                                value={loc_fertilizer} 
                                onChange={(e) => setLoc_fertilizer(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>
                    <LoaderButton
                        block
                        size="lg"
                        type="submit"
                        isLoading={isLoading}                        
                        disabled={!validateForm()}
                    >
                        Send Quote
                    </LoaderButton>
            </Form>
            )

            }
        </div>
    );
}