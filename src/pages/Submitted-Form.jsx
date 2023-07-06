import Card from "components/Card";
import React, { useMemo } from "react";
import ReactTable from "components/Table";
import submittedApplications from "features/admin/users";

const SubmittedForm = () => {
  const applications = submittedApplications();
  console.log('applications', applications);
  const data = useMemo(
    () => [
      { id: 1, name: "John Doe", age: 30 },
      { id: 2, name: "Jane Smith", age: 25 },
      { id: 3, name: "Bob Johnson", age: 40 },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Age", accessor: "age" },
    ],
    []
  );
  return (
    <Card title="Submitted Form" backgroundColor={"var(--isabelline)"}>
      <div className="py-3">
        <ReactTable data={data} columns={columns} />
      </div>
    </Card>
  );
};

export default SubmittedForm;
