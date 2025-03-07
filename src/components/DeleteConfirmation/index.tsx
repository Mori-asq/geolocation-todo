import Btn from "../Shared/Btn";
import "./styles.css";

interface DeleteConfirmationProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation = ({
  onClose,
  onConfirm,
}: DeleteConfirmationProps) => {
  return (
    <>
      <h2>Confirm Deletion</h2>
      <p>{"Are you sure for deleting this task?"}</p>
      <div className="actions">
        <Btn className="cancel-btn" onClick={onClose}>
          Cancel
        </Btn>

        <Btn className="delete-btn" onClick={onConfirm}>
          Delete
        </Btn>
      </div>
    </>
  );
};

export default DeleteConfirmation;
