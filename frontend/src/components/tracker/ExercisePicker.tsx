import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { exerciseService } from "@/services/exerciseService";
import { Select } from "@/components/forms/Select";

interface ExercisePickerProps {
  value: number | null;
  onChange: (exerciseId: number) => void;
}

export function ExercisePicker({ value, onChange }: ExercisePickerProps) {
  const { data: exercises, isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: exerciseService.getAll,
  });

  const groupedByMuscle = useMemo(() => {
    if (!exercises) return {};
    return exercises.reduce<Record<string, typeof exercises>>((acc, ex) => {
      (acc[ex.targetMuscle] ??= []).push(ex);
      return acc;
    }, {});
  }, [exercises]);

  return (
    <Select
      label="Exercise"
      value={value ?? ""}
      disabled={isLoading}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value="">{isLoading ? "Loading exercises..." : "Select an exercise..."}</option>
      {Object.entries(groupedByMuscle).map(([muscle, list]) => (
        <optgroup key={muscle} label={muscle}>
          {list.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.name}
            </option>
          ))}
        </optgroup>
      ))}
    </Select>
  );
}
