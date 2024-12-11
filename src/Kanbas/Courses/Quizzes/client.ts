import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;



export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZ_API}/${quiz._id}`, quiz);
    return data;
  };  
export const deleteQuiz = async (quizId: string) => {
  console.log("delete quiz client", quizId)
 const response = await axiosWithCredentials.delete(`${QUIZ_API}/${quizId}`);
 return response.data;
};

// export const fetchAllCourses = async () => {
//     const { data } = await axiosWithCredentials.get(COURSES_API);
//     return data;
//   };

// export const findQuizForCourse = async (courseId: string) => {
// console.log("client find quiz for course", courseId);
// const response = await axiosWithCredentials
//     .get(`${COURSES_API}/${courseId}/quizzes`);
// return response.data;
// };
   
// export const createQuizForCourse = async (courseId: string, module: any) => {
//     const response = await axiosWithCredentials
//     .post(`${COURSES_API}/${courseId}/quizzes`,
//         module
//     );
//     return response.data;
// };
// export const createCourse = async (course: any) => {
//   const { data } = await axiosWithCredentials.post(COURSES_API, course);
//   return data;
//  };