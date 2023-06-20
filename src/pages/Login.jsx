import React from "react";
import { useFormik } from 'formik';
import { redirect } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { Alert, Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import Card from "components/Card";
import Input from "components/Form/Input";
import { Link } from "react-router-dom";
import Checkbox from "components/Form/Checkbox";
import { toast } from "react-toastify";
const Login = () => {
    // const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: 'sulimansayed003@gmial.com',
            password: ''
        },
        onSubmit: ({ email, password }) => {
            if (email.trim() === 'abc123@gmail.com' && password === 'admin') {
                console.log('true')
                return redirect("/setting");
            } else {
                toast.error("Invalid Credentials");
            }
        }
    });
    return (
        <Container>
            <ToastContainer />
            <Row className="min-vh-100 align-items-center justify-content-center my-auto">
                <Col md={5}>
                    <Form onSubmit={formik.handleSubmit}>
                        <Card title='Login'>
                            <div className="mt-5">
                                {/* Email */}
                                <Input label='Email' name='email' type='email' placeholder='info@test.com' handleChange={formik.handleChange} />
                            </div>
                            <Input label='Password' name='password' type='password' placeholder='********' handleChange={formik.handleChange} />
                            <Stack className="mb-3" direction="horizontal">
                                <Checkbox type={'checkbox'} id={`keep-sign`} label={`Keep me sign in`} name={"keepSign"} />
                                <Link to="#" className="primary-link ms-auto fs-14">Forgot Password?</Link>
                            </Stack>
                            <Stack className="mt-5">
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