import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {addQuestion, setQuestions, updateQuestion} from "./reducer";
import * as questionsClient from "../Questions/client";

import { Link } from 'react-router-dom';


export default function QuestionEditor() {
    const { cid, qid, questid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { questions } = useSelector((state: any) => state.questionReducer);
    console.log("right before fetch questions")
    const fetchQuestions = async () => {
        const questions = await questionsClient.findQuestionForQuiz(qid as string);
        dispatch(setQuestions(questions));
      };

      useEffect(() => {
        fetchQuestions();
        console.error("in use effeect", question.options)
      }, [qid]);
   
    
    
    useEffect(() => {
        console.log("in editor",questions, questions.filter((questions: { _id: string, title: string, quiz: string }) => questions._id === questid))
        const newQuestion = questions.filter((question: { _id: string, title: string, quiz: string }) => question._id === questid)[0] ?? {
            title: "",
            points: 0,
            questionType: "TF",
            number: `M${questions.length + 1}`,
            quiz: "dummy_id",
            question: "",
            options: [],
            answers: [],
        }
        setQuestion(newQuestion)
      }, [questions]);
    
    // Initialize state with assignment values
    // const [question, setQuestion] = useState({
    //         title: "",
    //         points: 0,
    //         questionType: "True False",
    //         number: `M${questions.length + 1}`,
    //         quiz: "dummy_id",
    //         question: "",
    //         options: [],
    //         answers: [],
    // });
    const [question, setQuestion] = useState<{
        title: string;
        points: number;
        questionType: string;
        number: string;
        quiz: string;
        question: string;
        options: string[];
        answers: string[]; // Changed to explicitly reflect it's an array of strings
    }>({
        title: "dummy_id",
        points: 0,
        questionType: "TF",
        number: `M${questions.length + 1}`,
        quiz: "dummy_id",
        question: "",
        options: ["True", "False"],
        answers: [],
    });
    const handleQuestionTypeChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        setQuestion({
            ...question,
            questionType: selectedType,
            answers: selectedType === "TF" ? [""] : [], // Initialize answers differently based on type
            options: selectedType === "TF" ? ["True", "False"] : [], // Add placeholder options for multiple choice
        });
    };
    
      useEffect(() => {
        if (questions.length > 0 && questid) {
          const selectedQuestion = questions.find(
            (question: { _id: string }) => question._id === questid
          );
          if (selectedQuestion) setQuestion(selectedQuestion);
        }
      }, [questions, qid]);
      
    
    const [title, setQuestionTitle] = useState(""); 
    const [questionType, setQuestionType] = useState("TF"); // Type of question (e.g., True/False)
    const [points, setQuestionPoints] = useState(10); // Points for the question
    const [number, setQuestionNumber] = useState(`M${questions.length + 1}`); // Dynamic question number
    const [quiz, setQuestionQuizId] = useState(""); // Associated quiz ID
    const [questionText, setQuestionText] = useState(""); 
    const [questionOptions, setQuestionOptions] = useState(""); 
    const [questionAnswers, setQuestionAnswers] = useState(""); 
    

    const saveQuestion = async (question: any) => {
        await questionsClient.updateQuestion(question);
        dispatch(updateQuestion(question));
      };

    const createQuestionForQuiz = async (qid: any, question_1: any) => {
    // console.log("in createAssignmentForCourse ...");
        //console.log("New assignment_1", assignment_1)

        if (!qid) return;
        //console.log("New assignment: ", assignment_1)
        // const newAssignment = { name: assignmentName, course: cid };
        const question = await questionsClient.createQuestionForQuiz(qid, question_1);
        //console.log("New Assignment return from api call:", assignment); // Debug Redux update
        dispatch(addQuestion(question));
    };
      
    
    const handleSave = async () => {
        if (
            !question.title ||
            !question.points ||
            !question.questionType
          ) {
            alert("Please fill in all required fields.");
            return;
          }
          const questionData = {
            _id: questid || `${new Date().getTime()}`, // Generate a unique ID for new questions
            number: question.number || `Q${new Date().getTime()}`, // Automatically generate number if not provided
            quiz: question.quiz || qid, // Assuming qid is the ID of the associated quiz
            questionType: question.questionType || "TF", // Default question type as True False
            title: question.title || "",
            points: question.points || 0, // Default to 0 points if not provided
            question: question.question || "", // The question text
            options: question.options || ["True",  "False"], // Default to an empty array if no options
            answers: question.answers || [], // Default to an empty string if no answers provided
        };
        
    
        const newQuestion = {
            number: `Q${questions.length + 1}`, // Automatically generate question number based on the number of questions
            quiz: quiz, // The ID of the associated quiz, you can replace `quizId` with the actual quiz ID
            questionType: questionType, // The type of question (e.g., "MC" for multiple choice, "TF" for true/false, etc.)
            title: title, // Title or name of the question
            points: Number(points), // Convert points to a number, if provided as string
            question: questionText, // The question itself (e.g., "What is 2+2?")
            options: questionOptions, // Options for the question (e.g., ["A. 4", "B. 5", "C. 6"])
            answers: questionAnswers, // The correct answer (e.g., "A. 4")
        };
        

        if (questid) {
          // If aid exists, update the assignment
          try {
            // dispatch(updateAssignment(assignmentData));
            saveQuestion(questionData);
            //console.log("Assignment updated:", assignmentData);
          } catch (error) {
            console.error("Error updating question:", error);
          }
        } else {
          // Else create a new assignment
          try {
            createQuestionForQuiz(qid, question);
            // createAssignmentForCourse(assignmentData)
           // console.log("New assignment created:", assignmentData);
          } catch (error) {
            console.error("Error creating question:", error);
          }
        }
      
        // Navigate back to assignments list
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Detail/Editor/Questions`);
      };

    

    console.log(quiz)
   

    return (
        <div className="container mt-4" id="wd-quizzes-editor">
            
        <h2> QUESTION EDITOR AND MAKER PAGE</h2>
            <div className="mb-3">
                <label htmlFor="wd-type" className="form-label">Quiz Type</label>
                <select id="wd-type" className="form-select" value={question?.questionType} 
                    onChange={handleQuestionTypeChange}
                    // onChange={(e) =>
                    // setQuestion({ ...question, questionType: e.target.value })}
                    >
                <option value="TF">True False</option>
                    <option value="MC">Multiple Choice</option>
                    <option value="BLANKS">Fill in the Blank</option>
                </select>
            </div>
        
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label">Question title</label>
                <input type="text" className="form-control" value={question?.title} placeholder="Title"
                       onChange={(e) => setQuestion({ ...question, title: e.target.value })}/>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-description" className="form-label">Question:</label>
                <textarea id="wd-description" className="form-control" rows={6} value={question?.question} onChange={(e) =>
                    setQuestion({ ...question, question: e.target.value })}/>
            </div>

            <div className="mb-3">
                <label htmlFor="wd-points" className="form-label">Points</label>
                <input type="number" id="wd-points" className="form-control" value={question?.points} onChange={(e) =>
                    setQuestion({ ...question, points: Number(e.target.value) })}/>
            </div>
            
            <div className="mb-3">
                <label htmlFor="wd-answer" className="form-label">Options</label>


                {/* Render Multiple Choice Options */}
                {question.questionType === "MC" && (
                    <div>
                        {question.options.map((option, index) => (
                            <div key={index} className="mb-2 d-flex align-items-center">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(e) => {
                                        const updatedOptions = [...question.options];
                                        updatedOptions[index] = e.target.value;
                                        setQuestion({ ...question, options: updatedOptions });
                                       
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        const updatedOptions = question.options.filter((_, i) => i !== index);
                                        setQuestion({ ...question, options: updatedOptions });
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() =>
                                setQuestion({ ...question, options: [...question.options, ""] })
                            }
                        >
                            Add Option
                        </button>
                    </div>
                )}
                 {/* {question.questionType === "BLANKS" && (
                    <div>
                        {question.options.map((option, index) => (
                            <div key={index} className="mb-2 d-flex align-items-center">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder={`Possible Anwer ${index + 1}`}
                                    value={option}
                                    onChange={(e) => {
                                        const updatedOptions = [...question.options];
                                        updatedOptions[index] = e.target.value;
                                        setQuestion({ ...question, options: updatedOptions });
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        const updatedOptions = question.options.filter((_, i) => i !== index);
                                        setQuestion({ ...question, options: updatedOptions });
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() =>
                                setQuestion({ ...question, options: [...question.options, ""] })
                            }
                        >
                            Add Answer Option
                        </button>
                    </div>
                )} */}



            </div>
            <div className="mb-3">
                <label htmlFor="wd-answer" className="form-label">Answer</label>
                  {/* Render True/False options */}
                  {question.questionType === "TF" && (
                    <select
                        id="wd-answer"
                        className="form-select"
                        value={question.answers}
                        onChange={(e) => setQuestion({ ...question, answers: [e.target.value] })
                    }
                    >
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>
                )}

                {/* Render Multiple Choice Options */}
                {question.questionType === "MC" && (
                    <div>
                        {question.answers.map((answer, index) => (
                            <div key={index} className="mb-2 d-flex align-items-center">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder={`Answer ${index + 1}`}
                                    value={answer}
                                    onChange={(e) => {
                                        const updatedAnswers = [...question.answers];
                                        updatedAnswers[index] = e.target.value;
                                        setQuestion({ ...question, answers: updatedAnswers });
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        const updatedAnswers = question.answers.filter((_, i) => i !== index);
                                        setQuestion({ ...question, answers: updatedAnswers });
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() =>
                                setQuestion({ ...question, answers: [...question.answers, ""] })
                            }
                        >
                            Add Answer
                        </button>
                    </div>
                )}
                 {question.questionType === "BLANKS" && (
                    <div>
                        {question.answers.map((answer, index) => (
                            <div key={index} className="mb-2 d-flex align-items-center">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder={`Possible Anwer ${index + 1}`}
                                    value={answer}
                                    onChange={(e) => {
                                        const updatedAnswers = [...question.answers];
                                        updatedAnswers[index] = e.target.value;
                                        setQuestion({ ...question, answers: updatedAnswers });
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        const updatedAnswers = question.answers.filter((_, i) => i !== index);
                                        setQuestion({ ...question, answers: updatedAnswers });
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() =>
                                setQuestion({ ...question, answers: [...question.answers, ""] })
                            }
                        >
                            Add Possible Answer
                        </button>
                    </div>
                )}
            </div>
       
            
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-secondary me-2" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Detail/Editor/Questions`)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleSave}>Save Question</button>
            </div>
        </div>
    );
  }

