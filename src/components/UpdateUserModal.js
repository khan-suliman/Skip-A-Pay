import handleDeleteApiLoan from "api/user/deleteLoan";
import { toast } from "react-toastify";
import Input from "./Form/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import updateAdmin from "api/admin/updateAdmin";
import { updateUser } from "features/auth/authSlice";

const { Modal, Button, Form, Row, Col } = require("react-bootstrap");

const UpdateUserModal = ({ show, handleClose }) => {
  // get user from readux store
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log(user);

  // a schema for form or form validations
  const schema = yup.object().shape({
    name: yup.string().required("Field Required"),
    email: yup.string().email("Invalid Email").required("Field Required")
  });
  const formik = useFormik({
    validationSchema: schema,
    initialValues: user,
    onSubmit: async (values) => {
      console.log('values', values);
      const response = await updateAdmin(values);
      if (response.status === 201 || response.status === 200) {
        dispatch(updateUser({ name: response.data.name, email: response.data.email }));
        toast.success('Updated');
      } else {
        toast.error('Updated', response.message);
      }
    },
  });

  const { errors, touched, handleSubmit, handleChange, values } = formik;
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            className="py-3"
          >
            <Row>
              <Col md={12}>
                <Input
                  label="Full Name"
                  required
                  controlId="controlId-name"
                  name="name"
                  type="text"
                  value={values.name}
                  placeholder="Full Name"
                  handleChange={handleChange}
                  touched={touched.name && !errors.name}
                  error={errors.name}
                />
              </Col>
              <Col md={12}>
                <Input
                  label="Email"
                  required
                  controlId="controlId-email"
                  name="email"
                  type="text"
                  value={values.email}
                  placeholder="info@gmail.com"
                  handleChange={handleChange}
                  touched={touched.email && !errors.email}
                  error={errors.email}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Update User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UpdateUserModal;
