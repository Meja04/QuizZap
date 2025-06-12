import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "./Timeout.css";

interface TimeoutProps {
  open: boolean;
  onClose: () => void;
}

export default function Timeout({ open, onClose }: TimeoutProps) {
  // Previene la chiusura accidentale del modale
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="timeout-modal-title"
      aria-describedby="timeout-modal-description"
    >
      <div className="timeout-modal-container">
        <h2 className="timeout-modal-title" id="timeout-modal-title">
          Time's up!
        </h2>
        <p className="timeout-modal-description" id="timeout-modal-description">
          Your time has expired.
        </p>
        <div className="timeout-modal-actions">
          <Button
            variant="contained"
            onClick={onClose}
            className="btn btn-light timeout-modal-btn"
            autoFocus
          >
            Ok
          </Button>
        </div>
      </div>
    </Modal>
  );
}