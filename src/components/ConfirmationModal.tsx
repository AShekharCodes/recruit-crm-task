import React from "react";
import "../styles/ConfirmationModal.css";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal-content">
        <h3>Discard Changes?</h3>
        <p>You have unsaved changes. Are you sure you want to discard them?</p>
        <div className="confirmation-modal-actions">
          <button onClick={onCancel} className="btn-secondary-modal">
            Keep Editing
          </button>
          <button onClick={onConfirm} className="btn-danger-modal">
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
