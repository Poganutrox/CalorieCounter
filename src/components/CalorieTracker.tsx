import { Form } from "../types";
import { useMemo } from "react";
import CalorieDisplay from "./CalorieDisplay";

type Props = {
  activities: Form[];
};

function CalorieTracker({ activities }: Props) {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category == 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurnt = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category == 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurnt,
    [activities]
  );
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Calories Summary
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="Consumed" />
        <CalorieDisplay calories={caloriesBurnt} text="Burnt" />
        <CalorieDisplay calories={netCalories} text="Difference" />
      </div>
    </>
  );
}

export default CalorieTracker;
