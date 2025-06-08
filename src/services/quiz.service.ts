import axios from "axios";
import type { Category as CategoryType } from "../interfaces/category.interface";
import type { Question as QuestionType} from "../interfaces/question.interface";
import type { Score as ScoreType} from "../interfaces/score.interface";

const url = "http://localhost:3000";

export const getCategories = async (): Promise<CategoryType[]> => {
  const res = await axios.get<CategoryType[]>(`${url}/categories`);
  return res.data;
};

export const getQuestionsByCategory = async (category: string): Promise<QuestionType[]> => {
  const res = await axios.get<QuestionType[]>(`${url}/questions`, {
    params: { category }
  });
  return res.data;
};

export const getScoresByCategory = async (category: string): Promise<ScoreType[]> => {
  const res = await axios.get<ScoreType[]>(`${url}/scores`, {
    params: { category }
  });
  return res.data;
};
