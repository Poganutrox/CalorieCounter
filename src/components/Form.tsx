import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { categories } from "../data/categories";
import type { Form } from "../types";
import { FormActions, FormState } from "../reducers/formReducer";
import { v4 as uuidv4 } from "uuid";

type Props = { dispatch: React.Dispatch<FormActions>; state: FormState };

function Form({ dispatch, state }: Props) {
  const initialFormState: Form = {
    id: uuidv4(),
    category: 1,
    activity: "",
    calories: 0,
  };
  const [form, setForm] = useState<Form>(initialFormState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.forms.find(
        (activity) => activity.id === state.activeId
      );
      setForm(selectedActivity!);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setForm({
      ...form,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidForm = () => {
    const { activity, calories } = form;
    return activity.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newForm: form } });
    setForm({
      ...initialFormState,
      id: uuidv4(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Category:
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={form.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity" className="font-bold">
          Activity:
        </label>
        <input
          id="activity"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="E.g. Lunch, Orange Juice, Salad, Weights, Bicycling"
          value={form.activity}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calories:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias. Ej. 200"
          value={form.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={`Save ${categories[form.category - 1].name}`}
        disabled={!isValidForm()}
      />
    </form>
  );
}

export default Form;
