import {useQuery} from "@tanstack/react-query";
import {useDatabase} from "../../db/DBProvider.tsx";
import {ExercisesTable, type Schema} from "../../db/schema.ts";
import {and, eq} from "drizzle-orm";
import {or} from "drizzle-orm/sql/expressions/conditions";
import type {PgliteDatabase} from "drizzle-orm/pglite/driver";
import type {PGlite} from "@electric-sql/pglite";
import {useState} from "react";
import {Accordion} from "../Accordion.tsx";

const upperBodyMuscles = [
    "neck",
    "lower arms",
    "shoulders", "upper arms", "chest", "back"
]

const lowerBodyParts = [
    "lower legs", "upper legs"
]

const core = [
    "waist"
]

const CARDIO = 'cardio'

export function RandomExercises() {
    return <>
        <section>
            <h1 className={"title"}>Some exercises you could do...</h1>
            <div className={"columns"}>
                <Exercise bodyParts={upperBodyMuscles} bodyPartFocus={"Upper"}/>
                <Exercise bodyParts={lowerBodyParts} bodyPartFocus={"Lower"}/>
                <Exercise bodyParts={core} bodyPartFocus={"Core"}/>
                <Exercise bodyParts={[CARDIO]} bodyPartFocus={"Cardio"}/>
            </div>

        </section>

    </>
}

function Exercise({bodyPartFocus, bodyParts}: { bodyPartFocus: string, bodyParts: string[] }) {
    const db = useDatabase();
    const {isLoading, isSuccess, data, refetch} = useQuery({
        queryKey: [bodyParts],
        queryFn: () => buildDBQuery(db, bodyParts)
    })

    if (isLoading) return "loading...";
    else if (isSuccess) {
        const {randomExercise: randomEx} = data

        return <div className={"column"}>
            <Accordion header={`${bodyPartFocus}: ${randomEx.name}`} footerButtons={
                [{text: 'Reroll', onClick: refetch}]
            } >
                <table className={'table'}>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{randomEx.name}</td>
                    </tr>
                    <tr>
                        <th>Primary muscle group</th>
                        <td>{randomEx.targetMuscles}</td>
                    </tr>

                    <tr>
                        <th>Secondary muscle groups</th>
                        <td>{(randomEx.secondaryMuscles || []).join(', ')}</td>
                    </tr>
                    <tr>
                        <th>Equipment needed</th>
                        <td>{randomEx.equipment}</td>
                    </tr>
                    <tr>
                        <th>GIF</th>
                        <td><img alt={randomEx.name} src={randomEx.gifUrl}/></td>
                    </tr>
                    <tr>
                        <th>Instructions</th>
                        <td>
                            <ol>
                                {(randomEx.instructions || [])
                                    .map(i => i.replace(/Step:+\d/, ''))
                                    .map(i => <li>{i}</li>)}
                            </ol>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Accordion>
        </div>
    }
}

async function buildDBQuery(db: PgliteDatabase<typeof Schema> & { $client: PGlite }, bodyParts: string[]) {
    const orConditions = bodyParts.map(bp => eq(ExercisesTable.bodyParts, bp))
    const dbResult = await db.select().from(ExercisesTable).where(
        // arrayOverlaps(ExercisesTable.equipment, 'asdf')
        and(
            eq(ExercisesTable.equipment, 'dumbbell'),
            or(...orConditions)
        )
    )

    return {
        ...dbResult,
        randomExercise: dbResult[Math.floor(Math.random() * dbResult.length)]
    }
}
