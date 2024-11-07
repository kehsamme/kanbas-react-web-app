import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAssignment } from "./reducer";

interface AssignmentEditorProps {
  dialogTitle: string;
}

export default function AssignmentEditor_22({ dialogTitle }: AssignmentEditorProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  const handleSave = () => {
    // Dispatch addAssignment action with the form data
    dispatch(
      addAssignment({
        name,
        description,
        points,
        due: dueDate,
        availability: availableFrom,
        course: "RS101", // Replace this with actual course ID if needed
      })
    );

    // Clear the form fields after saving
    setName("");
    setDescription("");
    setPoints("");
    setDueDate("");
    setAvailableFrom("");
    setAvailableUntil("");
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
              value={name}
              placeholder="New Assignment"
              onChange={(e) => setName(e.target.value)}
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
                  value={availableFrom}
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
                  value={availableUntil}
                  placeholder="Available Until"
                  onChange={(e) => setAvailableUntil(e.target.value)}
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
