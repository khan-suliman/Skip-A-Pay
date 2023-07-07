import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import Card from "components/Card";
import Input from "components/Form/Input";
import Checkbox from "components/Form/Checkbox";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastId = useRef(null);

  const { user, message, isLoading, isError, isSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
          closeOnClick: true,
        });
      } else {
        toast.error(message);
      }
    }
    if (isSuccess || user) {
      if (toastId.current && isSuccess) {
        toast.update(toastId.current, {
          render: "Login successful",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
          closeOnClick: true,
        });
      } else if (isSuccess) {
        toast.success("Login successful");
      }
      navigate("/");
    }

    dispatch(reset());
  }, [user, navigate, isLoading, isSuccess, isError, dispatch, message]);

  // const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "sulimansayed003@gmial.com",
      password: "",
    },
    onSubmit: async (values) => {
      toastId.current = toast.loading("Logging in...", {
        autoClose: false,
        closeOnClick: false,
      });
      dispatch(login(values));
    },
  });
  return (
    <Container>
      {/* <ToastContainer /> */}
      <Row className="min-vh-100 align-items-center justify-content-center my-auto">
        <Col md={5}>
          <Form onSubmit={formik.handleSubmit}>
            <Card title="Login">
              <div className="mt-5">
                {/* Email */}
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="info@test.com"
                  handleChange={formik.handleChange}
                />
              </div>
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                handleChange={formik.handleChange}
              />
              <Stack className="mb-3" direction="horizontal">
                <Checkbox
                  type={"checkbox"}
                  id={`keep-sign`}
                  label={`Keep me sign in`}
                  name={"keepSign"}
                  className="user-select-none"
                />
                {/* <Link to="#" className="primary-link ms-auto fs-14">
                  Forgot Password?
                </Link> */}
              </Stack>
              <Stack className="mt-5">
                <Button as="input" type="submit" value="Submit" />
              </Stack>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
