export interface Habit {
  id: string;
  name: string;
  category: 'Health' | 'Work' | 'Personal';
  icon: string;
  completedDates: string[]; // YYYY-MM-DD
  streak: number;
  createdAt: string;
}
