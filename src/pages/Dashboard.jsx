import React from "react";
import IconCard from "sections/dashboard/IconCard";
import { BanknotesIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Col, Row } from "react-bootstrap";
import Card from "components/Card";

const Dashboard = () => {
  return (
    <Card title="Dashboard">
      <Row className="g-3 mt-4">
        <Col xs="auto">
          <IconCard
            title={"Accounts"}
            subtitle={200}
            icon={UserGroupIcon}
            backgroundColor={"var(--blue)"}
          />
        </Col>
        <Col xs="auto">
          <IconCard
            title={"Loan Applied"}
            subtitle={200}
            icon={BanknotesIcon}
            backgroundColor={"var(--purple)"}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Dashboard;
