import PropTypes from "prop-types";
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalComponent1 from './ModalComponent1';

const CustomModal = (props) => {
    // const userDetails = {
    //     name: 'Alexander Phillip Dyakman',
    //     email: 'apply@gmail.com',
    //     phone: '009911223344',
    //     accountNumber: '778899',
    //     ssn: '557',
    //     submittedDate: 'March 30, 2020, 4:52 PM',
    //     loanDetails: {
    //         type: '3',
    //         id: '2',
    //         desc: 'USED AUTO LOAN'
    //     }
    // }
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
            <Modal.Body className='modalComponent py-lg-5'>
                <Container>
                    <Row className='mb-lg-5'>
                        <Col xs={12} lg={4}>
                            <ModalComponent1 title={'Name'} subtitle={userDetails?.name} borderRight={true} />
                        </Col>
                        <Col xs={12} lg={4}>
                            <ModalComponent1 title={'Email'} subtitle={userDetails?.email} borderRight={true} />
                        </Col>
                        <Col xs={12} lg={4}>
                            <ModalComponent1 title={'Phone'} subtitle={userDetails?.phone} />
                        </Col>
                    </Row>
                    <hr />
                    <Row className='my-lg-5'>
                        <Col xs={12} lg={4}>
                            <ModalComponent1 title={'Account Number'} subtitle={userDetails?.accountNumber} borderRight={true} />
                        </Col>
                        <Col xs={12} lg={4}>
                            <ModalComponent1 title={'SSN'} subtitle={userDetails?.ssn} borderRight={true} />
                        </Col>
                        <Col xs={12} lg={4}>
                            <ModalComponent1 title={'Submitted Date'} subtitle={userDetails?.submittedDate} />
                        </Col>
                    </Row>
                    <hr />
                    <Row className='mt-lg-5'>
                        <Col xs={12} lg={4}>
                            <ModalComponent1 title={'Loan Type'} subtitle={userDetails?.loanType} borderRight={true} />
                        </Col>
                        <Col xs={12} lg={4}>
                            <ModalComponent1 title={'Loan ID'} subtitle={userDetails?.loanId} borderRight={true} />
                        </Col>
                        <Col xs={12} lg={4}>
                            <ModalComponent1 title={'Loan Description'} subtitle={userDetails?.loanDesc} />
                        </Col>
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