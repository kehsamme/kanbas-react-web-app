import { createSlice } from "@reduxjs/toolkit";
// import { quizzes } from "../../Database";

import {useState} from "react";


const initialState = {
    questions: [],
};
const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
          console.log(action.payload, "in set question reducer");
          state.questions = action.payload;
        },
        addQuestion: (state, { payload: question }) => {
          console.log("Payload received in addQuestion:", question);
          const newQuestion: any = {
            _id: question._id, // Include if the quiz already exists (for updates)
            number: question.number,
            quiz: question.quiz,
            questionType: question.questionType,
            title: question.title,
            points: question.points,
            options: question.options,
            answers: question.answers,
          };
          
          state.questions = [...state.questions, newQuestion] as any;
        },
        
        deleteQuestion: (state, { payload: questionId }) => {
          console.log("in reducer delete question...", questionId );
            state.questions = state.questions.filter(
                (a: any) => a._id !== questionId);
        },
      
        updateQuestion: (state, { payload: updatedQuestion }) => {
          console.log("in update reducer", updatedQuestion);
          state.questions = state.questions.map((quiz: any) =>
            quiz._id === updatedQuestion._id
              ? {
                  ...quiz,
                  ...updatedQuestion,
                }
              : quiz
          ) as any;
        },
            editQuestion: (state, { payload: questionId }) => {
              state.questions = state.questions.map((a: any) =>
                a._id === questionId ? { ...a, editing: true } : a
              ) as any;
            },
          },
        });
            

export const { addQuestion, deleteQuestion, updateQuestion, editQuestion, setQuestions} =
    questionsSlice.actions;
export default questionsSlice.reducer;

