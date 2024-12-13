import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });


const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTION_API = `${REMOTE_SERVER}/api/questions`;
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;
// Courses/6750b2fd9db74e606e36a99e/Quizzes/Detail/Editor/Questions/

// Quizzes
export const createQuestionForQuiz = async (quizId: string, question: any) => {
  console.log("create question");
    const response = await axiosWithCredentials.post(
      `${QUIZ_API}/${quizId}/questions`,
      question
    );
    return response.data;
    };
    
export const findQuestionForQuiz = async (quizId: string) => {
    console.log("client find question for quiz", quizId);
    const response = await axiosWithCredentials
        .get(`${QUIZ_API}/${quizId}/questions`);
        console.log("client find questions", response);
    return response.data;
};


export const updateQuestion = async (question: any) => {
  console.log("update question");
    const { data } = await axiosWithCredentials.put(`${QUESTION_API}/${question._id}`, question);
    return data;
  };  
export const deleteQuestion = async (questionId: string) => {
 const response = await axiosWithCredentials.delete(`${QUESTION_API}/${questionId}`);
 return response.data;
};

export const fetchAllQuestions = async () => {
    const { data } = await axiosWithCredentials.get(QUESTION_API);
    console.log("client find questions", data);
    return data;
  };