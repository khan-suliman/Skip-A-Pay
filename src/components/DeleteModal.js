import handleDeleteApiLoan from "api/user/deleteLoan";
import { toast } from "react-toastify";

const { Modal, Button } = require("react-bootstrap")

const DeleteModal = ({ show, id = "", handleClose, getLoansDetails, skip }) => {
    // handle delete btn
    const handleDelete = async () => {
        let response = await handleDeleteApiLoan(id);
        if (response?.data?.acknowledged && response?.status === 202) {
            if (response?.data?.acknowledged > 1) {
                toast.success('All accounts has been deleted successfully.');
            } else {
                toast.success('Account is deleted successfully.');
            }
            getLoansDetails(skip);
        } else {
            if (response?.status === 500) {
                toast.error(response.message);
            } else {
                toast.error('Account not found');
            }
        }

        handleClose();
    };
    return <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure to delete all selected files. This action can't be
                undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={handleDelete} variant="danger">Yes</Button>
            </Modal.Footer>
        </Modal>
    </>
}
export default DeleteModal;