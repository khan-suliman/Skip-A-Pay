import handleDeleteUsers from "api/user/deleteUser";
import { toast } from "react-toastify";

const { Modal, Button } = require("react-bootstrap");

const SubmitFormDeleteModal = ({
  show,
  id = "",
  handleClose,
  getAllUsers,
  skip,
}) => {
  // handle delete btn
  const handleDelete = async () => {
    let response = await handleDeleteUsers(id);
    if (response?.data?.acknowledged && response?.status === 202) {
      if (response?.data?.acknowledged > 1) {
        toast.success("All submitted forms has been deleted successfully.");
      } else {
        toast.success("Submitted form is deleted successfully.");
      }
      getAllUsers(skip);
    } else {
      if (response?.status === 500) {
        toast.error(response.message);
      } else {
        toast.error("User data not found");
      }
    }

    handleClose();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Submitted Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete {id ? "submitted form" : "all submitted forms"}
          . This action can't be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleDelete} variant="danger">
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default SubmitFormDeleteModal;
