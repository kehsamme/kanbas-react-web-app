import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";


export default function AssignmentsControlButtons(
  { assignmentId, deleteAssignment}: { assignmentId: string; deleteAssignment: (AssignmentId: string) => void; } ) 

  

  {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";

  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      {isFaculty && (  
      <FaTrash className="position-relative me-2" style={{ bottom: "1px" }} onClick={() => deleteAssignment(assignmentId)}/>
      )}
      
    </div>
);}



