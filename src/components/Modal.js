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

const CustomModal = (props) => {
  // console.log('user', props.userdetails);
  // assign all ids to loanIds here , this will only get when user was already present in database like if the user was present then database so all of loadids will be assign ehre
  const loanIds = Array.isArray(props.userdetails.loantype) ? [] : props.userdetails.loantype?.loan?.map(item => item._id);

  const [loan, setLoan] = useState(loanIds);

  let userDetails = props.userdetails;
  if (!Array.isArray(userDetails.loantype)) {
    userDetails = userDetails.loantype;
  }
  let name = userDetails?.firstName;
  if (userDetails?.middleName) name += " " + userDetails?.middleName;
  if (userDetails?.lastName) name += " " + userDetails?.lastName;
  // assign all selected loan here.. 
  const handleLoans = (val) => {
    setLoan(val);
  }
  // this submit button will show when user is not saved / applied
  // when submit button is clicked
  const handleSubmitData = async () => {
    if (loan.length) {
      const response = await handleSubmitForm({ ...userDetails, loan });
      if (response.status === 201 || response.status === 200) {
        toast.success("Loan applied successfully");
      } else {
        toast.error(response.message);
      }
      props.onHide();
    } else {
      toast.error("Please select loan type");
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
          <hr />
          <Row className="mt-lg-5">
            {/* If array -> user not saved in database. */}
            {Array.isArray(props.userdetails.loantype) ? (
              <h4 className="title">
                Loan Details <small>(Click on the loan(s) you want to skip)</small>
              </h4>
            ) : (
              <h4 className="title">
                Loan Details <small>(You have already applied.)</small>
              </h4>
            )}
            <ButtonGroup>
              <Row>
                {/* If array -> user not saved in database. 
                    then it will show here all loan types then
                    user will select one loan here*/}
                {Array.isArray(props.userdetails.loantype) ? (
                  userDetails?.loantype?.map((el, index) => (
                    <Col lg={"auto"} key={index}>
                      <ToggleButtonGroup type="checkbox" value={loan} onChange={handleLoans}>
                        <ToggleButton
                          key={index}
                          id={`loan-${index}`}
                          // type="radio"
                          variant="outline-primary custom-outline"
                          name="loan"
                          className="mb-4 text-start rounded-0"
                          value={el._id}
                          checked={loan === el._id}
                        // onChange={(e) => setLoan(e.currentTarget.value)}
                        >
                          <Stack>
                            <span>
                              <span className="fw-bold">Loan Type:</span>{" "}
                              {el.loan_type}
                            </span>
                            <span>
                              <span className="fw-bold">Loan ID:</span>{" "}
                              {el.loan_id}
                            </span>
                            <span>
                              <span className="fw-bold">Loan Description:</span>{" "}
                              {el.Description}{" "}
                            </span>
                          </Stack>
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Col>
                  ))
                ) : (
                  // here will show if user is already saved,
                  userDetails?.loan?.map((el, index) => (
                    <Col lg={"auto"} key={index}>
                      <ToggleButtonGroup type="checkbox" value={loan} onChange={handleLoans}>
                        <ToggleButton
                          key={index}
                          id={`loan-${index}`}
                          // type="radio"
                          variant="outline-primary custom-outline"
                          name="loan"
                          disabled
                          className="mb-4 text-start rounded-0"
                          value={el._id}
                        // onChange={(e) => setLoan(e.currentTarget.value)}
                        >
                          <Stack>
                            <span>
                              <span className="fw-bold">Loan Type:</span>{" "}
                              {el.loan_type}
                            </span>
                            <span>
                              <span className="fw-bold">Loan ID:</span>{" "}
                              {el.loan_id}
                            </span>
                            <span>
                              <span className="fw-bold">Loan Description:</span>{" "}
                              {el.Description}{" "}
                            </span>
                          </Stack>
                        </ToggleButton>
                      </ToggleButtonGroup>
                      {/* <ToggleButton
                      key={userDetails?.loan?._id}
                      id={`loan-${userDetails?.loan?._id}`}
                      // type="radio"
                      variant="outline-primary custom-outline"
                      name="loan"
                      className="mb-4 text-start rounded-0"
                      value={userDetails?.loan?._id}
                      checked
                      onChange={(e) => setLoan(e.currentTarget.value)}
                    >
                      <Stack>
                        <span>
                          <span className="fw-bold">Loan Type:</span>{" "}
                          {userDetails?.loan?.loan_type}
                        </span>
                        <span>
                          <span className="fw-bold">Loan ID:</span>{" "}
                          {userDetails?.loan?.loan_id}
                        </span>
                        <span>
                          <span className="fw-bold">Loan Description:</span>{" "}
                          {userDetails?.loan?.Description}
                        </span>
                      </Stack>
                    </ToggleButton> */}

                    </Col>
                  )
                  )
                )}
              </Row>
            </ButtonGroup>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        {Array.isArray(props.userdetails.loantype) ? (
          <Button onClick={handleSubmitData} disabled={!loan.length}>Submit</Button>
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
