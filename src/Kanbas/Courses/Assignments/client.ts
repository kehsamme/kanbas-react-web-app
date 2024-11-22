import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const updateAssignment = async (assignment: any) => {
    const { data } = await axios.put(`${COURSES_API}/assignments/${assignment._id}`, assignment);
    return data;
  };
  

export const deleteAssignment = async ( assignmentId: string) => {
    console.log("in delete assignment api call..."+ assignmentId);
    const response = await axios.delete(`${COURSES_API}/assignments/${assignmentId}`);
    console.log(response);
    return response.data;
   };

export const createAssignmentForCourse = async ( assignment: any) => {
    console.log("in create assignment client...");
  
    const response = await axios.post(
      `${COURSES_API}/assignments`,
      assignment
    );
    console.log("API Response:", response.data); 
    return response.data;
  };
  

export const findAssignmentForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

