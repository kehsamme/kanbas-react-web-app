import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IoCalendarOutline} from "react-icons/io5";
import {useLocation, useNavigate, useParams} from "react-router";
// import {assignments, quizzes} from "../../Database";
import {useDispatch, useSelector} from "react-redux";
import {addQuiz, setQuizzes, updateQuiz} from "./reducer";
import {addAssignment} from "../Assignments/reducer";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { Link } from 'react-router-dom';


// Is just a duplicate of Quiz Editor FOR NOW

export default function QuestionEditor() {
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
      
      
    // const [quiz, setQuiz] = useState(quizzes.filter((quiz: { _id: string, title: string, course: string }) => quiz._id === qid))
    // const newID = generateAssignmentID(cid, 1, assignments);
    const { pathname } = useLocation();
    const [title, setQuizTitle] = useState("");
    const [type, setQuizType] = useState(""); // e.g., "Graded Quiz"
    const [points, setPoints] = useState(""); // Can be numeric, but initializing as string for input handling
    const [dueDate, setDueDate] = useState(""); // Expected in a date format
    const [availableFromDate, setAvailableFromDate] = useState(""); // Expected in a date format
    const [availableUntilDate, setAvailableUntilDate] = useState(""); // Expected in a date format
    const [questionNumber, setQuestionNumber] = useState(""); // Number of questions in the quiz
    const [group, setGroup] = useState("QUIZZES"); // Default group to "Quizzes"
    const [shuffleAnswers, setShuffleAnswers] = useState(false); // Boolean
    const [timeLimit, setTimeLimit] = useState(""); // Time limit in minutes
    const [multipleAttempts, setMultipleAttempts] = useState(false); // Boolean
    const [showAnswers, setShowAnswers] = useState(""); // When answers are shown
    const [accessCode, setAccessCode] = useState(""); // Optional code for accessing the quiz
    const [oneQuestionataTime, setOneQuestionAtATime] = useState(false); // Boolean
    const [webCam, setWebCam] = useState(false); // Boolean
    const [lockQuestion, setLockQuestion] = useState(false); // Boolean
    const [published, setPublished] = useState(false); // Boolean
    const [responses, setResponses] = useState(""); // Response visibility
    const [viewResult, setViewResult] = useState(false); // Boolean


    const saveQuiz = async (quiz: any) => {
        await quizzesClient.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
      };

    const createQuizForCourse = async (cid: any, quiz_1: any) => {
    // console.log("in createAssignmentForCourse ...");
        //console.log("New assignment_1", assignment_1)

        if (!cid) return;
        //console.log("New assignment: ", assignment_1)
        // const newAssignment = { name: assignmentName, course: cid };
        const quiz = await coursesClient.createQuizForCourse(cid, quiz_1);
        //console.log("New Assignment return from api call:", assignment); // Debug Redux update
        dispatch(addQuiz(quiz));
    };
      
    
    const handleSave = async () => {
        if (
            !quiz.title ||
            // !quiz.points ||
            // !quiz.dueDate ||
            // !quiz.availableFromDate ||
            // !quiz.availableUntilDate ||
             !quiz.type ||
             !quiz.number 
          ) {
            alert("Please fill in all required fields.");
            return;
          }
          const quizData = {
            _id: qid || `${new Date().getTime()}`, // Generate a unique ID for new quizzes
            title: quiz.title,
            type: quiz.type,
            number: quiz.number,
            points: quiz.points,
            group: quiz.group,
            dueDate: new Date(quiz.dueDate).toISOString().split("T")[0] || "",
            availableFromDate: new Date(quiz.availableFromDate).toISOString().split("T")[0] || "",
            availableUntilDate: new Date(quiz.availableUntilDate).toISOString().split("T")[0] || "",
            shuffleAnswers: quiz.shuffleAnswers,
            timeLimit: quiz.timelimit,
            multipleAttempts: quiz.multipleAttempts,
            showAnswers: quiz.showAnswers || "Never",
            responses: quiz.responses || "Never",
            published: quiz.published || false,
          };
          
        const newQuiz = {
            title: title,
            type: type,
            points: Number(points),
            number: `Q${quizzes.length + 1}`,
            dueDate: new Date(quiz.dueDate).toISOString().split("T")[0], // Ensure `dueDate` is properly formatted
            availableFromDate: new Date(quiz.availableFromDate).toISOString().split("T")[0], // Ensure it is properly formatted
            availableUntilDate: new Date(quiz.availableUntilDate).toISOString().split("T")[0], // Ensure it is properly formatted
            courseId: cid,
            questionNumber: Number(questionNumber),
            published: Boolean(published), // Convert to boolean if necessary
            group: group || "QUIZZES", // Default group to "Quizzes" if not provided
            shuffleAnswers: Boolean(shuffleAnswers), // Convert to boolean if necessary
            timelimit: Number(timeLimit), // Convert to number if necessary
            multipleAttempts: Boolean(multipleAttempts), // Convert to boolean if necessary
            showAnswers: showAnswers,
            accessCode: accessCode || "", // Default to empty string if not provided
            oneQuestionataTime: Boolean(oneQuestionataTime), // Convert to boolean
            webCam: Boolean(webCam), // Convert to boolean
            lockQuestion: Boolean(lockQuestion), // Convert to boolean
            responses: responses || "Never", // Default to "Never" if not provided
            viewResult: Boolean(viewResult), // Convert to boolean
          };
          

        if (qid) {
          // If aid exists, update the assignment
          try {
            // dispatch(updateAssignment(assignmentData));
            saveQuiz(quizData);
            //console.log("Assignment updated:", assignmentData);
          } catch (error) {
            console.error("Error updating quiz:", error);
          }
        } else {
          // Else create a new assignment
          try {
            createQuizForCourse(cid, quiz);
            // createAssignmentForCourse(assignmentData)
           // console.log("New assignment created:", assignmentData);
          } catch (error) {
            console.error("Error creating quiz:", error);
          }
        }
      
        // Navigate back to assignments list
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
      };

    

    console.log(quiz)

    return (
        <div className="container mt-4" id="wd-quizzes-editor">
            <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className="nav-link" to={`/Kanbas/Courses/${cid}/Quizzes/Detail/Editor/${qid}`}>Details</Link>
                {/* <a className="nav-link active" href="#">Details</a> */}
            </li>
            <li className="nav-item">
                {/* <a className="nav-link" href="#">Questions</a> */}
                <Link className="nav-link active" to={`/Kanbas/Courses/${cid}/Quizzes/Detail/Editor/Questions/${qid}`}>Questions</Link>
            </li>
        </ul>
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label">Quiz Name</label>
                <input type="text" className="form-control" value={quiz?.title} placeholder="Quiz Name"
                       onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}/>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-description" className="form-label">Description</label>
                <textarea id="wd-description" className="form-control" rows={6} value={quiz?.description} onChange={(e) =>
                    setQuiz({ ...quiz, description: e.target.value })}/>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-points" className="form-label">Points</label>
                <input type="number" id="wd-points" className="form-control" value={quiz?.points} onChange={(e) =>
                    setQuiz({ ...quiz, points: Number(e.target.value) })}/>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-type" className="form-label">Quiz Type</label>
                <select id="wd-type" className="form-select" value={quiz?.type} onChange={(e) =>
                    setQuiz({ ...quiz, type: e.target.value })}>
                <option>Graded Quiz</option>
                    <option>Practice Quiz</option>
                    <option>Graded Survey</option>
                    <option>Ungraded Survey</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-assigned-group" className="form-label">Assignment Group</label>
                <select id="wd-assigned-group" className="form-select" value={quiz?.group} onChange={(e) =>
                    setQuiz({ ...quiz, group: e.target.value })}>
                    <option value="QUIZZES">Quizzes</option>
                    <option value="EXAMS">Exams</option>
                    <option value="ASSIGNMENTS">Assignments</option>
                    <option value="PROJECT">Project</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-shuffle" className="form-label">Shuffle Answers</label>
                <select id="wd-shuffle" className="form-select" value={quiz.shuffleAnswers ? "Yes" : "No"} onChange={(e) =>
                    setQuiz({ ...quiz, shuffleAnswers: e.target.value === "Yes"})}>
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-time" className="form-label">Time Limit (Minutes)</label>
                <input type="number" id="wd-time" className="form-control" value={quiz?.timelimit} onChange={(e) =>
                    setQuiz({ ...quiz, timelimit: Number(e.target.value) })}/>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-multiple-attempts" className="form-label">Allow Multiple Attempts</label>
                <select id="wd-multiple-attempts" className="form-select" value={quiz?.multipleAttempts ? 'Yes' : 'No'} onChange={(e) =>
                    setQuiz({ ...quiz, multipleAttempts: e.target.value === 'Yes' })}>
                    <option>No</option>
                    <option>Yes</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-show-answers" className="form-label">Show Correct Answers</label>
                <select id="wd-show-answers" className="form-select" value={quiz?.showAnswers} onChange={(e) =>
                    setQuiz({ ...quiz, showAnswers: e.target.value })}>
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-access-code" className="form-label">Access Code</label>
                <input type="text" id="wd-access-code" className="form-control" value={quiz?.accessCode} onChange={(e) =>
                    setQuiz({ ...quiz, accessCode: e.target.value })}/>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-one-at-a-time" className="form-label">One Question at a Time</label>
                <select id="wd-one-at-a-time" className="form-select" value={quiz?.oneQuestionataTime ? 'Yes' : 'No'} onChange={(e) =>
                    setQuiz({ ...quiz, oneQuestionataTime: e.target.value === 'Yes' })}>
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-webcam" className="form-label">Webcam Required</label>
                <select id="wd-webcam" className="form-select" value={quiz?.webCam ? 'Yes' : 'No'} onChange={(e) =>
                    setQuiz({ ...quiz, webCam: e.target.value === 'Yes' })}>
                    <option>No</option>
                    <option>Yes</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-lock" className="form-label">Lock Questions After Answering</label>
                <select id="wd-lock" className="form-select" value={quiz?.lockQuestion ? 'Yes' : 'No'} onChange={(e) =>
                    setQuiz({ ...quiz, lockQuestion: e.target.value === 'Yes' })}>
                <option>No</option>
                    <option>Yes</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-due-date" className="form-label">Due Date </label>
                <input type="date" id="wd-due-date" className="form-control" value={quiz?.dueDate.split('T')[0]} onChange={(e) =>
                    setQuiz({ ...quiz, dueDate: e.target.value })}/>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-available-date" className="form-label">Available From</label>
                <input type="date" id="wd-available-date" className="form-control" value={quiz?.availableFromDate.split('T')[0]} onChange={(e) =>
                    setQuiz({ ...quiz, availableFromDate: e.target.value })}/>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-until-date" className="form-label">Until</label>
                <input type="date" id="wd-until-date" className="form-control" value={quiz?.availableUntilDate.split('T')[0]} onChange={(e) =>
                    setQuiz({ ...quiz, availableUntilDate: e.target.value })}/>
            </div>

            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-secondary me-2" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/Detail/${qid}`)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}

