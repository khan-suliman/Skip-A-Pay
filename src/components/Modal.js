import PropTypes from "prop-types";
import {
  ButtonGroup,
  Col,
  Container,
  Row,
  Stack,
  ToggleButton,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalComponent1 from "./ModalComponent1";
import "./style/Modal.scss";
import { useState } from "react";
import moment from "moment";

const CustomModal = (props) => {
  const [loan, setLoan] = useState(0);

  const userDetails = props.userdetails;

  let name = userDetails?.firstName;
  if (userDetails?.middleName) name += " " + userDetails?.middleName;
  if (userDetails?.lastName) name += " " + userDetails?.lastName;

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
                subtitle={moment(userDetails?.submittedDate).format(
                  "MM/DD/YYYY, hh:mm a"
                )}
              />
            </Col>
          </Row>
          <hr />
          <Row className="mt-lg-5">
            <h4 className="title">
              Loan Details <small>(select one loan)</small>
            </h4>
            <ButtonGroup>
              <Row>
                {Array(5)
                  .fill()
                  .map((_, index) => index)
                  .map((el, index) => (
                    <Col lg={"auto"} key={index}>
                      <ToggleButton
                        key={index}
                        id={`loan-${index}`}
                        type="radio"
                        variant="outline-primary custom-outline"
                        name="loan"
                        className="mb-4 text-start rounded-0"
                        value={index}
                        checked={loan === el}
                        onChange={(e) => setLoan(Number(e.currentTarget.value))}
                      >
                        <Stack>
                          <span>
                            <span className="fw-bold">Loan Type:</span> {el}
                          </span>
                          <span>
                            <span className="fw-bold">Loan ID:</span> {index}
                          </span>
                          <span>
                            <span className="fw-bold">Loan Description:</span>{" "}
                            The is just testing{" "}
                          </span>
                        </Stack>
                      </ToggleButton>
                    </Col>
                  ))}
              </Row>
            </ButtonGroup>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
CustomModal.propTypes = {
  userdetails: PropTypes.object,
};
export default CustomModal;
