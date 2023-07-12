import Card from "components/Card";
import React, { useEffect, useMemo, useState } from "react";
import ReactTable from "components/Table";
import { Button, Spinner } from "react-bootstrap";
import Checkbox from "components/Form/Checkbox";
import CustomPaginations from "components/Pagination";
import { getLoans } from "api/admin/loans";
import useQuery from "hooks/useQuery";

const TotalAccounts = () => {
  const query = useQuery();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let skip = query.get("skip") ?? 1;
  const getLoansDetails = async (skip) => {
    let applications = await getLoans({ skip, limit: 10 });
    setUsers(applications.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getLoansDetails(skip);
  }, [skip]);
  const data = useMemo(() => users, [users]);
  const pageCount = useMemo(() => Math.ceil(data.count / 10), [data]);
  const columns = useMemo(
    () => [
      // checkbox
      // {
      //   Header: "Action", accessor: '_id', Cell: ({ value }) => {
      //     return <Checkbox
      //       type={"checkbox"}
      //       name={"deleted"}
      //       id={value}
      //       value={value}
      //       className="text-center"
      //     />;
      //   }
      // },
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
      {/* <Card title="Total Accounts" actionElement={<Button variant="outline-danger">Delete</Button>}> */}
      <Card title="Total Accounts">
        <div className="py-3">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              {data.count > 0 && <ReactTable data={data.loans} columns={columns} />}
              {data.count === 0 && <p>No form has been submitted yet.</p>}
            </>
          )}
        </div>
        {/* {pagination} */}
        <CustomPaginations count={pageCount} />
      </Card>
    </>
  );
};

export default TotalAccounts;
