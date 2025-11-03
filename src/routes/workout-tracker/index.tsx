import {createFileRoute} from '@tanstack/react-router'
import {Typeahead} from "../../components/Typeahead.tsx";
import {useDatabase} from "../../db/DBProvider.tsx";
import {ExercisesTable} from "../../db/schema.ts";
import {and, eq, like} from "drizzle-orm";
import {BasicEquipmentFilter} from "../../components/BasicEquipmentFilter.tsx";
import {useState} from "react";
import {or} from "drizzle-orm/sql/expressions/conditions";
import {Accordion} from "../../components/Accordion.tsx";
import {useWorkoutTrackerData} from "./-WorkoutTrackerHook.tsx";
import {AddExerciseButton} from "./-AddExerciseButton.tsx";

export const Route = createFileRoute('/workout-tracker/')({
    component: RouteComponent,
})

function RouteComponent() {
    const {state, dispatch} = useWorkoutTrackerData();
    const db = useDatabase();
    const [equipmentFilter, setSelectedEquipment] = useState<Record<string, boolean>>({})
    const checkedEquipment = Object.entries(equipmentFilter).filter(([, checked]) => {
        return checked
    }).map(([equipmentName]) => equipmentName)
        .map(eName => eq(ExercisesTable.equipment, eName))

    async function searchExercises(input: string) {
        const queryResult = await db.selectDistinctOn([ExercisesTable.exerciseId]).from(ExercisesTable)
            .where(
                and(
                    like(ExercisesTable.name, `%${input}%`),
                    or(...checkedEquipment)
                )
            )

        return queryResult
    }

    function HeaderTypeahead(props: { exerciseName: string }) {
        return <Typeahead initialValue={props.exerciseName} search={searchExercises} onSelect={(s, data) => {
            dispatch({
                type: 'rename-exercise',
                exerciseName: props.exerciseName,
                newExerciseName: s,
                exerciseDetails: data
            });

        }} projection={({name}) => name}/>
    }


    return <div>
        <BasicEquipmentFilter onCheck={(option, newValue) => setSelectedEquipment(e => ({
            ...e,
            [option]: newValue
        }))}/>

        {Object.entries(state)
            .filter(([, details]) => details !== undefined)
            .map(([exerciseName, exerciseDetails]) => {
                return <Accordion key={exerciseName} header={<HeaderTypeahead exerciseName={exerciseName}/>}
                                  footerButtons={[]}>
                    {exerciseDetails?.exerciseInfo && <Accordion header={"Info"} footerButtons={[]}>
                        <div>Equipment needed: {exerciseDetails.exerciseInfo.equipment}</div>
                        <img alt={exerciseDetails.exerciseInfo.name} src={exerciseDetails.exerciseInfo.gifUrl}/>
                        {exerciseDetails.exerciseInfo.instructions!.map(i => <div>{i}</div>)}
                    </Accordion>}
                    {exerciseDetails!.sets.map(((set, idx) => <span key={set.setNumber}>
                    Set {set.setNumber}:

                    <div className={'fixed-grid has-2-cols'}>
                        <div className={'grid'}>
                            <div className={'cell'}>
                                <input className="input" type="number" placeholder="Weight (lb)"
                                       defaultValue={set.weight} onChange={(ev) => dispatch({
                                    type: 'update-weight', setIndex: idx, exerciseName: exerciseName,
                                    newWeight: ev.target.value
                                })}/>
                            </div>

                            <div className={'cell'}>
                                <input className="input" type="number" placeholder="Reps" defaultValue={set.reps}/>
                            </div>
                        </div>
                    </div>
                </span>))}

                    <button className={'button'}>
                        <span className="icon is-small"><i className="fas fa-plus"></i></span>
                        <span>Set</span>
                    </button>

                </Accordion>
            })}

        <AddExerciseButton searchExercises={searchExercises} dispatch={dispatch}/>


    </div>
}
