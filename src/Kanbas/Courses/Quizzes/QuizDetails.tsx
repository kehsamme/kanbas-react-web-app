import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from "react-router";
import { useState } from 'react';
import { setQuizzes, updateQuiz } from "./reducer"; 
import * as coursesClient from "../client";
import { queryByDisplayValue } from '@testing-library/react';
import * as quizzesClient from "./client";
import {setScores, addScore, addAttempt } from "./scoreReducer";
import * as scoresClient from "./scoresClient";

function QuizDetailsScreen() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const { scores } = useSelector((state: any) => state.scoreReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchQuizzes = async () => {
        const modules = await coursesClient.findQuizForCourse(cid as string);
        dispatch(setQuizzes(modules));
      };
      useEffect(() => {
        fetchQuizzes();
      }, []);

    const fetchScores = async () => {
      const score = await scoresClient.getScores();
      dispatch(setScores(score));
    };
    useEffect(() => {
      fetchScores();
    }, []);
    
    useEffect(() => {
        console.log("in editor",quizzes, quizzes.filter((quiz: { _id: string, title: string, course: string }) => quiz._id === qid))
        const newQuiz = quizzes.filter((quiz: { _id: string, title: string, course: string }) => quiz._id === qid)[0] ?? {
            title: "",
            description: "",
            points: 0,
            type: "Graded Quiz",
            published: true,
            group: "QUIZZES",
            number: `Q${quizzes.length + 1}`,
            shuffleAnswers: false,
            timelimit: 0,
            multipleAttempts: false,
            numAttempts: 1,
            showAnswers: "Never",
            accessCode: "",
            oneQuestionataTime: false,
            webCam: false,
            lockQuestion: false,
            dueDate: "",
            availableFromDate: "",
            availableUntilDate: "",
            responses: "Never",
            viewResult: false,
            questionNumber: 0,
            courseId: cid
        }
        setQuiz(newQuiz)
      }, [quizzes]);

      useEffect(() => {
        const newScore = scores.filter((score: { _id: string, userId: string, quizId: string }) => score.quizId === qid && score.userId == currentUser.uid)[0] ?? {
            userId: "",
            quizId: "",
            attempts: 0,
            score: 0,
        }
        setScore(newScore)
      }, [scores]);
    
    // Initialize state with assignment values
    const [quiz, setQuiz] = useState({
        title: "",
        description: "",
        points: 0,
        type: "Graded Quiz",
        published: true,
        group: "QUIZZES",
        number: `Q${quizzes.length + 1}`,
        shuffleAnswers: false,
        timelimit: 0,
        multipleAttempts: false,
        numAttempts: 1,
        showAnswers: "Never",
        accessCode: "",
        oneQuestionataTime: false,
        webCam: false,
        lockQuestion: false,
        dueDate: "",
        availableFromDate: "",
        availableUntilDate: "",
        responses: "Never",
        viewResult: false,
        questionNumber: 0,
        courseId: cid
    });

    const [score, setScore] = useState({
      userId: "",
      quizId: "",
      attempts: 0,
      score: 0,
    });
    
      useEffect(() => {
        if (quizzes.length > 0 && qid) {
          const selectedQuiz = quizzes.find(
            (quiz: { _id: string }) => quiz._id === qid
          );
          if (selectedQuiz) setQuiz(selectedQuiz);
        }
      }, [quizzes, qid]);

      useEffect(() => {
        if (qid) {
          const usersScore = scores.find(
            (score: {quizId: string, userId: string}) => score.quizId === qid && score.userId === currentUser._id
          );
          if (usersScore) {
            console.log("retrieved user's score");
            setScore(usersScore)
          } 
          else {
            console.log("couldn't find user's score");
            const newScore = {
              userId: currentUser.id,
              quizId: qid,
              attempts: 0,
              score: 0,
            };
            addScore(newScore);
          };
        } else {
          
        }
      }, [scores]);
 

  const handlePreview = () => {
    // Logic to navigate to quiz preview screen
    console.log("Previewing quiz");
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Detail/Preview`);

  };

  const startQuizForUser = async (quiz: any) => {
    try {
      // Find the user's score for the current quiz
      const existingScore = scores.find(
        (score: { _id: string; userId: string; quizId: string }) =>
          score.userId === currentUser._id && score.quizId === qid
      );
  
      if (existingScore) {
        console.log("updating num attempts")
        // Increment the attempts if the score exists
        const updatedScore = {
          ...existingScore,
          attempts: existingScore.attempts + 1,
        };
  
        // Update the score in the backend
        await scoresClient.update(updatedScore, existingScore._id);
  
        // Dispatch the updated score to Redux
        dispatch(addAttempt(updatedScore));
        console.log("Score updated successfully:", updatedScore);
      } else {
        // Create a new score if it doesn't exist
        const newScore = {
          quizId: qid,
          userId: currentUser._id,
          attempts: 1, // First attempt
          score: 0,    // Initial score
        };
  
        // Save the new score to the backend
        const createdScore = await scoresClient.add(newScore);
  
        // Dispatch the new score to Redux
        dispatch(addScore(createdScore));
        console.log("New score created successfully:", createdScore);
      }
  
      // Navigate to the quiz preview screen
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Detail/Preview`);
    } catch (error) {
      console.error("Error starting quiz:", error);
    }
  };  

  const handleEdit = () => {
    // Logic to navigate to quiz editor screen
    console.log("Editing quiz");
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Detail/Editor`);
  };
  const handleExit = () => {
    // Logic to navigate to quiz editor screen
    console.log("Exiting quiz detail");
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };
  const saveQuiz = async (quiz: any) => {
    try {
      // Call the API to update the quiz on the server
      await quizzesClient.updateQuiz(quiz);
  
      // After successful save, dispatch update to Redux state
      dispatch(updateQuiz(quiz));
    } catch (error) {
      console.error("Error saving quiz:", error);
      // Optionally, handle the error, show a message, etc.
    }
  };
  
  const handlePublishQuiz = async (quizId: any) => {
    const updatedQuiz = quizzes.find((quiz: any) => quiz._id === quizId);
    if (updatedQuiz) {
        const updatedQuizData = { ...updatedQuiz, published: !updatedQuiz.published };
        await saveQuiz(updatedQuizData); 
      // Dispatch the update action to save the changes in the Redux store
      dispatch(updateQuiz(updatedQuizData));
    }
    console.log("Publishing quiz from quiz details");
  };
  


  return (
    <div>
      {currentUser.role === "FACULTY" ? (
        <div>
          <div className="d-flex justify-content-center align-items-center">
              <button className="btn btn-secondary me-2" onClick={handlePreview}>
                  Preview
              </button>
              <button className="btn btn-danger" onClick={handleEdit}>
                  Edit
              </button>
          </div>
          <div className="d-flex justify-content-center">
          <table>
              <tbody>
                <tr>
                  <td>
                  <h3>Quiz Details: </h3>
                  </td>
                </tr>
              <tr>
                  <td><strong>Quiz Title:</strong></td>
                  <td>{quiz.title}</td>
              </tr>
              <tr>
                  <td><strong>Quiz Type:</strong></td>
                  <td>{quiz.type}</td>
              </tr>
              <tr>
                  <td><strong>Points:</strong></td>
                  <td>{quiz.points}</td>
              </tr>
              <tr>
                  <td><strong>Assignment Group:</strong></td>
                  <td>{quiz.group}</td>
              </tr>
              <tr>
                  <td><strong>Shuffle Answers:</strong></td>
                  <td>{quiz.shuffleAnswers ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                  <td><strong>Time Limit:</strong></td>
                  <td>{quiz.timelimit} Minutes</td>
              </tr>
              <tr>
                  <td><strong>Multiple Attempts:</strong></td>
                  <td>{quiz.multipleAttempts ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                  <td><strong>Attempts:</strong></td>
                  <td>{quiz.numAttempts}</td>
              </tr>
              <tr>
                  <td><strong>Show Correct Answers:</strong></td>
                  <td>{quiz.showAnswers ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                  <td><strong>Access Code:</strong></td>
                  <td>{quiz.accessCode || 'Blank'}</td>
              </tr>
              <tr>
                  <td><strong>One Question at a Time:</strong></td>
                  <td>{quiz.oneQuestionataTime ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                  <td><strong>Webcam Required:</strong></td>
                  <td>{quiz.webCam ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                  <td><strong>Lock Questions After Answering:</strong></td>
                  <td>{quiz.lockQuestion ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                  <td><strong>Due Date:</strong></td>
                  <td>{new Date(quiz.dueDate).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                      })}</td>
              </tr>
              <tr>
                  <td><strong>Available Date:</strong></td>
                  <td>{new Date(quiz.availableFromDate).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                      })}</td>
              </tr>
              <tr>
                  <td><strong>Until Date:</strong></td>
                  <td>{new Date(quiz.availableUntilDate).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                      })}</td>
              </tr>
              </tbody>
          </table>
        </div>
      
        <div className="d-flex justify-content-center align-items-center">
          <button className="btn btn-secondary me-2" onClick={() => handlePublishQuiz(qid)}>{quiz.published ? 'Unpublish' : 'Publish'}</button>
          <button className="btn btn-secondary me-2" onClick={handleExit}>Back</button>
        </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center" onClick={() => startQuizForUser(qid)}>
          
          {quiz.numAttempts > score.attempts ? 
            <div>
              <p>Number of attempts: {score.attempts}/{quiz.numAttempts}</p>
              <button className="btn btn-secondary me-2">
                Start Quiz
              </button> 
            </div> : 
            <p>Number of attempts: {score.attempts}/{quiz.numAttempts}, Score: {score.score}</p>
        }
          
        </div>
      )}
      
    </div>
  );
}

export default QuizDetailsScreen;

