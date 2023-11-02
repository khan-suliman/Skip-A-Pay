import PropTypes from "prop-types";
import {
  ButtonGroup,
  Col,
  Container,
  Row,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalComponent1 from "./ModalComponent1";
import "./style/Modal.scss";
import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import handleSubmitForm from "api/user/handleSubmitForm";

/**
 * CustomModal is a custom React modal component.
 *
 * @param {Object} props - The properties for configuring the modal.
 * @param {string} props.title - The title of the modal.
 * @param {boolean} props.show - A boolean indicating whether the modal is open or closed.
 * @param {function} props.onHide - A function to close the modal when triggered.
 * @param {Object} props.userdetails - The user data object.
 * @param {Object} props.userdetails.loantype - The user loan object.
 * @param {Array} props.userdetails.loantype.availableLoans - The user available loans array.
 * @param {(string|Object)} props.userdetails.loantype.user - The loan information. It can be a string if not applied or an object if applied.
 */
const CustomModal = (props) => {
  let userDetails = props.userdetails;
  let availableLoans = userDetails.loantype.availableLoans;

  let isAlreadyApplied = typeof userDetails.loantype?.user === "object";
  let isLoansAvailable = availableLoans.length > 0;

  const [loan, setLoan] = useState([]);

  let name = userDetails?.firstName;
  if (userDetails?.middleName) name += " " + userDetails?.middleName;
  if (userDetails?.lastName) name += " " + userDetails?.lastName;

  // handle loan selection
  const handleLoans = (val) => {
    setLoan(val);
  };

  // loan form submission
  const handleSubmitData = async () => {
    if (!loan.length) {
      return toast.error("Please select at least one Loan");
    }
    if (loan.length) {
      const response = isAlreadyApplied
        ? await handleSubmitForm.update({ ...userDetails, loan })
        : await handleSubmitForm.create({ ...userDetails, loan });
      if (response.status === 201 || response.status === 200) {
        toast.success(
          `Loan ${isAlreadyApplied ? "updated" : "applied"} successfully`
        );
      } else {
        toast.error(response.message);
      }
      props.onHide();
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalComponent py-lg-5">
        <Container>
          <Row className="mb-lg-5">
            <Col xs={12} lg={4}>
              <ModalComponent1
                title="Name"
                subtitle={name}
                borderRight={true}
              />
            </Col>
            <Col xs={12} lg={4}>
              <ModalComponent1
                title={"Email"}
                subtitle={userDetails?.email}
                borderRight={true}
              />
            </Col>
            <Col xs={12} lg={4}>
              <ModalComponent1
                title={"Phone"}
                subtitle={userDetails?.phoneNumber}
              />
            </Col>
          </Row>
          <hr />
          <Row className="my-lg-5">
            <Col xs={12} lg={4}>
              <ModalComponent1
                title={"Account Number"}
                subtitle={userDetails?.accountNumber}
                borderRight={true}
              />
            </Col>
            <Col xs={12} lg={4}>
              <ModalComponent1
                title={"SSN"}
                subtitle={userDetails?.ssnNumber}
                borderRight={true}
              />
            </Col>
            <Col xs={12} lg={4}>
              <ModalComponent1
                title={"Submitted Date"}
                subtitle={moment(userDetails?.createdAt).format(
                  "MM/DD/YYYY, hh:mm a"
                )}
              />
            </Col>
          </Row>
          <Row className="mt-lg-5">
            {isLoansAvailable && (
              <>
                <hr />
                <h4 className="title">
                  Loan Details{" "}
                  <small>(Please select the loan(s) you wish to skip)</small>
                </h4>
                <ButtonGroup>
                  <Row>
                    {userDetails?.loantype?.availableLoans.map(
                      (availableLoan, index) => (
                        <Col lg={"auto"} key={index}>
                          <ToggleButtonGroup
                            type="checkbox"
                            value={loan}
                            onChange={handleLoans}
                          >
                            <ToggleButton
                              key={index}
                              id={`loan-${index}`}
                              variant="outline-primary custom-outline"
                              name="loan"
                              className="mb-4 text-start rounded-0"
                              value={availableLoan._id}
                              checked={loan === availableLoan._id}
                            >
                              <Stack>
                                <span>
                                  <span className="fw-bold">Loan Type:</span>{" "}
                                  {availableLoan.loan_type}
                                </span>
                                <span>
                                  <span className="fw-bold">Loan ID:</span>{" "}
                                  {availableLoan.loan_id}
                                </span>
                                <span>
                                  <span className="fw-bold">
                                    Loan Description:
                                  </span>{" "}
                                  {availableLoan.Description}{" "}
                                </span>
                              </Stack>
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Col>
                      )
                    )}
                  </Row>
                </ButtonGroup>
              </>
            )}
            {isAlreadyApplied && (
              <>
                <hr />
                <h4 className="title">Already applied loan(s)</h4>
                <ButtonGroup>
                  <Row>
                    {userDetails?.loantype?.user.loan.map(
                      (appliedLoan, index) => (
                        <Col lg={"auto"} key={index}>
                          <ToggleButtonGroup
                            type="checkbox"
                            value={loan}
                            onChange={handleLoans}
                          >
                            <ToggleButton
                              key={index}
                              id={`loan-${index}`}
                              variant="outline-primary custom-outline"
                              name="loan"
                              className="mb-4 text-start rounded-0"
                              disabled
                            >
                              <Stack>
                                <span>
                                  <span className="fw-bold">Loan Type:</span>{" "}
                                  {appliedLoan.loan_type}
                                </span>
                                <span>
                                  <span className="fw-bold">Loan ID:</span>{" "}
                                  {appliedLoan.loan_id}
                                </span>
                                <span>
                                  <span className="fw-bold">
                                    Loan Description:
                                  </span>{" "}
                                  {appliedLoan.Description}{" "}
                                </span>
                              </Stack>
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Col>
                      )
                    )}
                  </Row>
                </ButtonGroup>
              </>
            )}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        {isLoansAvailable ? (
          <Button onClick={handleSubmitData} disabled={!loan.length}>
            Submit
          </Button>
        ) : (
          <Button
            onClick={() => {
              props.onHide();
            }}
          >
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
CustomModal.propTypes = {
  userdetails: PropTypes.object,
};
export default CustomModal;
