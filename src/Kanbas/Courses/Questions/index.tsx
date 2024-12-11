import { useParams } from "react-router";
import { BsGripVertical } from "react-icons/bs";
import QuizControlButtons from "../Quizzes/QuizControlButtons";
import AssignmentPrefixButtons from "../Assignments/AssignmentPercentButtons";
import React  from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AssignmentIndivButtons from "../Assignments/AssignmentControlsButtons";
import {FaPlus} from "react-icons/fa";
import LessonControlButtons from "../Modules/LessonControlButtons";
import * as db from "../../Database";
import * as quizzesClient from "../Quizzes/client";
import * as coursesClient from "../client";
import * as questionsClient from "../Questions/client";


// import { addQuiz, deleteQuiz, updateQuiz, setQuizzes, editQuiz } from "../Quizzes/reducer";
import { addQuestion, deleteQuestion, updateQuestion, setQuestions, editQuestion} from "../Questions/reducer";

import QuestionIndivButtons from "./QuestionIdivButtons";


export default function Questions() {
    // const { qid } = useParams();
    const { cid, qid, questid } = useParams();
    const {questions} = useSelector((state: any) => state.questionReducer);
    // const [quizzes, setQuizzes] = useState<any[]>([]);

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

   
    const removeQuestion = async (questionId: string) => {
        console.log("in remove question index...", questionId );
        await questionsClient.deleteQuestion(questionId);
        dispatch(deleteQuestion(questionId));
      };
    
    //   const fetchQuestions = async () => {
    //     if(qid) {
    //     console.log("in fetchQuestions questions.index...", qid);
    //         const questions = await questionsClient.findQuestionForQuiz(qid);
    //         dispatch(setQuestions(questions));
    //     }
    // }
    const fetchQuestions = async () => {
        if(qid) {
        console.log("in fetchQuestions questions.index...", qid);
            const questions = await questionsClient.findQuestionForQuiz(qid);
            // const questions = await questionsClient.fetchAllQuestions();
            console.log("in fetchQuestions questions ...", questions);


            dispatch(setQuestions(questions));
        }
    };
    

      useEffect(() => {
        fetchQuestions();
      }, [qid]);
    
      console.log("questions",questions)
      // Function to handle publishing/unpublishing a quiz
    

    return (

        <li className="wd-quiz list-group-item p-0 mb-2 fs-5 border-gray">

            <div className="d-flex justify-content-end mb-2">
                {currentUser.role === "FACULTY" && ( 
                    <Link
                        to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Detail/Editor/Questions/Editor`}
                        className="btn btn-danger btn-lg text-decoration-none text-white"
                    >
                        <FaPlus className="me-2" />
                        Question
                    </Link>
                )}
            </div>

            <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" /> Questions <QuizControlButtons />
            </div>

            <ul id="wd-quizzes" className="list-group rounded-0">
                {questions
                    .map((question: any) => (
                        <li className="wd-module list-group-item p-0 fs-5 border-gray" key={question.id}>
                            <div className="wd-quiz-list-item p-3 ps-2 wd-lesson">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="d-flex align-items-center">
                                        {/* {currentUser.role === "FACULTY" ? ( */}
                                            <Link
                                                // to={`/Kanbas/Courses/${cid}/Quizzes/Detail/${quiz._id}`}
                                                to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Detail/Editor/Questions/${question._id}/Editor`}
                                                className="text-decoration-none text-black"
                                            >
                                                <span className="ms-2 text-start">{question.title} </span>
                        
                                            </Link>
                                        {/* ) : (
                                            <Link
                                                to={`/Kanbas/Courses/${cid}/Quizzes/Detail/${quiz._id}`}
                                                className="text-decoration-none text-black"
                                            >
                                                <span className="ms-2 text-start">{quiz.title}</span>
                                            </Link> */}
                                        {/* )} */}


                                    </div>
                                    {currentUser.role === "FACULTY" ? (
                                        <QuestionIndivButtons questionId={question._id}
                                                          deleteQuestion={(questionId) => removeQuestion(questionId)}
                                                        //   deleteQuiz={removeQuiz} 
                                                          quizId= {question.quiz}
                                                          courseId = {question.course}/>
                                    ) : (
                                        <LessonControlButtons/>

                                    )}

                                    {/* {currentUser.role === "FACULTY" ? (
                                        <QuestionIndivButtons questionId={question._id}
                                                              quizId = {qid as string}
                                                              courseId = {question.course}
                                                              deleteQuestion={(questionId) => removeQuestion(questionId)}/>
                                    ) : (
                                        <LessonControlButtons/>

                                    )} */}
                                </div>

                                <ul className="ms-4 text-wrap txt-caption list-unstyled">
                                    <li>
                                        <span >{question.points} pts |{" "}</span>
                                        <span >{question.questionType}</span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    ))}
            </ul>
        </li>
    );
}
