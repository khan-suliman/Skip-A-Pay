import Card from "components/Card";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactTable from "components/Table";
import submittedApplications from "api/admin/users";
import { Button, Dropdown, Spinner, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setSubmittedFormsCount } from "features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useQuery from "hooks/useQuery";
import formDownload from "api/user/downloadForm";
import { saveAs } from "file-saver";
import Input from "components/Form/Input";
import moment from "moment";
import SubmitFormDeleteModal from "components/SubmitFormDeleteModal";

const SubmittedForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const toastId = useRef(null);
  const skip = 1;

  const [isLoading, setIsLoading] = useState(true);
  const [filterDate, setFilterDate] = useState({});
  const [filterLabel, setFilterLabel] = useState("Filter by Date");
  const [submittedForm, setSubmittedForm] = useState([]);
  // Delete model data
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  //filter option
  const filterDays = [7, 14, 30];

  const getAllUsers = async (params = {}) => {
    let applications = await submittedApplications(params);
    dispatch(
      setSubmittedFormsCount({
        count: applications.data?.count,
      })
    );
    setSubmittedForm(applications.data?.users);
    setIsLoading(false);
  };

  useEffect(() => {
    let days = query.get("days");
    let search = query.get("search");
    let queryParams = {};
    setFilterDate(
      filterDays.includes(Number(days))
        ? { label: `Last ${days} days`, value: days }
        : ""
    );
    days && setFilterLabel(`Last ${days} days`);

    if (search) {
      queryParams["search"] = search;
    }
    if (days) {
      queryParams["days"] = days;
    }

    getAllUsers(queryParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  let data = useMemo(() => submittedForm, [submittedForm]);

  // filter the form data
  const handleFilter = (days) => {
    const searchQuery = new URLSearchParams(window.location.search).get(
      "search"
    );
    const queryParams = new URLSearchParams();

    if (days) {
      queryParams.set("days", days);
    } else {
      setFilterLabel(`Filter by Date`);
    }

    if (searchQuery) {
      queryParams.set("search", searchQuery);
    }

    const queryString = queryParams.toString();
    if (queryString) {
      // let days = e.target.value || 0;
      setFilterDate({ label: `Last ${days} days`, value: days });
      navigate("?" + queryString);
      if (days) {
        setFilterLabel(`Last ${days} days`);
      } else {
        setFilterLabel(`Filter by Date`);
      }
    } else {
      navigate({ replace: true });
    }
  };

  // handle search input
  const handleSearch = (e) => {
    let searchQuery = e.target.value;

    const daysQuery = new URLSearchParams(window.location.search).get("days");
    const queryParams = new URLSearchParams();

    if (daysQuery) {
      queryParams.set("days", daysQuery);
    } else {
      setFilterLabel(`Filter by Date`);
    }

    if (searchQuery) {
      queryParams.set("search", searchQuery);
    } else {
      queryParams.delete("search");
    }

    const queryString = queryParams.toString();
    let searchTimeout;

    if (!queryString) {
      clearTimeout(searchTimeout);
      return navigate({ replace: true });
    }
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      navigate("?" + queryString);
    }, 1000);
  };

  // download all form in csv format
  const handleDownload = async (days) => {
    let param = days ? { days } : { days: null };
    let msg = days
      ? `Last ${days} days data downloaded.`
      : "All data downloaded.";
    toastId.current = toast.loading("Downloading...", {
      autoClose: false,
      closeOnClick: false,
    });
    let downloadRes = await formDownload(param);
    if (downloadRes.status === 200) {
      let fileName = days ? `${days}-days-data.csv` : "all-data.csv";
      // Save the file using FileSaver.js
      saveAs(downloadRes.data, fileName);
      toast.update(toastId.current, {
        render: msg,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
        closeOnClick: true,
      });
    } else {
      toast.update(toastId.current, {
        render: downloadRes.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
        closeOnClick: true,
      });
    }
  };

  // delete all
  const handleDelete = (event) => {
    setDeleteId(event.currentTarget.value);
    setShow(true);
  };

  // handle close
  const handleClose = () => {
    setShow(false);
  };
  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Email", accessor: "email" },
      { Header: "Account Number", accessor: "accountNumber" },
      { Header: "Loan ID", accessor: "loan._id" },
      // { Header: "Phone Number", accessor: "phoneNumber" },
      {
        Header: "Submitted Date",
        accessor: "loan.updatedAt",
        Cell: ({ value }) => moment(value).format("MM/DD/YYYY, hh:mm a"),
      },
    ],
    []
  );
  return (
    <Card
      title="Submitted Form"
      actionElement={
        !isLoading &&
        data?.length > 0 && (
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete All
          </Button>
        )
      }
    >
      <div className="py-3">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <Stack direction="horizontal" gap={2} className="mb-2 flex-wrap">
              <Input
                name="search"
                type="search"
                placeholder="Search"
                handleChange={handleSearch}
                className="mb-0 flex-grow-1 flex-md-grow-0"
                inputclassname="py-6"
              />
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="border"
                  style={{ background: "white" }}
                >
                  {filterLabel}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleFilter(0)}>
                    Filter by Date
                  </Dropdown.Item>
                  {filterDays.map((days, index) => (
                    <Dropdown.Item
                      className={`${Number(filterDate?.value) === days ? "active" : ""
                        }`}
                      key={index}
                      onClick={() => handleFilter(days)}
                    >
                      Last {days} Days
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {data?.length > 0 && (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                    className="border"
                    style={{ background: "white" }}
                  >
                    Download
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDownload(0)}>
                      All Data
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDownload(7)}>
                      Last 7 days
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDownload(14)}>
                      Last 14 days
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDownload(30)}>
                      Last 30 days
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Stack>
            {data?.length > 0 && <ReactTable data={data} columns={columns} />}
            {data?.length === 0 && (
              <p>No form has been submitted yet or no form found.</p>
            )}
          </>
        )}
      </div>
      <SubmitFormDeleteModal
        getAllUsers={getAllUsers}
        skip={skip}
        id={deleteId}
        show={show}
        handleClose={handleClose}
      />
    </Card>
  );
};

export default SubmittedForm;
