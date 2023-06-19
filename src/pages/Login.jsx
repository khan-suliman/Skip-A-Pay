import React from "react";
import { useFormik } from 'formik';
import { Col, Container, Form, Row } from "react-bootstrap";
import Card from "components/Card";
import Input from "components/Input";
import { Link } from "react-router-dom";
const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: 'sulimansayed003@gmial.com',
        },
        onSubmit: (values) => {
            console.log('values', values);
        }
    });
    console.log(formik.values.email)
    return (
        <Container>
            <Row className="min-vh-100 align-items-center justify-content-center my-auto">
                <Col md={5}>
                    <Form onSubmit={formik.handleSubmit}>
                        <Card title='Login'>
                            <Input label='Email' name='email' type='email' placeholder='info@test.com' />
                            <Input label='Password' name='password' type='password' placeholder='********' />
                        </Card>
                    </Form >
                </Col>
            </Row>
        </Container>
    );
}
export default Login;