import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const updateAssignment = async (assignment: any) => {
    const { data } = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return data;
  };
  

export const deleteAssignment = async ( assignmentId: string) => {
    //console.log("in delete assignment api call..."+ assignmentId);
    const response = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    //console.log(response);
    return response.data;
   };

// export const createAssignmentForCourse = async ( assignment: any) => {
//    // console.log("createAssignmentForCourse for api call ...");
  
//     const response = await axios.post(
//       `${COURSES_API}/assignments`,
//       assignment
//     );
//     //console.log("API Response:", response.data); 
//     return response.data;
//   };
  
  
//   export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
//     const response = await axiosWithCredentials.post(
//       `${COURSES_API}/${courseId}/assignments`,
//       assignment
//     );
//     return response.data;
//    };
   
  

// export const findAssignmentForCourse = async (courseId: string) => {
//   const response = await axiosWithCredentials
//     .get(`${COURSES_API}/${courseId}/assignments`);
//   return response.data;
// };
// export const fetchAllAssignments= async () => {
//   const { data } = await axiosWithCredentials.get(`${COURSES_API}/assignments`);
//   return data;
//  };
 
//  export const createQuizForCourse = async (courseId: string, quiz: any) => {
//   const response = await axiosWithCredentials.post(
//     `${COURSES_API}/${courseId}/quizzes`,
//     quiz
//   );
//   return response.data;
//  };
 

