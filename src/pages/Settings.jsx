import React from "react";
import Card from "components/Card";
import FileUpload from "components/FileUpload";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const Settings = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    toast.success("From submitted successfully.");
    setSubmitting(false);
  };
  return (
    <Card title="Settings" backgroundColor="var(--magnolia)">
      <div className="py-3">
        <Formik initialValues={{ file: "" }} onSubmit={handleSubmit}>
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <FileUpload name="file" setFieldValue={setFieldValue} />
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Upload
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Card>
  );
};

export default Settings;
