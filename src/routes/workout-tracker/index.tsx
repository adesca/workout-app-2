import {createFileRoute} from '@tanstack/react-router'
import {Typeahead} from "../../components/Typeahead.tsx";
import {useDatabase} from "../../db/DBProvider.tsx";
import {ExercisesTable} from "../../db/schema.ts";
import {and, eq, like} from "drizzle-orm";
import {BasicEquipmentFilter} from "../../components/BasicEquipmentFilter.tsx";
import {useState} from "react";
import {or} from "drizzle-orm/sql/expressions/conditions";
import {Accordion} from "../../components/Accordion.tsx";

export const Route = createFileRoute('/workout-tracker/')({
    component: RouteComponent,
})

function RouteComponent() {
    const db = useDatabase();
    const [equipmentFilter, setSelectedEquipment] = useState<Record<string, boolean>>({})
    const checkedEquipment = Object.entries(equipmentFilter).filter(([, checked]) => {
        return checked
    }).map(([equipmentName]) => equipmentName)
        .map(eName => eq(ExercisesTable.equipment, eName))

    // console.log('selected', selectedEquipment)

    async function searchExercises(input: string) {
        const queryResult = await db.selectDistinctOn([ExercisesTable.exerciseId], {
            exerciseName: ExercisesTable.name,
            equipment: ExercisesTable.equipment
        }).from(ExercisesTable)
            .where(
                and(
                    like(ExercisesTable.name, `%${input}%`),
                    or(...checkedEquipment)
                )
            )

        console.log(queryResult)

        return [...new Set([...queryResult.map(q => q.exerciseName)])];
    }

    return <div>
        <BasicEquipmentFilter onCheck={(option, newValue) => setSelectedEquipment(e => ({
            ...e,
            [option]: newValue
        }))}/>

        <Accordion header={<Typeahead search={searchExercises} onSelect={(s) => {
            console.log('selected ', s);
        }}/>} footerButtons={[]}>
            Set 1:
            <div className={'fixed-grid has-2-cols'}>
                <div className={'grid'}>
                    <div className={'cell'}>
                        <input className="input" type="text" placeholder="Weight (lb)"/>
                    </div>

                    <div className={'cell'}>
                        <input className="input" type="text" placeholder="Reps"/>
                    </div>
                </div>
            </div>
        </Accordion>

        {/*<div className={'fixed-grid has-5-cols'}>*/}
        {/*    <div className={'grid'}>*/}
        {/*        <div className={'cell'}>Exercise</div>*/}
        {/*        <div className={'cell'}>Set 1</div>*/}
        {/*        <div className={'cell'}>Set 2</div>*/}
        {/*        <div className={'cell'}>Set 3</div>*/}
        {/*        <div className={'cell'}>How did it feel?</div>*/}
        {/*    </div>*/}
        {/*</div>*/}

    </div>
}
