import {createFileRoute} from '@tanstack/react-router'
import {useState} from "react";
import type {SelectedExerciseState} from "./-Muscles.models.ts";
import {ExerciseSearchComponent} from "./-ExerciseSearchComponent.tsx";
import {MuscleViewingComponent} from "./-MuscleViewingComponent.tsx";

export const Route = createFileRoute('/muscles/')({
    component: MusclesVisualizer,
})


function MusclesVisualizer() {
    const [selected, setSelected] = useState<SelectedExerciseState>({})

    return <div className={'columns'}>
        <ExerciseSearchComponent setSelected={setSelected} selected={selected}/>

        <MuscleViewingComponent selectedExercises={selected}/>
    </div>
}