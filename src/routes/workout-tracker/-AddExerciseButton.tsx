import {Typeahead} from "../../components/Typeahead.tsx";
import {useState} from "react";

interface Props {
    searchExercises: (input: string) => Promise<string[]>,
    dispatch: (args: {
        type: 'add-exercise',
        exerciseName: string
    }) => void
}

export function AddExerciseButton({searchExercises, dispatch}: Props) {
    const [selectedExercise, setSelectedExercise] = useState<string | null>(null)

    function addExercise() {
        if (!selectedExercise) {
            return;
        }
        dispatch({
            type: 'add-exercise',
            exerciseName: selectedExercise
        })

    }

    return <>
        <Typeahead search={searchExercises} onSelect={(s) => {
            setSelectedExercise(s)
        }}/>
        <button className={'button'} onClick={addExercise}>Add exercise</button>
    </>
}