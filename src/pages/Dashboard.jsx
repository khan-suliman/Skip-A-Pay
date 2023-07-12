import React, { useEffect, useMemo } from "react";
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
import { setAccounts, setSubmittedForms } from "features/auth/authSlice";

const Dashboard = () => {
  const { submittedForms, accounts } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getData = async () => {
    let applications = await submittedApplications();
    let accountsRes = await getLoans();
    dispatch(setAccounts(accountsRes.data));
    dispatch(setSubmittedForms(applications.data));
  };
  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loanCount = useMemo(() => submittedForms?.count || 0, [submittedForms]);
  const sevenDaysCount = useMemo(() => {
    let filterCount = 0;
    let filterData = submittedForms?.users.filter((account) => {
      let lastSevenDate = new Date();
      lastSevenDate.setDate(lastSevenDate.getDate() - 7);
      return new Date(account.createdAt) >= lastSevenDate;
    });
    filterCount = filterData.length;
    return filterCount;
  }, [submittedForms]);
  const accountCount = useMemo(() => accounts?.count || 0, [accounts]);

  return (
    <Card title="Dashboard">
      <Row className="g-3 mt-4">
        <Col xs={12} md={6}>
          <IconCard
            title={"Total Accounts"}
            subtitle={accountCount}
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
