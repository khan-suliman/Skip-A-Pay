import React, { useState } from "react";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import Card from "components/Card";
import Input from "components/Form/Input";
import * as yup from "yup";
const ApplyForm = () => {
    const [validated, setValidated] = useState(false);
    // const navigate = useNavigate();
    const schema = yup.object().shape({
        fName: yup.string().required(),
        lName: yup.string().required(),
        pNumber: yup.string().required(),
        accNum: yup.string().required(),
        ssn: yup.string().required(),
        email: yup.string().email('Invalid Email').required('Required'),
        cEmail: yup.string().email('Invalid Email').oneOf([yup.ref('email'), null], 'Email doesn\'t match').required('Required')
    });
    const formik = useFormik({
        validationSchema: schema,
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            setValidated(false);
            console.log('submitted Values', values);
        }
    });
    const { errors, touched, handleSubmit, handleChange } = formik;
    return (
        <Container>
            <ToastContainer />
            <Row className="min-vh-100 align-items-center justify-content-center my-auto">
                <Col md={10} lg={8} xl={7} xxl={6}>
                    <Form noValidate onSubmit={handleSubmit} validated={validated}>
                        <Card title='Application Form'>
                            <Row className="mt-5">
                                <Col md={6}>
                                    <Input label='First Name' required controlId='controlId-fName' name='fName' type='text' placeholder='Mr.'
                                        handleChange={handleChange} touched={touched.fName && !errors.fName} error={errors.fName} />
                                </Col>
                                <Col md={6}>
                                    <Input label='Middle Name' name='mName' type='text' placeholder='Middle Name' handleChange={handleChange} />
                                </Col>
                                <Col md={6}>
                                    <Input label='Last Name' required controlId='controlId-lName' name='lName' type='text' placeholder='Last Name'
                                        handleChange={handleChange} touched={touched.lName && !errors.lName} error={errors.lName} />
                                </Col>
                                <Col md={6}>
                                    <Input label='Phone Number' required name='pNumber' controlId='controlId-pNumber' type='number' placeholder='Phone Number'
                                        handleChange={handleChange} touched={touched.pNumber && !errors.pNumber} error={errors.pNumber} />
                                </Col>
                                <Col md={8}>
                                    <Input label='Account Number' required name='accNum' controlId='controlId-accNum' type='number' placeholder='Account Number'
                                        handleChange={handleChange} touched={touched.accNum && !errors.accNum} error={errors.accNum} />
                                </Col>
                                <Col md={4}>
                                    <Input label='Last 4 digits of SSN' required controlId='controlId-ssn' name='ssn' type='number' placeholder='SSN'
                                        handleChange={handleChange} touched={touched.ssn && !errors.ssn} error={errors.ssn} />
                                </Col>
                                <Col md={6}>
                                    <Input label='Email' required controlId='controlId-email' name='email' type='email' placeholder='Email'
                                        handleChange={handleChange} touched={touched.email && !errors.email} error={errors.email} />
                                </Col>
                                <Col md={6}>
                                    <Input label='Confirm Email' required controlId='controlId-cEmail' name='cEmail' type='email' placeholder='Confirm Email'
                                        handleChange={handleChange} touched={touched.cEmail && !errors.cEmail} error={errors.cEmail} />
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
};
export default ApplyForm;
