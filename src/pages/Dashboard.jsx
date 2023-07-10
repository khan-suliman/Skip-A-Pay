import React, { useEffect, useState } from "react";
import IconCard from "sections/dashboard/IconCard";
import { BanknotesIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Col, Row } from "react-bootstrap";
import Card from "components/Card";
import submittedApplications from "features/admin/users";
import { loans } from "features/admin/loans";

const Dashboard = () => {
  const [loanCount, setLoanCount] = useState("Loading...");
  const [accountCount, setAccountCount] = useState("Loading...");

  const getData = async () => {
    let applications = await submittedApplications();
    let accounts = await loans();
    setLoanCount(applications.data?.length);
    setAccountCount(accounts.data?.length);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Card title="Dashboard">
      <Row className="g-3 mt-4">
        <Col xs="auto">
          <IconCard
            title={"Accounts"}
            subtitle={accountCount}
            icon={UserGroupIcon}
            backgroundColor="var(--blue)"
            to={"/total-accounts"}
          />
        </Col>
        <Col xs="auto">
          <IconCard
            title={"Loan Applied"}
            subtitle={loanCount}
            icon={BanknotesIcon}
            backgroundColor={"var(--purple)"}
            to={"/submitted-form"}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Dashboard;
