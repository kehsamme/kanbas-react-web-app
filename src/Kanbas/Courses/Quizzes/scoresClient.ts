import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const SCORES_API = `${REMOTE_SERVER}/api/scores`;



export const update = async (score: any, scoreId: string) => {
    const { data } = await axiosWithCredentials.put(`${SCORES_API}/${scoreId}`, score);
    return data;
  };  

export const add = async (score: any) => {
    console.log("adding to score collection")
    const {data} = await axiosWithCredentials.post(`${SCORES_API}`, score);
    return data;
  };  

export const getScores = async () => {
    const response = await axiosWithCredentials.get(`${SCORES_API}`);
    return response.data;
}