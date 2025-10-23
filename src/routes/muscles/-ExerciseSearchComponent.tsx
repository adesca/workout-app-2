import {type ChangeEvent, useState} from "react";
import {useDatabase} from "../../db/DBProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {ExercisesTable} from "../../db/schema.ts";
import type {SelectedExerciseState} from "./-Muscles.models.ts";
import * as React from "react";

interface Props {
    setSelected: React.Dispatch<React.SetStateAction<SelectedExerciseState>>
    selected: SelectedExerciseState
}

function useGetAllExercises() {
    const db = useDatabase();

    return useQuery({
        queryKey: ['search-exercises', 'all'],
        queryFn: () => db.select().from(ExercisesTable)
    })
}

export function ExerciseSearchComponent(props: Props) {
    const [searchText, setSearchText] = useState("")
    const [equipmentFilter, setEquipmentFilter] = useState<Record<string, boolean>>({})
    const {isSuccess, data} = useGetAllExercises();

    console.log(JSON.stringify(equipmentFilter));

    function handleCheck(e: ChangeEvent<HTMLInputElement>, data: {
        targetMuscles: string,
        secondaryMuscles: string[]
    }) {
        props.setSelected(s => ({
            ...s,
            [e.target.name]: e.target.checked ? data : undefined
        }))
    }

    function handleEquipmentCheck(ev: ChangeEvent<HTMLInputElement>) {
        // console.log(ev)
        setEquipmentFilter(e => ({
            ...e,
            [ev.target.name]: ev.target.checked
        }))
    }

    let exerciseOptions;
    if (isSuccess) {
        exerciseOptions = data
            .filter(e => {
                if (searchText === '') return true;
                return e.name.includes(searchText);
            })
            .filter(e => {
                const visibleEquipment = Object.entries(equipmentFilter)
                    .filter(([, showEquipment]) => showEquipment)
                    .map(([eq]) => eq);

                if (visibleEquipment.length === 0) {
                    return true
                } else {
                    return visibleEquipment.includes(e.equipment);
                }
            })
            .map(exercise => {
                return <label key={exercise.exerciseId} className="panel-block">
                    <input type="checkbox" onChange={ev => handleCheck(ev, exercise)}
                           name={exercise.name}/>{exercise.name}
                </label>
            }).slice(0, 10)
    }

    return <nav className="panel column is-narrow">
        <p className="panel-heading">Exercises</p>
        <div className="panel-block">
            <label className={'pr-2'}>
                <input type={'checkbox'} name={'dumbbell'} onChange={handleEquipmentCheck}/>
                Dumbbell
            </label>
            <label className={'pr-2'}>
                <input type={'checkbox'} name={'barbell'} onChange={handleEquipmentCheck}/>Barbell
            </label>
            <label>
                <input type={'checkbox'} name={'body weight'} onChange={handleEquipmentCheck}/>Body Weight
            </label>
        </div>

        <div className="panel-block">
            <p className="control has-icons-left">
                <input className="input" type="text" placeholder="Search"
                       onChange={e => setSearchText(e.target.value)}/>
                <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true"></i>
      </span>
            </p>
        </div>

        {exerciseOptions}
        <div className="panel-block">
            <button className="button is-link is-outlined is-fullwidth">
                Reset all filters
            </button>
        </div>
    </nav>
}