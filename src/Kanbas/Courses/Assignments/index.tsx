import AssignmentsControl from "./AssignmentsControl";
import { BsGripVertical } from "react-icons/bs";
import { PiNotePencil } from "react-icons/pi";
import AssignmentPercentButtons from "./AssignmentPercentButtons";
import AssignmentsControlButtons from "./AssignmentControlsButtons"
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as assignmentsClient from "./client";
import * as coursesClient from "../client";
import { addAssignment, deleteAssignment, updateAssignment, editAssignment, setAssignment  } from "./reducer";



export default function Assignments() {
    const { cid } = useParams();
    const [assignmentName, setAssignmentName] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [availableFrom, setAvailableFrom] = useState("");
    const [availableUntil, setAvailableUntil] = useState("");
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";      
    const dispatch = useDispatch();

    // const saveAssignment = async (module: any) => {
    //   await assignmentsClient.updateAssignment(module);
    //   dispatch(updateAssignment(module));
    // };
  

    const removeAssignment = async ( assignmentId: string) => {
      //console.log("in remove assignment...");
      await assignmentsClient.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    };
  
    const fetchAssignments = async () => {
      //console.log("in fetchAssignments...");
      const assignments = await assignmentsClient.findAssignmentForCourse(cid as string);
      dispatch(setAssignment(assignments));
    };
    useEffect(() => {
      fetchAssignments();
    }, []);
  
    

    return (
      <div id="wd-assignments">
        {isFaculty && (  
        <AssignmentsControl 
        />
        )}
        <br /><br />
        <ul className="list-group rounded-0">
        <li className="wd-assignments list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
             ASSIGNMENTS 
            <AssignmentPercentButtons/>
            </div>
        <ul className="wd-lessons list-group rounded-0">
        {assignments
          .map((assignment: any) => {
            const availabilityDate = new Date(assignment.availability).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric'
            });
            const dueDate = new Date(assignment.due).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric'
            });
            const title = assignment.title;
            //console.log("title ...." + title);

            return (
              <li className="wd-lesson list-group-item p-3 ps-1">
            <BsGripVertical className="me-2 fs-3" />
            <PiNotePencil className="me-2 fs-3 text-success"/>
            {isFaculty ? (
              <a
                className="wd-assignment-link"
                href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
              >
                {assignment.title}
              </a>
                ) : (
                  <span className="wd-assignment-title">{assignment.title}</span>
            )}
            <br></br>
            <div className="ms-4 mt-1">
            <span className="red-text">Multiple Modules</span> | <strong>Not available</strong> until {availabilityDate} at 12:00am |<br/>
            Due {dueDate} at 11:59pm | {assignment.points}
            <AssignmentsControlButtons assignmentId={assignment._id} deleteAssignment={removeAssignment} 
          />
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
  //courseId={assignment.course} deleteAssignment={(courseId, assignmentId) => removeAssignment(courseId, assignmentId)}
  // editModule={(moduleId) => dispatch(editModule(moduleId))}