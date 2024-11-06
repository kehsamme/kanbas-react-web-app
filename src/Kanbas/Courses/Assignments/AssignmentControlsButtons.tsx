import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";

export default function AssignmentsControlButtons(
  { assignmentId, deleteAssignment}: { assignmentId: string; deleteAssignment: (AssignmentId: string) => void; } ) 

//   assignmentId,
//   deleteAssignment,
// }: {
//   assignmentId: string;
//   deleteAssignment: (assignmentId: string) => void;
  {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <FaTrash className="position-relative me-2" style={{ bottom: "1px" }} onClick={() => deleteAssignment(assignmentId)}/>
      
    </div>
);}



