// each title is a hyper linke and navigates to the editor screen
// commit everything to a new branch
import AssignmentsControl from "./AssignmentsControl";
import { BsGripVertical } from "react-icons/bs";
import { PiNotePencil } from "react-icons/pi";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentPercentButtons from "./AssignmentPercentButtons";
export default function Assignments() {
    return (
      <div id="wd-assignments">
        <AssignmentsControl /> <br /><br />
        <ul className="list-group rounded-0">
          <li className="wd-module list-group-item p-0
                        mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
                ASSIGNMENTS 
                <AssignmentPercentButtons/>
                </div>
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
            <BsGripVertical className="me-2 fs-3" />
            <PiNotePencil className="me-2 fs-3 text-success"/>
            <a className="wd-assignment-link"
              href="#/Kanbas/Courses/1234/Assignments/123">
              A1 - ENV + HTML 
            </a> <br></br>
            <div className="ms-4 mt-1">
            <span className="red-text">Multiple Modules</span> | <strong>Not available</strong> until May 6 at 12:00am |<br/>
            Due may 13 at 11:59pm | 100 pts  
            </div>
            <LessonControlButtons /> </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <PiNotePencil className="me-2 fs-3 text-success"/>
              <a className="wd-assignment-link"
              href="#/Kanbas/Courses/1234/Assignments/123">
              A2 - CSS + BOOTSTRAP </a> <br></br>
              <div className="ms-4 mt-1">
              <span className="red-text">Multiples Modules</span> | <strong>Not available</strong> until May 13 at 12:00am |<br></br>
              Due May 20 at 11:59pm | 100 pts
              </div>
              <LessonControlButtons /> 
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <PiNotePencil className="me-2 fs-3 text-success"/>
              <a className="wd-assignment-link"
              href="#/Kanbas/Courses/1234/Assignments/123">
              A3 - JAVASCRIPT + REACT <br></br>
              </a>
              <div className="ms-4 mt-1">
              <span className="red-text">Multiples Modules</span> | <strong>Not available</strong> until May 20 at 12:00am |<br></br>
              Due May 27 at 11:59pm | 100 pts
              </div>
              <LessonControlButtons />
          </li>
            </ul>
          </li>
          </ul>
      </div>
    )
  ;}
  //       <h3 id="wd-assignments-title">
  //       <BsGripVertical className="me-2 fs-3" />
  //         ASSIGNMENTS 40% of Total <button>+</button>
  //         <LessonControlButtons />

  //       </h3>
  //       <ul id="wd-assignment-list">
  //         <li className="wd-assignment-list-item">
  //           <a className="wd-assignment-link"
  //             href="#/Kanbas/Courses/1234/Assignments/123">
  //             A1 - ENV + HTML <br></br>
  //           </a>
  //           Multiples Modules| Not available until May 6 at 12:00 am <br></br>
  //           Due May 13 at 11:59pm | 100 pts
  //         </li>
  //         <li className="wd-assignment-list-item">
  //           <a className="wd-assignment-link"
  //             href="#/Kanbas/Courses/1234/Assignments/123">
  //             A2 - CSS + BOOTSTRAP <br></br>
  //           </a>
  //             Multiples Modules| Not available until May 13 at 12:00 am <br></br>
  //             Due May 20 at 11:59pm | 100 pts
  //         </li>
  //         <li className="wd-assignment-list-item">
  //           <a className="wd-assignment-link"
  //             href="#/Kanbas/Courses/1234/Assignments/123">
  //             A3 - JAVASCRIPT + REACT <br></br>
  //             </a>
  //             Multiples Modules| Not available until May 20 at 12:00 am <br></br>
  //             Due May 27 at 11:59pm | 100 pts
  //         </li>
  //       </ul>
  //     </div>
  // );}
  