export interface Exercise {
  id: number;
  name: string;
  targetMuscle: string;
  secondaryMuscles: string | null;
  equipment: string | null;
  difficulty: string;
  instructions: string | null;
}

export interface SetInput {
  localId: string;
  setNumber: number;
  weightKg: string;
  reps: string;
}

export interface LogSetPayload {
  exerciseId: number;
  setNumber: number;
  weightKg: number;
  reps: number;
  notes?: string;
}

export interface CreateWorkoutLogPayload {
  logDate: string;
  durationMinutes?: number;
  notes?: string;
  sets: LogSetPayload[];
}

export interface LogSetResult {
  id: number;
  exerciseId: number;
  exerciseName: string;
  setNumber: number;
  weightKg: number;
  reps: number;
  rpe: number | null;
  estimated1rm: number;
  notes: string | null;
  isPersonalRecord: boolean;
}

export interface WorkoutLogResult {
  id: number;
  logDate: string;
  durationMinutes: number | null;
  notes: string | null;
  totalVolumeKg: number;
  sets: LogSetResult[];
}

export interface PreviousSet {
  hasPrevious: boolean;
  weightKg: number | null;
  reps: number | null;
  loggedOn: string | null;
}
