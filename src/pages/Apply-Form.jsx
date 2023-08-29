import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import Card from "components/Card";
import Input from "components/Form/Input";
import * as yup from "yup";
import CustomModal from "components/Modal";
import formSubmission from "api/user/formSubmission";
const ApplyForm = ({ website }) => {
  const [modalShow, setModalShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [userDetails, setUserDetails] = useState({ website });
  const toastId = useRef(null);
  // form ref
  const formRef = useRef(null);

  // a schema for form or form validations
  const schema = yup.object().shape({
    firstName: yup.string().required("Field Required"),
    lastName: yup.string().required("Field Required"),
    phoneNumber: yup.number("Please enter integer").required("Field Required"),
    accountNumber: yup
      .number("Please enter integer")
      .required("Field Required"),
    ssnNumber: yup
      .string()
      .matches(/^\d{3,4}$/, "Enter a valid 3 or 4-digit number")
      .required("Field Required"),
    email: yup.string().email("Invalid Email").required("Field Required"),
    cEmail: yup
      .string()
      .email("Invalid Email")
      .oneOf([yup.ref("email"), null], "Email doesn't match")
      .required("Field Required"),
  });
  const formik = useFormik({
    validationSchema: schema,
    initialValues: userDetails,
    onSubmit: async (values) => {
      setValidated(true);
      toastId.current = toast.loading("Getting loan details...", {
        autoClose: false,
        closeOnClick: false,
      });
      const response = await formSubmission(values);
      if (response.status === 201 || response.status === 200) {
        toast.dismiss(toastId.current);
        setUserDetails({
          ...values,
          loantype: response.data,
        });
        setModalShow(true);
      } else {
        toast.update(toastId.current, {
          render:
            "Please verify your account number or last 4 of your SSN are correct. For assistance, please reach out via Live Chat during business hours.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
          closeOnClick: true,
        });
      }
    },
  });
  const { errors, touched, handleSubmit, handleChange, values } = formik;
  return (
    <Container>
      {/* <ToastContainer /> */}
      <Row className="min-vh-100 align-items-center justify-content-center my-auto">
        <Col md={10} xxl={8}>
          <Form
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            validated={validated}
            className="py-3"
          >
            <Card title="Skip A Pay Application Form">
              <Row className="mt-5">
                <Col md={6}>
                  <Input
                    label="First Name"
                    required
                    controlId="controlId-firstName"
                    name="firstName"
                    type="text"
                    placeholder="Mr."
                    handleChange={handleChange}
                    touched={touched.firstName && !errors.firstName}
                    error={errors.firstName}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Middle Name"
                    name="middleName"
                    controlId="controlId-middleName"
                    type="text"
                    placeholder="Middle Name"
                    handleChange={handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <Input
                    label="Last Name"
                    required
                    controlId="controlId-lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    handleChange={handleChange}
                    touched={touched.lastName && !errors.lastName}
                    error={errors.lastName}
                  />
                </Col>
                <Col xs={12}>
                  <Input
                    label="Phone Number"
                    required
                    name="phoneNumber"
                    controlId="controlId-phoneNumber"
                    type="number"
                    placeholder="Phone Number"
                    handleChange={handleChange}
                    touched={touched.phoneNumber && !errors.phoneNumber}
                    error={errors.phoneNumber}
                  />
                </Col>
                <Col md={8}>
                  <Input
                    label="Account Number"
                    required
                    name="accountNumber"
                    controlId="controlId-accountNumber"
                    type="number"
                    placeholder="Account Number"
                    handleChange={handleChange}
                    touched={touched.accountNumber && !errors.accountNumber}
                    error={errors.accountNumber}
                  />
                </Col>
                <Col md={4}>
                  <Input
                    label="Last 4 digits of SSN"
                    required
                    controlId="controlId-ssnNumber"
                    name="ssnNumber"
                    type="number"
                    placeholder="SSN"
                    handleChange={handleChange}
                    touched={touched.ssnNumber && !errors.ssnNumber}
                    error={errors.ssnNumber}
                  />
                </Col>
                <Col xs={12}>
                  <Input
                    label="Email"
                    required
                    controlId="controlId-email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    handleChange={handleChange}
                    touched={touched.email && !errors.email}
                    error={errors.email}
                  />
                </Col>
                <Col xs={12}>
                  <Input
                    label="Confirm Email"
                    required
                    controlId="controlId-cEmail"
                    name="cEmail"
                    type="email"
                    placeholder="Confirm Email"
                    handleChange={handleChange}
                    touched={touched.cEmail && !errors.cEmail}
                    error={errors.cEmail}
                  />
                </Col>
                <Col xs={8} className="mt-4">
                  <Stack>
                    <Button as="input" type="submit" value="Get Loan Details" />
                  </Stack>
                  {/* <Stack direction="horizontal">
                                    </Stack> */}
                  {/* <Button as="input" type="reset" value="Reset" /> */}
                </Col>
                <Col xs={4} className="mt-4">
                  <Stack>
                    {/* <Button as="input" type="submit" value="Get Loan Details" /> */}
                    <Button
                      as="input"
                      type="reset"
                      // onClick={handleReset}
                      value="Reset"
                      variant="danger"
                    />
                  </Stack>
                </Col>
              </Row>
            </Card>
          </Form>
        </Col>
      </Row>
      {/* Form submitted model */}
      {modalShow && (
        <CustomModal
          userdetails={userDetails}
          show={modalShow}
          title={"Loan Details"}
          onHide={() => setModalShow(false)}
        />
      )}
    </Container>
  );
};
export default ApplyForm;
