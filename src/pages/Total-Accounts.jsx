import Card from "components/Card";
import React, { useEffect, useMemo, useState } from "react";
import ReactTable from "components/Table";
import { Spinner } from "react-bootstrap";
import { getLoans } from "api/admin/loans";

const TotalAccounts = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getLoansDetails = async () => {
    let applications = await getLoans();
    setUsers(applications.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getLoansDetails();
  }, []);
  const data = useMemo(() => users, [users]);

  const columns = useMemo(
    () => [
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
    <Card title="Total Accounts">
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
    </Card>
  );
};

export default TotalAccounts;
