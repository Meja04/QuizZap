import axios from "axios";
import type { Score } from "../interfaces/score.interface";

const url = "http://localhost:3000";

export const saveScore = async (scoreData: Omit<Score, "id">): Promise<Score> => {
  const res = await axios.post<Score>(`${url}/scores`, scoreData);
  return res.data;
};

export const getAllScores = async (): Promise<Score[]> => {
  const res = await axios.get<Score[]>(`${url}/scores`);
  return res.data;
};