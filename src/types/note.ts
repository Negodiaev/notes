export interface INote {
  id: string;
  name: string;
  text: string;
  category: Category;
  date: string;
  isCompleted: boolean;
}

export enum Category {
  Personal = 'Personal',
  Business = 'Business',
  Home = 'Home',
}
