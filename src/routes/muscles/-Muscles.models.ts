import {ExercisesTable} from "../../db/schema.ts";

export type SelectedExerciseState = Record<string, typeof ExercisesTable.$inferSelect | undefined>