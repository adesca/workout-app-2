import { useQuery} from "@tanstack/react-query";
import type {PgliteDatabase} from "drizzle-orm/pglite/driver";
import {BodyPartsTable, EquipmentTable, ExercisesTable, type Schema} from "./db/schema.ts";
import type {PGlite} from "@electric-sql/pglite";
import {useDatabase} from "./db/DBProvider.tsx";
import {and, eq} from "drizzle-orm";
import { or} from "drizzle-orm/sql/expressions/conditions";

export function useEquipment() {
    const db = useDatabase();
    return useQuery({queryKey: ['db', 'exercises'], queryFn: () => getEquipment(db)})
}

async function getEquipment(db: PgliteDatabase<typeof Schema> & { $client: PGlite }) {
    // const db: PgliteDatabase<typeof Schema> & { $client: PGlite } = window['myDB']
    return db.select().from(EquipmentTable);
}

export function useBodyParts() {
    const db = useDatabase();
    return useQuery({queryKey: ['db', 'bodyparts'], queryFn: () => getBodyParts(db)})
}

async function getBodyParts(db: PgliteDatabase<typeof Schema> & { $client: PGlite }) {
    // const db: PgliteDatabase<typeof Schema> & { $client: PGlite } = window['myDB']
    return db.select().from(BodyPartsTable);
}

export function useSearchExercises({equipment, bodyParts}: { equipment: string[], bodyParts: string }) {
    const db = useDatabase();

    return useQuery({
        enabled: false,
        queryKey: ['search-exercises', bodyParts, equipment],
        queryFn: () => searchExercises({equipment, bodyParts}, db)
    })
}

function searchExercises(input: {
    equipment: string[];
    bodyParts: string
}, db: PgliteDatabase<typeof Schema> & { $client: PGlite }) {
    console.log('searching')
    const orConditions = input.equipment.map(e => eq(ExercisesTable.equipment, e))
    return db.select().from(ExercisesTable).where(
            // arrayOverlaps(ExercisesTable.equipment, 'asdf')
        and(
            eq(ExercisesTable.bodyParts, input.bodyParts),
            or(...orConditions)
        )
    )
}