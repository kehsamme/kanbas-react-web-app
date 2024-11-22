// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type Enrollment = {
//   user: string;
//   course: string;
// };

// type EnrollmentState = {
//   enrollments: Enrollment[];
// };

// const initialState: EnrollmentState = {
//   enrollments: [],
// };

// const enrollmentSlice = createSlice({
//   name: "enrollments",
//   initialState,
//   reducers: {
//     setEnrollments(state, action: PayloadAction<Enrollment[]>) {
//       state.enrollments = action.payload;
//     },
//     enrollCourse(state, action: PayloadAction<Enrollment>) {
//       state.enrollments.push(action.payload);
//     },
//     unenrollCourse(state, action: PayloadAction<{ userId: string; courseId: string }>) {
//       state.enrollments = state.enrollments.filter(
//         (enrollment) =>
//           !(
//             enrollment.user === action.payload.userId &&
//             enrollment.course === action.payload.courseId
//           )
//       );
//     },
//   },
// });

// export const { setEnrollments, enrollCourse, unenrollCourse } =
//   enrollmentSlice.actions;

// export default enrollmentSlice.reducer;



import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
    // enrollments: [], 
    enrollments: enrollments || [], 
};

const enrollmentSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        enrollCourse: (state, action: PayloadAction<{ user: string; cid: string }>) => {
            const { user, cid } = action.payload;
            const newEnrollment = {
                _id: `${Date.now()}`,
                user: user,
                course: cid,
            };
            state.enrollments.push(newEnrollment);
        },
        unenrollCourse: (state, action: PayloadAction<{ user: string; course: string }>) => {
            state.enrollments = state.enrollments.filter(
                (enrollment) => !(enrollment.user === action.payload.user && enrollment.course === action.payload.course)
            );
        },
    },
});

export const { enrollCourse, unenrollCourse } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;