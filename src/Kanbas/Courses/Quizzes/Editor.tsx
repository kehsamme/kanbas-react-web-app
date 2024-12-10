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




export default function QuizEditor() {
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
          
        // const quizData = {
        //     _id: qid || `${quizzes.length + 1}`, // Include _id only if it's an update
        //     number: quiz.number || `Q${quizzes.length + 1}`, // Generate a number if not provided
        //     courseId: quiz.courseId,
        //     title: quiz.title,
        //     type: quiz.type,
        //     points: quiz.points,
        //     questionNumber: quiz.questionNumber || 0,
        //     published: quiz.published || false,
        //     group: quiz.group || "Quizzes",
        //     shuffleAnswers: quiz.shuffleAnswers || false,
        //     timelimit: quiz.timelimit || 0,
        //     multipleAttempts: quiz.multipleAttempts || false,
        //     showAnswers: quiz.showAnswers || "Never",
        //     accessCode: quiz.accessCode || "",
        //     oneQuestionataTime: quiz.oneQuestionataTime || false,
        //     webCam: quiz.webCam || false,
        //     lockQuestion: quiz.lockQuestion || false,
        //     // dueDate: new Date(quiz.dueDate).toISOString().split("T")[0],
        //     // availableFromDate: new Date(quiz.availableFromDate).toISOString().split("T")[0],
        //     // availableUntilDate: new Date(quiz.availableUntilDate).toISOString().split("T")[0],
        //     dueDate: quiz.dueDate
        //     ? new Date(quiz.dueDate).toISOString().split("T")[0]
        //     : "",
        //     availableFromDate: quiz.availableFromDate
        //     ? new Date(quiz.availableFromDate).toISOString().split("T")[0]
        //     : "",
        //     availableUntilDate: quiz.availableUntilDate
        //     ? new Date(quiz.availableUntilDate).toISOString().split("T")[0]
        //     : "",
        //     responses: quiz.responses || "Never",
        //     viewResult: quiz.viewResult || false,
        // };
        // console.log("testing date quiz", quiz.dueDate, quiz.availableFromDate, quiz.availableToDate)
        
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

    // // OLD STUFF IGNORE
    // const createQuizForCourse = async (cid: any, quiz_1: any) => {
    //      if (!cid) return;
    //      //console.log("New assignment: ", assignment_1)
    //      // const newAssignment = { name: assignmentName, course: cid };
    //      const quiz = await coursesClient.createQuizForCourse(cid, quiz_1);
    //      //console.log("New Assignment return from api call:", assignment); // Debug Redux update
    //      dispatch(addQuiz(quiz));
    //    };

    // const { pathname } = useLocation();
    // const quiz = useSelector((state: any) => state.quizReducer.quiz);
    // const defaultQuiz = {
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
    // };

    // useEffect(() => {
    //     if (pathname.includes("Editor")) {
    //         dispatch(setQuiz(defaultQuiz))
    //     } else {
    //         const existingQuiz = quizzes.find((q) => q._id === qid);
    //         if (existingQuiz) {
    //             dispatch(setQuiz(existingQuiz));
    //         }
    //     }
    // }, [qid, dispatch]);
    
    // const handleSave = () => {
    //     if (pathname.includes("Editor")){
    //         // createQuizForCourse(cid, newAssignment); 
    //         dispatch(addQuiz({...quiz, course: cid}));
    //     } else {
    //         dispatch(updateQuiz(quiz))
    //     }
    //     navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    // };
    

    console.log(quiz)

    return (
        <div className="container mt-4" id="wd-quizzes-editor">
            <h2>Edit Quiz</h2>

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

// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { IoCalendarOutline } from "react-icons/io5";
// import { useLocation, useNavigate, useParams } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { addQuiz, setQuizzes, updateQuiz } from "./reducer";
// import * as coursesClient from "../client";
// import * as quizzesClient from "./client";

// export default function QuizEditor() {
//     const { cid, qid } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { quizzes } = useSelector((state) => state.quizReducer);

//     const fetchQuizzes = async () => {
//         const modules = await coursesClient.findQuizForCourse(cid);
//         dispatch(setQuizzes(modules));
//     };

//     useEffect(() => {
//         fetchQuizzes();
//     }, []);

//     useEffect(() => {
//         const newQuiz = quizzes.find((quiz) => quiz._id === qid);
//         if (newQuiz) setQuiz(newQuiz);
//     }, [quizzes, qid]);

//     const [quiz, setQuiz] = useState({
//         title: "",
//         description: "",
//         points: 0,
//         type: "Graded Quiz",
//         published: true,
//         group: "Quizzes",
//         shuffleAnswers: false,
//         timelimit: 0,
//         multipleAttempts: false,
//         showAnswers: "Never",
//         accessCode: "",
//         oneQuestionAtATime: false,
//         webCam: false,
//         lockQuestion: false,
//         dueDate: "",
//         availableFromDate: "",
//         availableUntilDate: "",
//         responses: "Never",
//         viewResult: false,
//         questionNumber: 0
//     });

//     const saveQuiz = async (module) => {
//         await quizzesClient.updateQuiz(module);
//         dispatch(updateQuiz(module));
//     };

//     const createQuizForCourse = async (cid, quiz_1) => {
//         if (!cid) return;
//         const quiz = await coursesClient.createQuizForCourse(cid, quiz_1);
//         dispatch(addQuiz(quiz));
//     };

//     const handleSave = async () => {
//         if (!quiz.title) {
//             alert("Please fill in all required fields.");
//             return;
//         }
//         const quizData = {
//             _id: qid || `${new Date().getTime()}`,
//             title: quiz.title,
//             type: quiz.type,
//             points: quiz.points,
//             group: quiz.group,
//             dueDate: quiz.dueDate || "",
//             availableFromDate: quiz.availableFromDate || "",
//             availableUntilDate: quiz.availableUntilDate || "",
//             shuffleAnswers: quiz.shuffleAnswers,
//             timeLimit: quiz.timelimit,
//             multipleAttempts: quiz.multipleAttempts,
//             showAnswers: quiz.showAnswers || "Never",
//             responses: quiz.responses || "Never",
//             published: quiz.published || false,
//         };

//         const newQuiz = {
//             title: quiz.title,
//             type: quiz.type,
//             points: Number(quiz.points),
//             dueDate: quiz.dueDate,
//             availableFromDate: quiz.availableFromDate,
//             availableUntilDate: quiz.availableUntilDate,
//             courseId: cid,
//             questionNumber: Number(quiz.questionNumber),
//             published: Boolean(quiz.published),
//             group: quiz.group || "QUIZZES",
//             shuffleAnswers: Boolean(quiz.shuffleAnswers),
//             timelimit: Number(quiz.timelimit),
//             multipleAttempts: Boolean(quiz.multipleAttempts),
//             showAnswers: quiz.showAnswers,
//             accessCode: quiz.accessCode || "",
//             oneQuestionAtATime: Boolean(quiz.oneQuestionAtATime),
//             webCam: Boolean(quiz.webCam),
//             lockQuestion: Boolean(quiz.lockQuestion),
//             responses: quiz.responses || "Never",
//             viewResult: Boolean(quiz.viewResult),
//         };

//         if (qid) {
//             try {
//                 saveQuiz(quizData);
//             } catch (error) {
//                 console.error("Error updating quiz:", error);
//             }
//         } else {
//             try {
//                 createQuizForCourse(cid, newQuiz);
//             } catch (error) {
//                 console.error("Error creating quiz:", error);
//             }
//         }

//         navigate(`/Kanbas/Courses/${cid}/Quizzes`);
//     };

//     return (
//         <div className="container mt-4" id="wd-quizzes-editor">
//             <h2>Edit Quiz</h2>

//             <div className="mb-3">
//                 <label htmlFor="wd-name" className="form-label">Quiz Name</label>
//                 <input type="text" className="form-control" value={quiz.title} placeholder="Quiz Name"
//                        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-description" className="form-label">Description</label>
//                 <textarea id="wd-description" className="form-control" rows={6} value={quiz.description} onChange={(e) =>
//                     setQuiz({ ...quiz, description: e.target.value })} />
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-points" className="form-label">Points</label>
//                 <input type="number" id="wd-points" className="form-control" value={quiz.points} onChange={(e) =>
//                     setQuiz({ ...quiz, points: e.target.value })} />
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-type" className="form-label">Quiz Type</label>
//                 <select id="wd-type" className="form-select" value={quiz.type} onChange={(e) =>
//                     setQuiz({ ...quiz, type: e.target.value })}>
//                     <option>Graded Quiz</option>
//                     <option>Practice Quiz</option>
//                     <option>Graded Survey</option>
//                     <option>Ungraded Survey</option>
//                 </select>
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-shuffle" className="form-label">Shuffle Answers</label>
//                 <select id="wd-shuffle" className="form-select" value={quiz.shuffleAnswers ? "Yes" : "No"} onChange={(e) =>
//                     setQuiz({ ...quiz, shuffleAnswers: e.target.value === "Yes" })}>
//                     <option>Yes</option>
//                     <option>No</option>
//                 </select>
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-time" className="form-label">Time Limit (Minutes)</label>
//                 <input type="number" id="wd-time" className="form-control" value={quiz.timelimit} onChange={(e) =>
//                     setQuiz({ ...quiz, timelimit: e.target.value })} />
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-multiple-attempts" className="form-label">Allow Multiple Attempts</label>
//                 <select id="wd-multiple-attempts" className="form-select" value={quiz.multipleAttempts ? "Yes" : "No"} onChange={(e) =>
//                     setQuiz({ ...quiz, multipleAttempts: e.target.value === "Yes" })}>
//                     <option>Yes</option>
//                     <option>No</option>
//                 </select>
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-show-answers" className="form-label">Show Correct Answers</label>
//                 <select id="wd-show-answers" className="form-select" value={quiz.showAnswers} onChange={(e) =>
//                     setQuiz({ ...quiz, showAnswers: e.target.value })}>
//                     <option>Never</option>
//                     <option>Always</option>
//                     <option>After Attempt</option>
//                 </select>
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-access-code" className="form-label">Access Code</label>
//                 <input type="text" id="wd-access-code" className="form-control" value={quiz.accessCode} onChange={(e) =>
//                     setQuiz({ ...quiz, accessCode: e.target.value })} />
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-one-at-a-time" className="form-label">One Question at a Time</label>
//                 <select id="wd-one-at-a-time" className="form-select" value={quiz.oneQuestionAtATime ? "Yes" : "No"} onChange={(e) =>
//                     setQuiz({ ...quiz, oneQuestionAtATime: e.target.value === "Yes" })}>
//                     <option>Yes</option>
//                     <option>No</option>
//                 </select>
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-webcam" className="form-label">Webcam Required</label>
//                 <select id="wd-webcam" className="form-select" value={quiz.webCam ? "Yes" : "No"} onChange={(e) =>
//                     setQuiz({ ...quiz, webCam: e.target.value === "Yes" })}>
//                     <option>No</option>
//                     <option>Yes</option>
//                 </select>
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-lock" className="form-label">Lock Questions After Answering</label>
//                 <select id="wd-lock" className="form-select" value={quiz.lockQuestion ? "Yes" : "No"} onChange={(e) =>
//                     setQuiz({ ...quiz, lockQuestion: e.target.value === "Yes" })}>
//                     <option>No</option>
//                     <option>Yes</option>
//                 </select>
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-due-date" className="form-label">Due Date</label>
//                 <input type="date" id="wd-due-date" className="form-control" value={quiz.dueDate} onChange={(e) =>
//                     setQuiz({ ...quiz, dueDate: e.target.value })} />
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-available-date" className="form-label">Available From</label>
//                 <input type="date" id="wd-available-date" className="form-control" value={quiz.availableFromDate} onChange={(e) =>
//                     setQuiz({ ...quiz, availableFromDate: e.target.value })} />
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="wd-until-date" className="form-label">Until</label>
//                 <input type="date" id="wd-until-date" className="form-control" value={quiz.availableUntilDate} onChange={(e) =>
//                     setQuiz({ ...quiz, availableUntilDate: e.target.value })} />
//             </div>

//             <div className="d-flex justify-content-end mb-3">
//                 <button className="btn btn-secondary me-2" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}>Cancel</button>
//                 <button className="btn btn-danger" onClick={handleSave}>Save</button>
//             </div>
//         </div>
//     );
// }
