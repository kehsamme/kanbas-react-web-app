import { createSlice } from "@reduxjs/toolkit";
// import { assignments } from "../../Database";
const initialState = {
    assignments: [],
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, { payload: assignment }) => {
      console.log("Payload received in addAssignment:", assignment);

      const newAssignment: any = {
        _id: assignment._id,
        title: assignment.title,
        availability: assignment.availability,
        due: assignment.due,
        points: assignment.points,
        course: assignment.course,
        description: assignment.description
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
     // console.log("in delete assignment reducer...");
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId);
    },
    updateAssignment: (state, { payload: updatedAssignment }) => {
      state.assignments = state.assignments.map((assignment: any) =>
        assignment._id === updatedAssignment._id
          ? {
              ...assignment,
              ...updatedAssignment,
              available: new Date(updatedAssignment.availability)
                .toISOString()
                .split("T")[0],
              due: new Date(updatedAssignment.due).toISOString().split("T")[0],
            }
          : assignment
      ) as any;
    },
    
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment, setAssignments } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;