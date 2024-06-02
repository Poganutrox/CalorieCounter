import { Form } from "../types";

export type FormActions =
  | { type: "save-activity"; payload: { newForm: Form } }
  | { type: "set-activeId"; payload: { id: Form["id"] } }
  | { type: "delete-activity"; payload: { id: Form["id"] } }
  | { type: "restart-app" };

export type FormState = {
  forms: Form[];
  activeId: Form["id"];
};

const localStorageActivities = (): Form[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: FormState = {
  forms: localStorageActivities(),
  activeId: "",
};

export const formReducer = (
  state: FormState = initialState,
  action: FormActions
) => {
  if (action.type === "save-activity") {
    let updatedActivities: Form[] = [];
    if (state.activeId) {
      updatedActivities = state.forms.map((activity) =>
        activity.id === state.activeId ? action.payload.newForm : activity
      );
    } else {
      updatedActivities = [...state.forms, action.payload.newForm];
    }
    return {
      ...state,
      forms: updatedActivities,
      activeId: "",
    };
  }
  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type == "delete-activity") {
    return {
      ...state,
      forms: state.forms.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }
  if (action.type == "restart-app") {
    return {
      forms: [],
      activeId: "",
    };
  }
  return state;
};
