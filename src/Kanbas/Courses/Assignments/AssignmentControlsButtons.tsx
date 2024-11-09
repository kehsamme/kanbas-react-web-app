import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import AssignmentDelete from "./AssignmentDelete";
import { useState } from "react";


export default function AssignmentsControlButtons({ assignmentId }: { assignmentId: string }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleToggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      {isFaculty && (
        <>
        <FaTrash
          className="position-relative me-2"
          style={{ bottom: "1px" }}
          onClick={handleToggleDeleteModal}
        />
        {showDeleteModal && (
          <AssignmentDelete
            dialogTitle="Delete Assignment"
            assignmentId={assignmentId}
            onClose={handleToggleDeleteModal} 
          />
        )}
        </>
      )}
    </div>
  );
}