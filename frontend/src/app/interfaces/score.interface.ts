export interface Score {
  id: number;
  userId?: number;
  username: string;
  categoryId: number;
  categoryName: string;
  score: number;
  date: Date;
}
