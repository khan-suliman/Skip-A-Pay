import React, { useEffect } from "react";
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

  const getData = async () => {
    let applications = await submittedApplications();
    let accountsRes = await getLoans();

    // store the count in redux
    dispatch(setAccountsCount(accountsRes.data.count));
    dispatch(
      setSubmittedFormsCount({
        count: applications.data.count,
        sevenDaysCount: applications.data.sevenDaysCount,
      })
    );
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
            subtitle={accountsCount || "0"}
            icon={UserGroupIcon}
            backgroundColor="var(--blue)"
            to={"/total-accounts"}
          />
        </Col>
        <Col xs={12} md={6}>
          <IconCard
            title={"Total Loan Applied"}
            subtitle={loanCount?.count || "0"}
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
            subtitle={loanCount?.sevenDaysCount || "0"}
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
