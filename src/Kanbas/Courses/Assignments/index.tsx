import AssignmentsControl from "./AssignmentsControl";
import { BsGripVertical } from "react-icons/bs";
import { PiNotePencil } from "react-icons/pi";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentPercentButtons from "./AssignmentPercentButtons";
import { useParams } from "react-router";
import * as db from "../../Database";
export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments;
    return (
      <div id="wd-assignments">
        <AssignmentsControl /> <br /><br />
        <ul className="list-group rounded-0">
        <li className="wd-assignments list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
             ASSIGNMENTS 
            <AssignmentPercentButtons/>
            </div>
        <ul className="wd-lessons list-group rounded-0">
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => {
            const availabilityDate = new Date(assignment.availability).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric'
            });
            const dueDate = new Date(assignment.due).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric'
            });
            
            return (
              <li className="wd-lesson list-group-item p-3 ps-1">
            <BsGripVertical className="me-2 fs-3" />
            <PiNotePencil className="me-2 fs-3 text-success"/>
            <a className="wd-assignment-link"
              href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
              {assignment.title} 
            </a> <br></br>
            <div className="ms-4 mt-1">
            <span className="red-text">Multiple Modules</span> | <strong>Not available</strong> until {availabilityDate} at 12:00am |<br/>
            Due {dueDate} at 11:59pm | {assignment.points}
            <LessonControlButtons />
            </div>
            </li>
            );
          })}
        </ul>
        </li>
        </ul>
      </div>
    );
  }