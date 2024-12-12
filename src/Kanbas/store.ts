import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentReducer from "./Enrollments/reducer"
import quizReducer from "./Courses/Quizzes/reducer";
import questionReducer from "./Courses/Questions/reducer";
import scoreReducer from "./Courses/Quizzes/scoreReducer";


const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentReducer,
    quizReducer,
    questionReducer,
    scoreReducer,
  },
});
export default store;
export {};