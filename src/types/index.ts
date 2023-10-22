export interface IQuestion {
    question: string;
    options: string[];
    correctOption: number;
    points: number;
  }

export type Action = {
    type: string;
    payload?: IQuestion[];
  };