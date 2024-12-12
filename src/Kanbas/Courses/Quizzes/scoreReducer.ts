import { createSlice } from "@reduxjs/toolkit";
import { notEqual } from "assert";

import {useState} from "react";

const initialState = {
    scores: [],
};
const scoresSlice = createSlice({
    name: "scores",
    initialState,
    reducers: {
        setScores: (state, action) => {
          console.log(action.payload, "in set score reducer");
          state.scores = action.payload;
        },
        addScore: (state, { payload: score }) => {
          console.log("Payload received in addScore:", score);
          const newScore: any = {
            _id: score._id, // Include if the quiz already exists (for updates)
            quizId: score.quizId,
            userId: score.userId,
            attempts: score.attempts,
            score: score.score,
          };
          
          state.scores = [...state.scores, newScore] as any;
        },

        addAttempt: (state, { payload: addAttempt }) => {
          console.log("in update reducer", addAttempt);
          state.scores = state.scores.map((score: any) =>
            score._id === addAttempt._id
              ? {
                  ...score,
                  ...addAttempt,
                }
              : score
          ) as any;
        },
    },
});
    

export const { addScore, setScores, addAttempt} =
    scoresSlice.actions;
export default scoresSlice.reducer;
