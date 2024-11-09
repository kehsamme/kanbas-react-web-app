import { useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

interface AssignmentDeleteProps {
  dialogTitle: string;
  assignmentId: string;
  onClose: () => void;
}

export default function AssignmentDelete({ dialogTitle, assignmentId, onClose }: AssignmentDeleteProps) {
  const dispatch = useDispatch();

  // Dispatch delete action
  const handleDelete = () => {
    dispatch(deleteAssignment(assignmentId)); 
    onClose(); // Close after deleting
  };

  return (
    <div id="wd-add-module-dialog" className="modal fade show" tabIndex={-1} style={{ display: "block" }} data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}
            </h1>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <p>Do you want to delete this assignment?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
