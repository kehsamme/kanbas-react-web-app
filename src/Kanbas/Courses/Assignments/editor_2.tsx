import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentsClient from "./client";
import { useParams } from "react-router";


// interface AssignmentEditorProps {
//   dialogTitle: string;
// }

export default function AssignmentEditor_22({ 
    dialogTitle,
    onClose,
  }: {
    dialogTitle: string;
    onClose: () => void;
  }) {
    const { cid } = useParams();
    
    const createAssignmentForCourse = async (assignment_1: any) => {
     // console.log("in createAssignmentForCourse ...");
      //console.log("New assignment_1", assignment_1)

      if (!cid) return;
      //console.log("New assignment: ", assignment_1)
      // const newAssignment = { name: assignmentName, course: cid };
      const assignment = await assignmentsClient.createAssignmentForCourse(assignment_1);
      //console.log("New Assignment return from api call:", assignment); // Debug Redux update
      dispatch(addAssignment(assignment));
    };
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setAssignmentName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [availability, setAvailableFrom] = useState("");
  // const [availableUntil, setAvailableUntil] = useState("");

  // // Populate state when editing
  // useEffect(() => {
  //   if (mode === "edit" && assignment) {
  //     setAssignmentName(assignment.title || "");
  //     setDescription(assignment.description || "");
  //     setPoints(assignment.points || "");
  //     setDueDate(assignment.due || "");
  //     setAvailableFrom(assignment.availableFrom || "");
  //     setAvailableUntil(assignment.availableUntil || "");
  //   }
  // }, [mode, assignment]);

  

  const handleSave = () => {
    if (!title || !points || !dueDate) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const newAssignment = {
      title,
      description: description,
      points: Number(points),
      due: dueDate,
      availability: availability,
      course: cid
    };
  
    //console.log("handleSave Assignment Data??:", newAssignment);
  
    createAssignmentForCourse(newAssignment); // Log output here
    //console.log("Assignment handle saved:", newAssignment);
  
    onClose();
  };


    

  return (
    <div id="wd-add-module-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <label htmlFor="a-name">Assignment Name</label>
            <input
              className="form-control mb-3"
              id="a-name"
              value={title}
              placeholder="New Assignment"
              onChange={(e) => setAssignmentName(e.target.value)}
            />

            <textarea
              className="form-control mb-3"
              id="a-description"
              value={description}
              placeholder="New Assignment Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="row">
              <div className="col d-flex align-items-center">
                <label htmlFor="a-points" className="me-2">Points</label>
                <input
                  className="form-control"
                  id="a-points"
                  value={points}
                  placeholder="Points"
                  onChange={(e) => setPoints(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <br />
            <div className="mb-3">
              <label htmlFor="a-due">Due Date</label>
              <input
                className="form-control"
                id="a-due"
                value={dueDate}
                placeholder="Due Date"
                onChange={(e) => setDueDate(e.target.value)}
                type="date"
              />
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="a-available-from">Available From</label>
                <input
                  className="form-control"
                  id="a-available-from"
                  value={availability}
                  placeholder="Available From"
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  type="date"
                />
              </div>
              <div className="col">
                <label htmlFor="a-available-until">Available Until</label>
                <input
                  className="form-control"
                  id="a-available-until"
                  value={dueDate}
                  placeholder="Available Until"
                  onChange={(e) => setDueDate(e.target.value)}
                  type="date"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleSave}
            >
              Save Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
