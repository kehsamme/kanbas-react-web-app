import { createSlice } from "@reduxjs/toolkit";
// import { quizzes } from "../../Database";

import {useState} from "react";

const initialState = {
    quizzes: [],
  //   quiz: {
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
  //     available_date: "2024-11-13"
  // },
};
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
          console.log(action.payload, "in set quiz reducer");
          state.quizzes = action.payload;
        },
        addQuiz: (state, { payload: quiz }) => {
          console.log("Payload received in addQuiz:", quiz);
          const newQuiz: any = {
            _id: quiz._id, // Include if the quiz already exists (for updates)
            number: quiz.number,
            courseId: quiz.courseId,
            title: quiz.title,
            type: quiz.type,
            points: quiz.points,
            questionNumber: quiz.questionNumber,
            published: quiz.published,
            group: quiz.group,
            shuffleAnswers: quiz.shuffleAnswers,
            timelimit: quiz.timelimit,
            multipleAttempts: quiz.multipleAttempts,
            showAnswers: quiz.showAnswers,
            accessCode: quiz.accessCode,
            oneQuestionataTime: quiz.oneQuestionataTime,
            webCam: quiz.webCam,
            lockQuestion: quiz.lockQuestion,
            dueDate: quiz.dueDate,
            availableFromDate: quiz.availableFromDate,
            availableUntilDate: quiz.availableUntilDate,
            responses: quiz.responses,
            viewResult: quiz.viewResult,
          };
          
          state.quizzes = [...state.quizzes, newQuiz] as any;
        },
        
        deleteQuiz: (state, { payload: quizId }) => {
          console.log("in reducer delete quiz...", quizId );
            state.quizzes = state.quizzes.filter(
                (a: any) => a._id !== quizId);
        },
        // updateQuiz: (state, action) => {
        //   state.quizzes = state.quizzes.map((quiz) => {
        //       if (quiz._id === action.payload._id) {
        //           return action.payload;
        //       } else {
        //           return quiz;
        //       }
        //   });
        // },
        updateQuiz: (state, { payload: updatedQuiz }) => {
          console.log("in update reducer", updatedQuiz);
          state.quizzes = state.quizzes.map((quiz: any) =>
            quiz._id === updatedQuiz._id
              ? {
                  ...quiz,
                  ...updatedQuiz,
                  // available: new Date(updatedQuiz.availableFromDate)
                  //   .toISOString()
                  //   .split("T")[0],
                  // until: new Date(updatedQuiz.availableUntilDate)
                  // .toISOString()
                  // .split("T")[0],
                  // due: new Date(updatedQuiz.dueDate).toISOString().split("T")[0],
                }
              : quiz
          ) as any;
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
            

export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes} =
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