import React, { useEffect, useState } from "react";
import IconCard from "sections/dashboard/IconCard";
import {
  BanknotesIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Col, Row } from "react-bootstrap";
import Card from "components/Card";
import submittedApplications from "api/admin/users";
import { getLoans } from "api/admin/loans";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccountsCount,
  setSubmittedFormsCount,
} from "features/auth/authSlice";

const Dashboard = () => {
  const { submittedFormsCount: loanCount, accountsCount } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  //FIXME: change to last 7 days loan applied
  const [sevenDaysCount, setSevenDaysCount] = useState(0);

  const getData = async () => {
    let applications = await submittedApplications();
    let accountsRes = await getLoans();

    // store the count in redux
    dispatch(setAccountsCount(accountsRes.data.count));
    dispatch(setSubmittedFormsCount(applications.data.count));
  };
  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card title="Dashboard">
      <Row className="g-3 mt-4">
        <Col xs={12} md={6}>
          <IconCard
            title={"Total Accounts"}
            subtitle={accountsCount}
            icon={UserGroupIcon}
            backgroundColor="var(--blue)"
            to={"/total-accounts"}
          />
        </Col>
        <Col xs={12} md={6}>
          <IconCard
            title={"Total Loan Applied"}
            subtitle={loanCount}
            icon={BanknotesIcon}
            backgroundColor={"var(--purple)"}
            to={"/submitted-form"}
          />
        </Col>
      </Row>
      <Row className="g-3 mt-0">
        <Col xs={12} md={6}>
          <IconCard
            title={"Download Application"}
            icon={DocumentArrowDownIcon}
            backgroundColor={"var(--purple)"}
            to={"/submitted-form"}
          />
        </Col>
        <Col xs={12} md={6}>
          <IconCard
            title={"Loan Applied"}
            smallTitle={"(last 7days)"}
            subtitle={sevenDaysCount}
            icon={CalendarIcon}
            backgroundColor="var(--blue)"
            to={"/submitted-form?days=7"}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Dashboard;
