import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {API} from "aws-amplify";
import {onError} from "../libs/errorLib";
import {Form} from "react-bootstrap";
import "./NewCustomer.css";
import LoaderButton from "../components/LoaderButton";
import {Col} from "react-bootstrap";

export default function Location(){
    const{id} = useParams();

    const history = useHistory();
    const [locations, setLocation] = useState(null);
    const [customerId, setCustomerId] = useState("");
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
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        function loadLocation() {
            return API.get("rml-crm-app", `/locations/${id}`);
        }

        async function onLoad(){
            try {
                const location = await loadLocation();
                const {
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
                } = location;

                setCustomerId(customerId);
                setLoc_address_1(loc_address_1);
                setLoc_address_2(loc_address_2);
                setLoc_City(loc_city);
                setLoc_State(loc_state);
                setLoc_zip(loc_zip);
                setLoc_grass(loc_grass);
                setLoc_mulch(loc_mulch);
                setLoc_fall_cleanup(loc_fallCleanup);
                setLoc_fertilizer(loc_fertilizer);
                setLocation(location);

            } catch (e){
                onError(e);
            }
        }

        onLoad();
    }, [id]);



    function validateForm(){
        return loc_address_1.length>0;
    }

    function saveLocation(location){
        return API.put("rml-crm-app", `/locations/${id}`, {
            body: location
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        
        try {
            
            await saveLocation({
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
            });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function deleteLocation() {
        return API.del("rml-crm-app", `/locations/${id}`);
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this location? This action is not reversable."
        );

        if(!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            await deleteLocation();
            history.push("/");
        } catch (e) {
            onError(e);
            setIsDeleting(false);
        }
    }


    return (
        <div className="Location">
            {locations && (
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} xs={7} controlId="CustomerId">
                            <Form.Label>Customer ID</Form.Label>
                            <Form.Control
                                value={customerId}
                                readOnly
                                onChange={(e) => setCustomerId(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="Address1">
                        <Form.Label>Address Line 1:</Form.Label>
                        <Form.Control 
                            value={loc_address_1} 
                            placeholder="123 Main Street" 
                            onChange={(e) => setLoc_address_1(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Address2">
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
                                onChange={(e) => setLoc_City(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="State">
                            <Form.Label>State</Form.Label>
                            <Form.Control 
                                value="MD"
                                plaintext readOnly
                            >
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
        </div>
    );
}