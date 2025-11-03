import {Typeahead} from "../../components/Typeahead.tsx";
import {useState} from "react";
import type {ExercisesTable} from "../../db/schema.ts";
import type {Actions} from "./-WorkoutTrackerHook.tsx";

interface Props {
    searchExercises: (input: string) => Promise<typeof ExercisesTable.$inferSelect[]>,
    dispatch: (args: Actions) => void
}

export function AddExerciseButton({searchExercises, dispatch}: Props) {
    const [selectedExercise, setSelectedExercise] = useState<typeof  ExercisesTable.$inferSelect | { name: string } | null>(null)

    function addExercise() {
        if (!selectedExercise) {
            return;
        }
        dispatch({
            type: 'add-exercise',
            exerciseName: selectedExercise.name,
            exerciseDetails: selectedExercise.exerciseId ? selectedExercise as typeof  ExercisesTable.$inferSelect : undefined
        })

    }

    return <>
        <Typeahead search={searchExercises} projection={({name}) => name}
                   onSelect={(s, data) => {
            setSelectedExercise(data || {name: s})
        }}/>
        <button className={'button'} onClick={addExercise}>Add exercise</button>
    </>
}