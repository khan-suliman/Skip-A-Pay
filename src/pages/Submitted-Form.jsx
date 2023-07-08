import Card from "components/Card";
import React, { useEffect, useMemo, useState } from "react";
import ReactTable from "components/Table";
import submittedApplications from "features/admin/users";
import { Form, Spinner } from "react-bootstrap";

const SubmittedForm = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");

  const getAllUsers = async (params = {}) => {
    let applications = await submittedApplications(params);
    setUsers(applications.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleFilter = (e) => {
    setFilterDate(e.target.value);
    setIsLoading(true);
    getAllUsers(e.target.value && { date: e.target.value });
  };

  const data = useMemo(() => users, [users]);

  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Middle Name", accessor: "middleName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Email", accessor: "email" },
      { Header: "Account Number", accessor: "accountNumber" },
      { Header: "SSN Number", accessor: "ssnNumber" },
      { Header: "Phone Number", accessor: "phoneNumber" },
    ],
    []
  );
  return (
    <Card title="Submitted Form" backgroundColor={"var(--isabelline)"}>
      <div className="py-3">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <Form.Select
              aria-label="Default select example"
              className="w-auto mb-2"
              onChange={handleFilter}
              value={filterDate}
            >
              <option value="">Filter by date</option>
              <option value="7">Last 7 Days</option>
              <option value="14">Last 14 Days</option>
              <option value="30">Last 30 Days</option>
            </Form.Select>
            {data.length > 0 && <ReactTable data={data} columns={columns} />}
            {data.length === 0 && <p>No form has been submitted yet.</p>}
          </>
        )}
      </div>
    </Card>
  );
};

export default SubmittedForm;
