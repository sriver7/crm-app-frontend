import React, {useState } from "react";
import Form from "react-bootstrap/Form";
import {useParams, useHistory} from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import {onError} from "../libs/errorLib";
import "./NewCustomer.css";
import {Col} from "react-bootstrap";
import {API} from "aws-amplify";

export default function NewLocation() {
    const history = useHistory();
     const{id} = useParams();

    const [invoice_amount, setInvoice_amount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    function validateForm() {
        return invoice_amount.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await createInvoice({customerId: id, invoice_amount: invoice_amount});
            history.push(`/customer/${id}`);
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function createInvoice(customerId, invoice_amount) {
        return API.post("rml-crm-app", "/invoices", {
            body: 
                customerId,
                invoice_amount
        })
    }
    
    return (
    <div className="NewInvoice">
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
                <Form.Label>Invoice Amount</Form.Label>
                <Form.Control 
                    value={invoice_amount} 
                    placeholder="0.00" 
                    pattern = "^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$"
                    onChange={(e) => setInvoice_amount(e.target.value)}
                />
            </Form.Group>
            <LoaderButton
                block
                type="submit"
                size="lg"
                variant="primary"
                isLoading={isLoading}
                disabled={!validateForm()}
            >
            Create Invoice
            </LoaderButton>
        </Form>
    </div>
  );
}