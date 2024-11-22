
import { FaPlus } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import AssignmentEditor_22 from "./editor_2";
// import { useParams } from "react-router";
import { useState } from "react";
// import * as db from "../../Database";
// import AssignmentDelete from "./AssignmentDelete";


// interface AssignmentsControlProps {
//   addAssignment: (assignmentData: any) => void;  // Accepting the function as a prop
// }

export default function AssignmentsControl() {
  const [showEditor, setShowEditor] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

// export default function AssignmentsControl({ 
//   assignmentName, 
//   description, 
//   points, 
//   dueDate, 
//   availableFrom, 
//   availableUntil,
//   setAssignmentName, 
//   setDescription, 
//   setPoints, 
//   setDueDate, 
//   setAvailableFrom, 
//   setAvailableUntil, 
//   addAssignment 
// }:{ 
//   assignmentName: string;
//   description: string;
//   points: string;
//   dueDate: string;
//   availableFrom: string;
//   availableUntil: string;
//   setAssignmentName: (name: string) => void;
//   setDescription: (desc: string) => void;
//   setPoints: (points: string) => void;
//   setDueDate: (date: string) => void;
//   setAvailableFrom: (date: string) => void;
//   setAvailableUntil: (date: string) => void;
//   addAssignment: () => void;
// }) {
  // const handleCreate = () => {
  //   createAssignmentForCourse(); // Call the passed function
  // };

  // const [showEditor, setShowEditor] = useState(false);


    return(
      <div id="wd-modules-controls" className="d-flex text-nowrap">
        <div id="wd-css-responsive-forms-2" className="flex-grow-1">
          <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                          <FaMagnifyingGlass />
                      </span>
                <input type="search" className="form-control border-start-0" id="r1" placeholder="Search" style={{width: "50%"}}/>
            </div> 
            </div>
        <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end"
                data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog" >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment</button>
        <button id="wd-view-progress" className="btn btn-lg btn-secondary me-1 float-end">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group</button>
            <AssignmentEditor_22
              dialogTitle="Add Assignment"
              // createAssignmentForCourse={createAssignmentForCourse} // Pass the function to the modal
              onClose={() => setIsModalOpen(false)} 
            />
      
        {/* <AssignmentEditor_22 dialogTitle="Add Assignment" assignmentName={assignmentName} 
        description={description} 
        points={points}
        dueDate={dueDate}
        availableFrom={availableFrom}
        availableUntil={availableUntil}
        setAssignmentName={setAssignmentName}
        setDescription={setDescription}
        setPoints={setPoints}
        setDueDate={setDueDate}
        setAvailableFrom={setAvailableFrom}
        setAvailableUntil={setAvailableUntil}
        createAssignmentForCourse={createAssignmentForCourse} /> */}
      </div>

  );
}