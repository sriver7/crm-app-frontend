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

    const [payment_amount, setPayment_amount] = useState("");
    const [payment_check_num, setPayment_check_num] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    function validateForm() {
        return payment_amount.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await createPayment({customerId: id, payment_amount: payment_amount, payment_check_num: payment_check_num});
            history.push(`/customer/${id}`);
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function createPayment(customerId, payment_amount, payment_check_num) {
        return API.post("rml-crm-app", "/payments", {
            body: 
                customerId,
                payment_amount,
                payment_check_num
        })
    }
    
    return (
    <div className="NewPayment">
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
                <Form.Label>Payment Amount</Form.Label>
                <Form.Control 
                    required
                    value={payment_amount} 
                    placeholder="0.00" 
                    pattern = "^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$"
                    onChange={(e) => setPayment_amount(e.target.value)}
                />
                <Form.Text>Required</Form.Text>
            </Form.Group>
            <Form.Group controlId="check_num">
                <Form.Label>Check Num:</Form.Label>
                <Form.Control 
                    value={payment_check_num} 
                    onChange={(e) => setPayment_check_num(e.target.value)}
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
            Add Payment
            </LoaderButton>
        </Form>
    </div>
  );
}