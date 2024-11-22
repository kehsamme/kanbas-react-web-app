import { useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import * as assignmentsClient from "./client";


interface AssignmentDeleteProps {
  dialogTitle: string;
  assignmentId: string;
  onDelete: (assignmentId: string) => void;
  onClose: () => void;
}

export default function AssignmentDelete({ dialogTitle, assignmentId, onDelete, onClose }: AssignmentDeleteProps) {
  const dispatch = useDispatch();
  console.log("in assignment delete..."+assignmentId);


  // Delete action
  const handleDelete = () => {
    console.log("in handle delete..."+assignmentId);
    onDelete(assignmentId);
    console.log("after handle deleted..."+assignmentId);
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
