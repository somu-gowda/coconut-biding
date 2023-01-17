import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const WalletModal = (props) => {
  const { open, handleClose } = props;
  return (
    <Modal show={open} onHide={handleClose} className="shadow">
    <Modal.Header closeButton className="bg-warning text-white">
      <Modal.Title>Wallet</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center h5" >Hi I am Your Wallet</Modal.Body>
    <Modal.Footer>
      <Button variant="warning" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default WalletModal;
