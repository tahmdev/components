let count = 0;
export type Actions =
  | {
      actionType: "add";
      text: string;
      notifType: "success" | "error" | "info";
    }
  | {
      actionType: "remove";
      id: number;
    };

export interface Notification {
  type: string;
  text: string;
  id: number;
}

type State = Notification[];

export const toastReducer = (state: State, action: Actions) => {
  switch (action.actionType) {
    case "add":
      count++;
      return [
        ...state,
        { type: action.notifType, text: action.text, id: count },
      ];
    case "remove":
      return state.filter((a) => a.id !== action.id);
    default:
      return state;
  }
};
