import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLL_API = `${REMOTE_SERVER}/api/enrollments`;

// Enroll a user
export const enrollUser = async (userId: string, courseId: string) => {
    const response = await axios.post(ENROLL_API, { userId, courseId });
    return response.data;
};

// Unenroll a user
export const unenrollUser = async (userId: string, courseId: string) => {
    const response = await axios.delete(ENROLL_API, { data: { userId, courseId } });
    return response.data;
};

// Fetch enrollments for a user
export const getEnrollmentsForUser = async (userId: string) => {
    const response = await axios.get(`${ENROLL_API}/${userId}`);
    return response.data;
};

// Fetch all enrollments (optional, for debugging)
export const getAllEnrollments = async () => {
    const response = await axios.get(ENROLL_API);
    return response.data;
};
