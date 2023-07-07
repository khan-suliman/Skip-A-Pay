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

const CustomModal = (props) => {
  const [radioValue, setRadioValue] = useState(0);
  console.log(props);

  const radios = [
    { name: "Active", value: "1" },
    { name: "Radio", value: "2" },
    { name: "Radio", value: "3" },
    { name: "Radio", value: "4" },
    { name: "Radio", value: "5" },
  ];
  const userDetails = props.userdetails;
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
                title={"Name"}
                subtitle={userDetails?.name}
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
              <ModalComponent1 title={"Phone"} subtitle={userDetails?.phone} />
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
                subtitle={userDetails?.ssn}
                borderRight={true}
              />
            </Col>
            <Col xs={12} lg={4}>
              <ModalComponent1
                title={"Submitted Date"}
                subtitle={userDetails?.submittedDate}
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
                {radios.map((radio, idx) => (
                  <Col lg={"auto"} key={idx}>
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant="outline-primary custom-outline"
                      name="radio"
                      className="mb-4 text-start rounded-0"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      <Stack>
                        <span>
                          <span className="fw-bold">Loan Type:</span> 3
                        </span>
                        <span>
                          <span className="fw-bold">Loan ID:</span> 3
                        </span>
                        <span>
                          <span className="fw-bold">Loan Description:</span> The
                          is just testing{" "}
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
