export interface IQuestion {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

export type Action =
  | {
      type: ActionTypeEnum.DATA_RECEIVED;
      payload: IQuestion[];
    }
  | {
      type: ActionTypeEnum.DATA_FAILED;
    }
  | {
      type: ActionTypeEnum.START;
    }
  | {
      type: ActionTypeEnum.NEW_ANSWER;
      payload: number;
    }
  | {
      type: ActionTypeEnum.NEXT_QUESTION;
    }
  | {
      type: ActionTypeEnum.FINISH;
    }
  | {
      type: ActionTypeEnum.RESTART;
    };

export enum Status {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  READY = 'READY',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

export enum ActionTypeEnum {
  DATA_RECEIVED = 'dataReceived',
  DATA_FAILED = 'dataFailed',
  START = 'start',
  NEW_ANSWER = 'newAnswer',
  NEXT_QUESTION = 'nextQuestion',
  FINISH = 'finish',
  RESTART = 'restart',
}
