import {createFileRoute} from '@tanstack/react-router'
import {useDatabase} from "../../db/DBProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {ExercisesTable} from "../../db/schema.ts";
import {type ChangeEvent, useState} from "react";
import Body from "@mjcdev/react-body-highlighter";
import type {SelectedExerciseState} from "./-Muscles.models.ts";
import {ExerciseSearchComponent} from "./-ExerciseSearchComponent.tsx";
import {MuscleViewingComponent} from "./-MuscleViewingComponent.tsx";

export const Route = createFileRoute('/muscles/')({
    component: MusclesVisualizer,
})


function MusclesVisualizer() {
    const [selected, setSelected] = useState<SelectedExerciseState>({})

    return <div className={'columns'}>
        <ExerciseSearchComponent setSelected={setSelected} selected={selected} />

        <MuscleViewingComponent selectedExercises={selected}/>
    </div>
}