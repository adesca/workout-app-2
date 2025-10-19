import {useSearchExercises} from "../../queries.ts";

export function UpperBodyExercise() {
    const {isSuccess, isLoading, data} = useSearchExercises({enabled: true, equipment: ['dumbbell'], bodyParts: 'lower arms' })

    if (isLoading) return "loading..."
    else if (isSuccess) {
        return <>
            chosen exercise: {data[0].name}
        </>
    }


}