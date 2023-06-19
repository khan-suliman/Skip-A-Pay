import React from "react";
import { useFormik } from 'formik';
import { Alert, Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import Card from "components/Card";
import Input from "components/Form/Input";
import { Link } from "react-router-dom";
import Checkbox from "components/Form/Checkbox";
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
                            {/* Email */}
                            <Input label='Email' name='email' type='email' placeholder='info@test.com' />
                            <Input label='Password' name='password' type='password' placeholder='********' />
                            <Stack className="mb-3" direction="horizontal">
                                <Checkbox type={'checkbox'} id={`keep-sign`} label={`Keep me sign in`} name={"keepSign"} />
                                <Link to="/settings" className="primary-link ms-auto fs-14">Forgot Password?</Link>
                            </Stack>
                            <Stack>
                                <Button as="input" type="submit" value="Submit" />
                            </Stack>
                        </Card>
                    </Form >
                </Col>
            </Row>
        </Container >
    );
}
export default Login;