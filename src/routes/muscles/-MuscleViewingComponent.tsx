import Body from "@mjcdev/react-body-highlighter";
import type {SelectedExerciseState} from "./-Muscles.models.ts";

interface MuscleViewingComponentProps {
    selectedExercises: SelectedExerciseState
}



const muscleConverterMap = {
    "forearm":"forearms",
    "":"tibialis",
    "upper chest":"chest",
    "":"knees",
    "upper back" :"upper-back",
    "lower back":"lower-back",
    "hamstrings":"hamstring",
    "glutes":"gluteal",
}
export function MuscleViewingComponent({selectedExercises}: MuscleViewingComponentProps) {
    // console.log('selected', selectedExercises)

    const muscles = Object.entries(selectedExercises)
        .filter(([name, exerciseDetails]) => exerciseDetails !== undefined)
        .map(([name, exerciseDetails]) => {
            const muscle = (exerciseDetails as SelectedExerciseState[string])?.targetMuscles

            return (exerciseDetails as SelectedExerciseState[string])?.targetMuscles
        })

    console.log('muscles', muscles)

    return <div className={'column'}>
        {/*<Body data={muscles.map(m => ({slug: m}))}*/}
        <Body data={[{slug: 'hair'}]}
        />
    </div>
}