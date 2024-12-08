import { createSlice } from "@reduxjs/toolkit";
// import { quizzes } from "../../Database";

import {useState} from "react";

const initialState = {
    quizzes: [] as any [],
    quiz: {
      title: "Quiz",
      description: "Description",
      points: 100,
      assigned_group: "QUIZZES",
      type: "GRADED",
      shuffle: "YES",
      time: 20,
      multipleAttempts: "NO",
      showAns: "NO",
      accessCode: "",
      oneAtATime: "YES",
      webcam: "NO",
      lock: "NO",
      due_date: "2024-11-13",
      until_date: "2024-11-13",
      available_date: "2024-11-13"
  },
};
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuiz: (state, action) => {
            state.quizzes = action.payload;
        },
        setQuizzes: (state, action) => {
          state.quizzes = action.payload;
        },
        addQuiz: (state, action) => {
          state.quizzes = [
              { ...action.payload, _id: new Date().getTime().toString() },
              ...state.quizzes,
          ];
        },
        // addQuiz: (state, { payload: quiz }) => {
        //     console.log("Payload received in addQuiz:", quiz);

        //     const newQuiz: any = {
        //         _id: new Date().getTime().toString(),
        //         title: quiz.title,
        //         description: quiz.title,
        //         points: quiz.points,
        //         assigned_group: quiz.assigned_group,
        //         type: quiz.type,
        //         shuffle: quiz.shuffle,
        //         time: quiz.time,
        //         multipleAttempts: quiz.multipleAttempts,
        //         showAns: quiz.showAns,
        //         accessCode: quiz.accessCode,
        //         oneAtATime: quiz.oneAtATime,
        //         webcam: quiz.accessCode,
        //         lock: quiz.lock,
        //         due_date: quiz.due_date,
        //         until_date: quiz.until_date,
        //         available_date: quiz.available_date,
        //         // course: quiz.course,
        //     };
        //       state.quizzes = [...state.quizzes, newQuiz] as any;
        // },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
                (a: any) => a._id !== quizId);
        },
        updateQuiz: (state, action) => {
          state.quizzes = state.quizzes.map((quiz) => {
              if (quiz._id === action.payload._id) {
                  return action.payload;
              } else {
                  return quiz;
              }
          });
        },
        // updateQuiz: (state, { payload: updatedQuiz }) => {
        //     state.quizzes = state.quizzes.map((quiz: any) =>
        //         quiz._id === updatedQuiz._id
        //           ? {
        //               ...quiz,
        //               ...updatedQuiz,
        //               available: new Date(updatedQuiz.available_date)
        //                 .toISOString()
        //                 .split("T")[0],
        //               due: new Date(updatedQuiz.due_date).toISOString().split("T")[0],
        //             }
        //           : quiz
        //       ) as any;
        //     },
            
            editQuiz: (state, { payload: quizId }) => {
              state.quizzes = state.quizzes.map((a: any) =>
                a._id === quizId ? { ...a, editing: true } : a
              ) as any;
            },
          },
        });
            

export const { addQuiz, deleteQuiz, updateQuiz, setQuiz, editQuiz, setQuizzes} =
    quizzesSlice.actions;
export default quizzesSlice.reducer;

// quiz: {
//     title: "Quiz",
//     description: "Description",
//     points: 100,
//     assigned_group: "QUIZZES",
//     type: "GRADED",
//     shuffle: "YES",
//     time: 20,
//     multipleAttempts: "NO",
//     showAns: "NO",
//     accessCode: "",
//     oneAtATime: "YES",
//     webcam: "NO",
//     lock: "NO",
//     due_date: "2024-11-13",
//     until_date: "2024-11-13",
//     available_date: "2024-11-13" }