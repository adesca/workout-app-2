import {ExercisesTable} from "../db/schema.ts";

export function ExerciseResults(props: {exercises: Array<typeof ExercisesTable.$inferSelect>}) {
    console.log(props)

    return ""
}