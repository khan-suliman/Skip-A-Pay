import Card from "components/Card";
import React, { useEffect, useMemo, useState } from "react";
import ReactTable from "components/Table";
import { Button, Spinner, Stack } from "react-bootstrap";
import CustomPagination from "components/Pagination";
import DeleteModal from "components/DeleteModal";
import { getLoans } from "api/admin/loans";
import useQuery from "hooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { setAccountsCount } from "features/auth/authSlice";
import { TrashIcon } from "@heroicons/react/24/outline";
import Input from "components/Form/Input";
import { useNavigate } from "react-router-dom";

const TotalAccounts = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const dispatch = useDispatch();
  const pageCount = Math.ceil(
    useSelector((state) => state.auth.accountsCount) / 10
  );

  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  let skip = query.get("skip") ?? 1;

  const getLoansDetails = async (skip) => {
    let applications = await getLoans({ skip, limit: 10 });
    dispatch(setAccountsCount(applications.data.count));
    setAccounts(applications.data.loans);
    setIsLoading(false);
  };
  // Delete model data
  const [show, setShow] = useState(false);
  const [deleteId, setdeleteId] = useState("");

  const handleClose = () => {
    // setdeleteId(value );
    setShow(false);
  };
  const handleShow = (event) => {
    setdeleteId(event.currentTarget.value);
    setShow(true);
  };
  // for input page number handleChange
  const handleChangePageNumber = (event) => {
    if (event.target.value < pageCount) {
      // this value is active page come from input and it will send to url to get an api
      setTimeout(function () {
        navigate(`?skip=${event.target.value}`, { replace: true });
      }, 1000);
    }
  };
  useEffect(() => {
    getLoansDetails(skip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);
  const data = useMemo(() => accounts, [accounts]);
  // const pageCount = useMemo(() => Math.ceil(accounts / 10), [data]);
  const columns = useMemo(
    () => [
      { Header: "Loan ID", accessor: "loan_id" },
      { Header: "Name", accessor: "name" },
      { Header: "Account Number", accessor: "account_number" },
      { Header: "Loan Type", accessor: "loan_type" },
      { Header: "Description", accessor: "Description" },
      { Header: "SSN Number", accessor: "last_ssn_digits" },
      { Header: "Uploaded By", accessor: "owner.name" },
      {
        Header: "Action",
        accessor: "_id",
        Cell: ({ value }) => {
          return (
            <Button
              onClick={handleShow}
              className="deletebtn"
              variant="danger"
              value={value}
            >
              <TrashIcon />
            </Button>
          );
        },
      },
    ],
    []
  );
  return (
    <>
      <Card
        title="Total Accounts"
        actionElement={
          !isLoading &&
          pageCount > 0 && (
            <Button variant="outline-danger" onClick={handleShow}>
              Delete All
            </Button>
          )
        }
      >
        {/* <Card title="Total Accounts"> */}
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
                  {pageCount > 10 && (
                    <>
                      <Stack direction="horizontal">
                        {/* pagecount come from api where it will all pages */}
                        <CustomPagination
                          count={pageCount}
                          className={"mt-3"}
                        />
                        <Stack direction="horizontal">
                          <span>Go to</span>
                          <Input
                            max={pageCount}
                            min={1}
                            type="number"
                            handleChange={handleChangePageNumber}
                            name="skip"
                            placeholder="page"
                            className="mb-0 custom-pagination"
                          />
                        </Stack>
                      </Stack>
                    </>
                  )}
                </>
              )}
              {data.length === 0 && <p>No accounts founds.</p>}
            </>
          )}
        </div>
        <DeleteModal
          getLoansDetails={getLoansDetails}
          skip={skip}
          id={deleteId}
          show={show}
          handleClose={handleClose}
        />
      </Card>
    </>
  );
};

export default TotalAccounts;
