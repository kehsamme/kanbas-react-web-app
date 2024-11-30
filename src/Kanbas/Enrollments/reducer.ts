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
//import { enrollments } from "../Database";

const initialState = {
     enrollments: [], 
    //enrollments: enrollments || [], 
};

const enrollmentSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollment: (state, action) => {
            console.log("set enrollments to : " );
            console.timeLog(action.payload);
            state.enrollments = action.payload;
          },
        //   enrollCourse: (state, { payload: enrollment }) => {
        //     console.log("In enrollmentSlice reducer...");
        //     console.log(enrollment);
        //     const newEnrollment: any = {
        //       _id: new Date().getTime().toString(),
        //       userId: enrollment.user,
        //       courseId: enrollment.cid,
        //     };
        //     // state.enrollments.push(newEnrollment);

        //     state.enrollments = [...state.enrollments, newEnrollment] as any;
        //     console.log(state.enrollments);

        // },
        enrollCourse: (state, { payload: enrollment }) => {
            const newEnrollment: any = {
              _id: new Date().getTime().toString(),
              user: enrollment.user,
              course: enrollment.cid
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
          },
        // enrollCourse: (state, action: PayloadAction<{ user: string; cid: string }>) => {
        //     console.log("In enrollmentSlice reducer...");
        //     const { user, cid } = action.payload;
        //     const newEnrollment = {
        //         _id: `${Date.now()}`,
        //         user: user,
        //         course: cid,
        //     };

        //     console.log(newEnrollment);
        //     state.enrollments.push(newEnrollment);

        // },
        // deleteAssignment: (state, { payload: assignmentId }) => {
        //     console.log("in delete assignment reducer...");
        //     state.assignments = state.assignments.filter(
        //       (a: any) => a._id !== assignmentId);
        //   },
        // unenrollCourse:  (state, { payload: enrollment }) => {
        //     state.enrollments = state.enrollments.filter(
        //         (enroll) => !(enroll.user === action.payload.user && enrollment.course === action.payload.course)
        //     );
        // },
        unenrollCourse:  (state, { payload: enrollment }) => {
            // console.log("in unenrollCourse reducer...", enrollment.course);
            // state.enrollments = state.enrollments.filter(
            //   (a: any) => (a.user !== enrollment.user && a.course !== enrollment.course));

            //   console.log(state.enrollments);
        },
    },
});

export const { setEnrollment, enrollCourse, unenrollCourse} = enrollmentSlice.actions;
export default enrollmentSlice.reducer;