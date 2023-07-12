import Card from "components/Card";
import React, { useEffect, useMemo, useState } from "react";
import ReactTable from "components/Table";
import { Button, Spinner } from "react-bootstrap";
import { loans } from "features/admin/loans";
import Checkbox from "components/Form/Checkbox";
import CustomPaginations from "components/Pagination";

const TotalAccounts = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getLoans = async () => {
    let applications = await loans();
    setUsers(applications.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getLoans();
  }, []);
  const data = useMemo(() => users, [users]);
  console.log('data', data);
  const columns = useMemo(
    () => [
      {
        Header: "Action", accessor: '_id', Cell: ({ value }) => {
          return <Checkbox
            type={"checkbox"}
            name={"deleted"}
            id={value}
            value={value}
            className="text-center"
          />;
        }
      },
      { Header: "Loan ID", accessor: "loan_id" },
      { Header: "Name", accessor: "name" },
      { Header: "Account Number", accessor: "account_n" },
      { Header: "Loan Type", accessor: "loan_type" },
      { Header: "Description", accessor: "Description" },
      { Header: "SSN Number", accessor: "last_ssn_digits" },
      { Header: "Uploaded By", accessor: "owner.name" },
    ],
    []
  );
  return (
    <>
      <Card title="Total Accounts" actionElement={<Button variant="outline-danger">Delete</Button>}>
        <div className="py-3">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              {data.length > 0 && <ReactTable data={data} columns={columns} />}
              {data.length === 0 && <p>No form has been submitted yet.</p>}
            </>
          )}
        </div>
        {/* {pagination} */}
        <CustomPaginations current={1} />
      </Card>
    </>
  );
};

export default TotalAccounts;
