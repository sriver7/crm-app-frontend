import React, {useState } from "react";
import Form from "react-bootstrap/Form";
import {useParams, useHistory, Link} from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import {onError} from "../libs/errorLib";
import "./NewCustomer.css";
import {Col} from "react-bootstrap";
import {API} from "aws-amplify";

export default function NewLocation() {
    const history = useHistory();
     const{id} = useParams();

    const [loc_address_1, setLoc_address_1] = useState("");
    const [loc_address_2, setLoc_address_2] = useState("");
    const [loc_city, setLoc_city] = useState("");
    const [loc_state, setLoc_state] = useState("");
    const [loc_zip, setLoc_zip] = useState("");
    const [loc_grass, setGrass] = useState("");
    const [loc_mulch, setMulch] = useState("");
    const [loc_fallCleanup, setFallCleanup] = useState("");
    const [loc_fertilizer, setFertilizer] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    function validateForm() {
        return loc_address_1.length > 0;
    }

  /*function handleFormChange(event) {
      blah = blah.target.blah
  }*/

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await createLocation({customerId: id, loc_address_1: loc_address_1, loc_address_2: loc_address_2, loc_city: loc_city, loc_state: loc_state, loc_zip: loc_zip, loc_grass: loc_grass, loc_mulch: loc_mulch, loc_fallCleanup: loc_fallCleanup, loc_fertilizer: loc_fertilizer});
            history.push(`/customer/${id}`);
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function createLocation(customerId, loc_address_1, loc_address_2, loc_city, loc_state, loc_zip, loc_grass, loc_mulch, loc_fallCleanup, loc_fertilizer) {
        return API.post("rml-crm-app", "/locations", {
            body: 
                customerId,
                loc_address_1,
                loc_address_2,
                loc_city,
                loc_state,
                loc_zip,
                loc_grass,
                loc_mulch,
                loc_fallCleanup,
                loc_fertilizer 
        })
    }
    
    return (
    <div className="NewLocation">
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} xs={7} controlId="Name">
                    <Form.Label>Customer ID</Form.Label>
                    <Form.Control 
                        value={id}
                        plaintext readOnly
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row> </Form.Row>
            <Form.Group controlId="content">
                <Form.Label>Address Line 1:</Form.Label>
                <Form.Control 
                    value={loc_address_1} 
                    placeholder="123 Main Street" 
                    onChange={(e) => setLoc_address_1(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>Location Address Line 2:</Form.Label>
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
                        onChange={(e) => setLoc_city(e.target.value)}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="State">
                    <Form.Label>State</Form.Label>
                    <Form.Control 
                        as="select" 
                        defaultValue="MD" 
                        value={loc_state} 
                        onChange={(e) => setLoc_state(e.target.value)}
                    >
                        <option>MD</option>
                    </Form.Control>
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
                        onChange={(e) => setGrass(e.target.value)}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="MulchJob">
                    <Form.Label>Mulch Job</Form.Label>
                    <Form.Control 
                        value={loc_mulch} 
                        onChange={(e) => setMulch(e.target.value)}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="FallCleanup">
                    <Form.Label>Fall Cleanup</Form.Label>
                    <Form.Control 
                        value={loc_fallCleanup} 
                        onChange={(e) => setFallCleanup(e.target.value)}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="Fertilizer">
                    <Form.Label>Fertilizer</Form.Label>
                    <Form.Control 
                        value={loc_fertilizer} 
                        onChange={(e) => setFertilizer(e.target.value)}
                    />
                </Form.Group>
            </Form.Row>
            <LoaderButton
                block
                type="submit"
                size="lg"
                variant="primary"
                isLoading={isLoading}
                disabled={!validateForm()}
            >
            Create Location
            </LoaderButton>
        </Form>
    </div>
  );
}