import Card from "components/Card";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactTable from "components/Table";
import submittedApplications from "api/admin/users";
import { Dropdown, Spinner, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSubmittedForms } from "features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useQuery from "hooks/useQuery";
import formDownload from "api/user/downloadForm";
import { saveAs } from "file-saver";

const SubmittedForm = () => {
  const submittedForms = useSelector((state) => state.auth.submittedForms);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const toastId = useRef(null);

  const [isLoading, setIsLoading] = useState(
    !Array.isArray(submittedForms?.users)
  );
  const [filterDate, setFilterDate] = useState({});
  const [filterLabel, setFilterLabel] = useState("Filter by Date");

  //filter option
  const filterDays = [7, 14, 30];

  const getAllUsers = async (params = {}) => {
    let applications = await submittedApplications(params);
    dispatch(setSubmittedForms(applications.data));
    setIsLoading(false);
  };

  useEffect(() => {
    let days = query.get("days");
    setFilterDate(
      filterDays.includes(Number(days))
        ? { label: `Last ${days} days`, value: days }
        : ""
    );
    days && setFilterLabel(`Last ${days} days`);

    getAllUsers(days && { days });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  let data = useMemo(() => submittedForms, [submittedForms]);

  // filter the form data
  const handleFilter = (days) => {
    // let days = e.target.value || 0;
    setFilterDate({ label: `Last ${days} days`, value: days });
    // getAllUsers(days && { days });
    if (days) {
      navigate("?days=" + days);
      setFilterLabel(`Last ${days} days`);
    } else {
      setFilterLabel(`Filter by Date`);
      navigate({ replace: true });
    }
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
    <Card title="Submitted Form">
      <div className="py-3">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            {data.count > 0 && (
              <>
                <Stack
                  direction="horizontal"
                  gap={2}
                  className="mb-2 flex-wrap"
                >
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
                          className={`${
                            Number(filterDate?.value) === days ? "active" : ""
                          }`}
                          key={index}
                          onClick={() => handleFilter(days)}
                        >
                          Last {days} Days
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
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
                </Stack>
                <ReactTable data={data.users} columns={columns} />
              </>
            )}
            {data.count === 0 && <p>No form has been submitted yet.</p>}
          </>
        )}
      </div>
    </Card>
  );
};

export default SubmittedForm;
