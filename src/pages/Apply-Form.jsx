import React, { useState } from "react";
import { useFormik } from 'formik';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import Card from "components/Card";
import Input from "components/Form/Input";
import * as yup from 'yup';
const ApplyForm = () => {
    const [validated, setValidated] = useState(false);
    // const navigate = useNavigate();
    const schema = yup.object().shape({
        fname: yup.string().required()
    });
    const formik = useFormik({
        validationSchema: schema,
        initialValues: {
            email: 'sulimansayed003@gmial.com',
            password: ''
        },
        onSubmit: ({ email, password }) => {
            setValidated(false);
        }
    });
    console.log(formik.touched)
    return (
        <Container>
            <ToastContainer />
            <Row className="min-vh-100 align-items-center justify-content-center my-auto">
                <Col md={10} lg={8} xl={6}>
                    <Form noValidate onSubmit={formik.handleSubmit} validated={validated}>
                        <Card title='Application Form'>
                            <Row className="mt-5">
                                <Col md={6}>
                                    <Input label='First Name*' controlId='controlId-1' name='fname' type='text' placeholder='Mr.' handleChange={formik.handleChange} error={formik.errors.fname} />
                                </Col>
                                <Col md={6}>
                                    <Input label='Middle Name' name='mname' type='text' placeholder='Middle Name' handleChange={formik.handleChange} />
                                </Col>
                                <Col md={6}>
                                    <Input label='Last Name*' name='lname' type='text' placeholder='Last Name' handleChange={formik.handleChange} />
                                </Col>
                                <Col md={6}>
                                    <Input label='Phone Number*' name='pnumber' type='number' placeholder='Phone Number' handleChange={formik.handleChange} />
                                </Col>
                                <Col md={6}>
                                    <Input label='Last 4 digits of SSN*' name='mname' type='number' placeholder='SSN' handleChange={formik.handleChange} />
                                </Col>
                                <Col md={6}>
                                    <Input label='Account Number*' name='mname' type='number' placeholder='Account Number' handleChange={formik.handleChange} />
                                </Col>
                                <Col md={6}>
                                    <Input label='Email*' name='mname' type='email' placeholder='Email' handleChange={formik.handleChange} />
                                </Col>
                                <Col md={6}>
                                    <Input label='Confirm Email*' name='mname' type='email' placeholder='Confirm Email' handleChange={formik.handleChange} />
                                </Col>
                                <Col md={8} className="mt-4">
                                    <Stack>
                                        <Button as="input" type="submit" value="Get Loan Details" />
                                    </Stack>
                                    {/* <Stack direction="horizontal">
                                    </Stack> */}
                                    {/* <Button as="input" type="reset" value="Reset" /> */}
                                </Col>
                                <Col md={4} className="mt-4">
                                    <Stack>
                                        {/* <Button as="input" type="submit" value="Get Loan Details" /> */}
                                        <Button as="input" type="reset" value="Reset" variant="danger" />
                                    </Stack>
                                </Col>
                            </Row>
                        </Card>
                    </Form >
                </Col>
            </Row>
        </Container >
    );
}
export default ApplyForm;