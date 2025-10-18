import {useQuery} from "@tanstack/react-query";
import type {PgliteDatabase} from "drizzle-orm/pglite/driver";
import {EquipmentTable, type Schema} from "./db/schema.ts";
import type {PGlite} from "@electric-sql/pglite";
import {useDatabase} from "./db/DBProvider.tsx";
import {count} from "drizzle-orm";

export function useEquipment() {
    const db = useDatabase();
    return useQuery({queryKey: ['db', 'exercises'], queryFn: () => getEquipment(db)})
}

async function getEquipment(db:  PgliteDatabase<typeof Schema> & { $client: PGlite }) {
    // const db: PgliteDatabase<typeof Schema> & { $client: PGlite } = window['myDB']
    return db.select({count: count()}).from(EquipmentTable);
}