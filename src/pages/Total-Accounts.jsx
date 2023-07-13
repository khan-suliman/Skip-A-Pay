import Card from "components/Card";
import React, { useEffect, useMemo, useState } from "react";
import ReactTable from "components/Table";
import { Button, Modal, Spinner } from "react-bootstrap";
import Checkbox from "components/Form/Checkbox";
import CustomPagination from "components/Pagination";
import { getLoans } from "api/admin/loans";
import useQuery from "hooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { setAccounts } from "features/auth/authSlice";
import { TrashIcon } from "@heroicons/react/24/outline";

const TotalAccounts = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.auth.accounts);

  const [isLoading, setIsLoading] = useState(!Array.isArray(accounts?.loans));
  let skip = query.get("skip") ?? 1;

  const getLoansDetails = async (skip) => {
    let applications = await getLoans({ skip, limit: 10 });
    dispatch(setAccounts(applications.data));
    setIsLoading(false);
  };
  // handling checkbox
  const [selectedItems, setSelectedItems] = useState([]);
  const [checkSelectedData, setcheckSelectedData] = useState(true);
  const handleCheckBox = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedItems(selectedItems.push(value)); // Add the value to the array
    } else {
      let index = selectedItems.indexOf(value);

      if (index > -1) {
        setSelectedItems(selectedItems.splice(index, 1)); // Remove the value from the array
      }
    }
    if (selectedItems.length) {
      setcheckSelectedData(false);
    } else {
      setcheckSelectedData(true);
    }
  };
  // Delete model data
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // handle delete btn
  const handleDelete = () => {
    console.log("delte workd")
  }
  useEffect(() => {
    getLoansDetails(skip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);
  const data = useMemo(() => accounts, [accounts]);
  const pageCount = useMemo(() => Math.ceil(data?.count / 10), [data]);
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
        Header: "Action", accessor: '_id', Cell: ({ value }) => {
          return <Button onClick={handleDelete} className="deletebtn" variant="danger"><TrashIcon /></Button>;
        }
      },
    ],
    []
  );
  return (
    <>
      <Card title="Total Accounts" actionElement={<Button variant="outline-danger">Delete</Button>}>
        {/* <Card title="Total Accounts"> */}
        <div className="py-3">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              {data?.count > 0 && (
                <>
                  <ReactTable data={data?.loans} columns={columns} />
                  <CustomPagination className='mt-3' count={pageCount} />
                </>
              )}
              {data?.count === 0 && <p>No form has been submitted yet.</p>}
            </>
          )}
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure to delete all selected files. This action can't be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger">Understood</Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </>
  );
};

export default TotalAccounts;
