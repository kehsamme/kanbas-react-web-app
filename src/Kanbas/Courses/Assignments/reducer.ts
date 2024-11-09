import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
const initialState = {
    assignments: assignments,
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: new Date().getTime().toString(),
        title: assignment.name,
        availability: assignment.availability,
        due: assignment.due,
        points: assignment.points,
        course: assignment.course,
        description: assignment.description
      };
      state.assignments.push(newAssignment);
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId);
    },
    updateAssignment: (state, { payload: updatedAssignment }) => {
      state.assignments = state.assignments.map((assignment: any) => {
          if (assignment._id === updatedAssignment._id) {
              const availableDate = new Date(updatedAssignment.available);
              const dueDate = new Date(updatedAssignment.due);

              const formattedAvailableDate = availableDate.toISOString().split('T')[0];
              const formattedDueDate = dueDate.toISOString().split('T')[0];

              return {
                  ...assignment,
                  ...updatedAssignment,
                  available: formattedAvailableDate,
                  due: formattedDueDate
              };
          }
          return assignment;
      });
  },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;