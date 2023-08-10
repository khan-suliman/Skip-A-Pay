// import { toast } from "react-toastify";
import Input from "./Form/Input";
import { useFormik } from "formik";
import * as yup from "yup";

const { Modal, Button, Form, Row, Col } = require("react-bootstrap");

const ChangePasswordModal = ({ show, handleClose }) => {
  // handling change password
  // const handleChangePassword = () => {
  //   if (true) {
  //     toast.success("change password successfully.");
  //     handleClose();
  //   } else {
  //     toast.error("Old password is not correct");
  //   }
  // };

  // a schema for form or form validations
  const schema = yup.object().shape({
    oldPassword: yup.string().required("Field Required"),
    password: yup.string().required("Field Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Email doesn't match")
      .required("Field Required"),
  });
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {},
    onSubmit: async (values) => {
      console.log("values", values);
      // const response = await formSubmission(values);
      // if (response.status === 201 || response.status === 200) {
      // } else {
      // }
    },
  });

  const { errors, touched, handleSubmit, handleChange } = formik;
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate className="py-3">
            <Row>
              <Col md={12}>
                <Input
                  label="Old Password"
                  required
                  controlId="controlId-oldPassword"
                  name="oldPassword"
                  type="text"
                  placeholder="********"
                  handleChange={handleChange}
                  touched={touched.oldPassword && !errors.oldPassword}
                  error={errors.oldPassword}
                />
              </Col>
              <Col md={12}>
                <Input
                  label="New Password"
                  required
                  controlId="controlId-newPassword"
                  name="password"
                  type="text"
                  placeholder="********"
                  handleChange={handleChange}
                  touched={touched.password && !errors.password}
                  error={errors.password}
                />
              </Col>
              <Col md={12}>
                <Input
                  label="New Confirm Password"
                  required
                  controlId="controlId-newPassword-confirm"
                  name="confirmPassword"
                  type="text"
                  placeholder="********"
                  handleChange={handleChange}
                  touched={touched.confirmPassword && !errors.confirmPassword}
                  error={errors.confirmPassword}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ChangePasswordModal;
