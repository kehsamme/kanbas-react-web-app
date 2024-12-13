import "../../../Labs/Lab2/index.css";
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {addQuestion, setQuestions, updateQuestion} from "../Questions/reducer";
import * as questionsClient from "../Questions/client";
export default function QuizPreview(){
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid, qid, questid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { questions } = useSelector((state: any) => state.questionReducer);
    console.log("right before fetch questions")
    const fetchQuestions = async () => {
        const questions = await questionsClient.findQuestionForQuiz(qid as string);
        dispatch(setQuestions(questions));
        console.log("find questions for quiz preview", questions)
      };

      useEffect(() => {
        fetchQuestions();
      }, [qid]);
    
    const handleEdit = () => {
        // Logic to navigate to quiz editor screen
        console.log("navigte to Editing quiz");
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Detail/Editor`);
      };
    
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});


  // Handle answer selection (now supporting multiple selections for MC questions)
  
  const handleAnswerChange = (questionId: number, selectedValue: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = {
        ...prevAnswers,
        [questionId]: selectedValue,  // Ensure the selected answer is correctly updated
      };
      console.log("Updated answers:", updatedAnswers);  // Log to ensure it's updating correctly
      return updatedAnswers;
    });
  };
  // Calculate score on submit
  const handleSubmit = () => {
    let newScore = 0;
    console.log("Selected Answers:", answers);

    questions.forEach((question: any) => {
      const selectedAnswer = answers[question._id];

      // Log answers object and question ID for debugging
      console.log(`Checking question: ${question._id}`);
      console.log("Selected answer:", selectedAnswer);
      console.log("Correct answers:", question.answers);

      // Check if the selected answer matches one of the correct answers
      if (Array.isArray(question.answers)) {
        if (question.answers.includes(selectedAnswer)) {
          newScore += question.points;
           // Add points for correct answers
        }
      } else {
        // Single correct answer case
        if (selectedAnswer === question.answers) {
          newScore += question.points; // Add points for correct answers
        }
      }
    });

    setScore(newScore); // Update the score
  };
 
    const submitAnswers = () => {
        //save answers

        //
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Detail`)
    }
   


return (
    <div>
    <h1>Quiz Preview</h1>
    {currentUser && currentUser.role === "FACULTY" && (
    <p id="wd-id-selector-1">
             ! This is a preview of the published quiz.
    </p>
    )}
    <div>
      {questions && questions.length > 0 ? (
        questions.map((question: any, index: any) => (
          <div key={index}>
            <div id="wd-css-responsive-forms-1">
            <div id="wd-bs-grid-system">
                <div className="row">
                    <div className="col-11 ">
                    <h4>Question {index + 1}</h4>
                    </div>
                    <div className="col-1 ">
                    <p>{question.points} Points</p>
                    </div>
                </div>
                </div>
            <div className="mb-3 row">
                <option value={question.option}
                    className="col-form-option">
                 {question.question} </option>
            </div>
            {question.questionType === "BLANKS" && (
            <div key={index} className="mb-2 d-flex align-items-center">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder={`Enter Response`}
                        value={question.option}
                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                    />
                </div>
            )}
            </div>
            {question.questionType === "MC" && (
                
                <fieldset className="row mb-3">
                <div className="col-sm-10">
                    <div className="form-check">
                    <input className="form-check-input" type="radio"
                        name={question._id} id="r3" value={question.options[0]}
                       onChange={(e) => handleAnswerChange(question._id, e.target.value)}/>
                    <label className="form-check-option" >
                        {question.options[0]}</label> </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio"
                        name={question._id} id="r4" value= {question.options[1]} onChange={(e) => handleAnswerChange(question._id, e.target.value)}/>
                    <label className="form-check-label" >
                    {question["options"][1]}</label> </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio"
                        name={question._id} id="r5" value= {question.options[2]} onChange={(e) => handleAnswerChange(question._id, e.target.value)}/>
                    <label className="form-check-label" >
                    {question["options"][2]} </label> </div>
                </div>
                </fieldset>
               
                
            )}
           
             {question.questionType === "TF" && (
                
                <fieldset className="row mb-3">
                <div className="col-sm-10">
                    <div className="form-check">
                    <input className="form-check-input" type="radio"
                        name={question._id} id="r3" value={question.options[0]}
                       onChange={(e) => handleAnswerChange(question._id, e.target.value)}/>
                    <label className="form-check-option" >
                        {question.options[0]}</label> </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio"
                        name={question._id} id="r4" value= {question.options[1]} 
                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}/>
                    <label className="form-check-label" >
                    {question["options"][1]}</label> </div>
                </div>
                </fieldset>
               
                
            )}
            
            </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}
      <button className="btn btn-danger me-2" onClick={handleSubmit}>
               Submit
        </button>
        <div>
        <h3>Your Score: {score}</h3>
      </div>
        {currentUser.role === "FACULTY" && (
            <button className="btn btn-danger" onClick={handleEdit}>
            Continue Editing this Quiz
            </button>
        )}
      
             </div>
            </div>
            


)};