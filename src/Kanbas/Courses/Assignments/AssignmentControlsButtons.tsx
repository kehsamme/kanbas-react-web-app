import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";


export default function AssignmentsControlButtons({ assignmentId }: { assignmentId: string }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  const dispatch = useDispatch();

  // Dispatch delete action
  const handleDelete = () => {
    dispatch(deleteAssignment(assignmentId)); 
  };

  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      {isFaculty && (
        <FaTrash
          className="position-relative me-2"
          style={{ bottom: "1px" }}
          onClick={handleDelete}
        />
      )}
    </div>
  );
}