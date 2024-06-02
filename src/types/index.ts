export type Category = {
  id: number;
  name: string;
};

export type Form = {
  id: string;
  category: number;
  activity: string;
  calories: number;
};
