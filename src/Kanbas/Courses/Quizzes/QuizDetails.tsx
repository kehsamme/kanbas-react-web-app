import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from "react-router";
import { useState } from 'react';
import { setQuizzes, updateQuiz } from "./reducer"; 
import * as coursesClient from "../client";
import { queryByDisplayValue } from '@testing-library/react';
import * as quizzesClient from "./client";

function QuizDetailsScreen() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { quizzes } = useSelector((state: any) => state.quizReducer);


    const fetchQuizzes = async () => {
        const modules = await coursesClient.findQuizForCourse(cid as string);
        dispatch(setQuizzes(modules));
      };
      useEffect(() => {
        fetchQuizzes();
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
    
      useEffect(() => {
        if (quizzes.length > 0 && qid) {
          const selectedQuiz = quizzes.find(
            (quiz: { _id: string }) => quiz._id === qid
          );
          if (selectedQuiz) setQuiz(selectedQuiz);
        }
      }, [quizzes, qid]);
    // const { cid, qid } = useParams();
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const quizzes = useSelector((state: any) => state.quizReducer.quiz);
    // const { currentUser } = useSelector((state: any) => state.accountReducer);
    // const [quiz, setQuiz] = useState(quizzes.filter((quiz: { _id: string, title: string, course: string }) => quiz._id === qid)) 


 

  const handlePreview = () => {
    // Logic to navigate to quiz preview screen
    console.log("Previewing quiz");
  };

  const handleEdit = () => {
    // Logic to navigate to quiz editor screen
    console.log("Editing quiz");
    navigate(`/Kanbas/Courses/${cid}/Quizzes/Detail/Editor/${qid}`);
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
        <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-secondary me-2" onClick={handlePreview}>
                Preview
            </button>
            <button className="btn btn-danger" onClick={handleEdit}>
                Edit
            </button>
        </div>
        <h2>Quiz Details: {quiz.title}</h2>
        <div className="d-flex justify-content-center">
        <table>
            <tbody>
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
      {/* <h2>Quiz Details: {quiz.title}</h2>
      <div className="text-center">
        <p>Quiz Type: {quiz.type}</p>
        <p>Points: {quiz.points}</p>
        <p>Assignment Group: {quiz.group}</p>
        <p>Shuffle Answers: {quiz.shuffleAnswers ? 'Yes' : 'No'}</p>
        <p>Time Limit: {quiz.timelimit} Minutes</p>
        <p>Multiple Attempts: {quiz.multipleAttempts ? 'Yes' : 'No'}</p>
        <p>Show Correct Answers: {quiz.showAnswers ? 'Yes' : 'No'}</p>
        <p>Access Code: {quiz.accessCode || 'Blank'}</p>
        <p>One Question at a Time: {quiz.oneQuestionataTime ? 'Yes' : 'No'}</p>
        <p>Webcam Required: {quiz.webCam ? 'Yes' : 'No'}</p>
        <p>Lock Questions After Answering: {quiz.lockQuestion ? 'Yes' : 'No'}</p>
        <p>Due Date: {new Date(quiz.dueDate).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            })}</p>
        <p>Available Date: {new Date(quiz.availableFromDate).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            })}</p>
        <p>Until Date: {new Date(quiz.availableUntilDate).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            })}</p>
      </div> */}
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-secondary" onClick={() => handlePublishQuiz(qid)}>{quiz.published ? 'Unpublish' : 'Publish'}</button>
        <button className="btn btn-secondary me-2" onClick={handleExit}>Cancel</button>
      </div>
    </div>
  );
}

export default QuizDetailsScreen;


// import React, { useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from "react-router";
// import { useSelector, useDispatch } from "react-redux";
// import { useState } from 'react';
// import { setQuizzes } from "./reducer"; 
// // import { quizzes } from "../../Database";

// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function QuizDetails() {
//     const { cid, qid } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const quizzes = useSelector((state: any) => state.quizReducer.quiz);
//     const { currentUser } = useSelector((state: any) => state.accountReducer);
//     const [quiz, setQuiz] = useState(quizzes.filter((quiz: { _id: string, title: string, course: string }) => quiz._id === qid))


//     // const quizzes = useSelector((state: any) => state.quizReducer.quizzes); 
//     const defaultQuiz = {
//     title: "Quiz",
//     description: "Description",
//     points: 100,
//     assigned_group: "QUIZZES",
//     type: "GRADED",
//     shuffle: "YES",
//     time: 20,
//     multipleAttempts: "NO",
//     showAns: "Immediately",
//     accessCode: "",
//     oneAtATime: "YES",
//     webcam: "NO",
//     lock: "NO",
//     due_date: "2024-11-13",
//     until_date: "2024-11-13",
//     available_date: "2024-11-13"
//     };

//     const { pathname } = useLocation();
//     useEffect(() => {
//         if (pathname.includes("Editor")) {
//             dispatch(setQuizzes(defaultQuiz))
//         } else {
//             const existingQuiz = quizzes.find((q: any) => q._id === qid);
//             if (existingQuiz) {
//                 dispatch(setQuizzes(existingQuiz));
//             }
//         }
//     }, [qid, quiz, dispatch, navigate, cid]);
// //  STILL NEED TO FIX ERROS ON THE QUIZ PATHS AND QUIZ DETAILS

//     return (
    
//         <div className="container mt-4" id="wd-quiz-details">
//             {/* Check if the current user is a student */}
//             {currentUser.role === "STUDENT" ? (
//                 // Render content for students
//                 <>
//                     <h1>{quiz?.title || "Quiz Details"}</h1>
//                     <button className='btn btn-danger btn-lg text-decoration-none text-white'>Take Quiz</button>
//                 </>
//             ) : (
//                 // Render default quiz content for others (e.g., instructors)
//                 <>
//             <h1>{quiz?.title || "Quiz Details"}</h1>
//             <div className="quiz-details">
//                 <div className="quiz-detail">
//                     <strong>Quiz Type:</strong> {quiz?.type}
//                 </div>
//                 <div className="quiz-detail">
//                     <strong>Points:</strong> {quiz?.points}
//                 </div>
//                 <div className="quiz-detail">
//                     <strong>Assignment Group:</strong> {quiz?.assigned_group}
//                 </div>
//                 <div className="quiz-detail">
//                     <strong>Shuffle Answers:</strong> {quiz?.shuffle}
//                 </div>
//                 <div className="quiz-detail">
//                     <strong>Time Limit:</strong> {quiz?.time} minutes
//                 </div>
//                 <div className="quiz-detail">
//                     <strong>Multiple Attempts:</strong> {quiz?.multipleAttempts}
//                 </div>
//                 <div className="quiz-detail">
//                     <strong>Show Correct Answers:</strong> {quiz?.showAns}
//                 </div>
//                 <div className="quiz-detail">
//                     <strong>One Question at a Time:</strong> {quiz?.oneAtATime}
//                 </div>
//                 <div className="quiz-detail">
//                     <strong>Webcam Required:</strong> {quiz?.webcam}
//                 </div>
//                 <div className="quiz-detail">
//                     <strong>Lock Questions After Answering:</strong> {quiz?.lock}
//                 </div>
//             </div>
//             <div className="quiz-dates">
//                 <div className="quiz-date">
//                     <strong>Due:</strong> {quiz?.due_date}
//                 </div>
//                 <div className="quiz-date">
//                     <strong>Available from:</strong> {quiz?.available_date}
//                 </div>
//                 <div className="quiz-date">
//                     <strong>Until:</strong> {quiz?.until_date}
//                 </div>
//             </div>
//             </>
//             )}
//         </div>
//     );
// }

