import axios from "axios";
import type { Category } from "../interfaces/category.interface";
import type { Question } from "../interfaces/question.interface";
import type { Score } from "../interfaces/score.interface";

const url = "http://localhost:3000";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get<Category[]>(`${url}/categories`);
  return res.data;
};

export const getQuestionsByCategory = async (category: string): Promise<Question[]> => {
  const res = await axios.get<Question[]>(`${url}/questions`, {
    params: { category }
  });
  return res.data;
};

export const getScoresByCategory = async (category: string): Promise<Score[]> => {
  const res = await axios.get<Score[]>(`${url}/scores`, {
    params: { category }
  });
  return res.data;
};
