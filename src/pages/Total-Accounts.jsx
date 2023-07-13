import Card from "components/Card";
import React, { useEffect, useMemo, useState } from "react";
import ReactTable from "components/Table";
import { Button, Spinner } from "react-bootstrap";
import Checkbox from "components/Form/Checkbox";
import CustomPagination from "components/Pagination";
import { getLoans } from "api/admin/loans";
import useQuery from "hooks/useQuery";
import { useDispatch } from "react-redux";
import { setAccountsCount } from "features/auth/authSlice";

const TotalAccounts = () => {
  const query = useQuery();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  let skip = query.get("skip") ?? 1;

  const getLoansDetails = async (skip) => {
    let applications = await getLoans({ skip, limit: 10 });
    dispatch(setAccountsCount(applications.data.count));
    setAccounts(applications.data.loans);
    setIsLoading(false);
  };
  useEffect(() => {
    getLoansDetails(skip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);
  const data = useMemo(() => accounts, [accounts]);
  const pageCount = Math.ceil(data.length / 10);
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
      { Header: "Account Number", accessor: "account_number" },
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
              {data.length > 0 && (
                <>
                  <ReactTable data={data} columns={columns} />
                  <CustomPagination count={pageCount} />
                </>
              )}
              {data.length === 0 && <p>No form has been submitted yet.</p>}
            </>
          )}
        </div>
      </Card>
    </>
  );
};

export default TotalAccounts;
