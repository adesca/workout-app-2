import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {drizzle, PgliteDatabase} from "drizzle-orm/pglite";
import {PGlite} from "@electric-sql/pglite";
import muscles from './db/data/muscles.json'
import equipment from './db/data/equipments.json'
import bodyparts from './db/data/bodyparts.json'
import exercises from './db/data/exercises.json'

import {
    BodyPartsTable,
    EquipmentTable,
    ExercisesTable,
    MusclesTable,
    Schema
} from "./db/schema.ts";
import {DatabaseProvider} from "./db/DBProvider.tsx";

async function setupDBAndMigrate(): Promise<PgliteDatabase<typeof Schema> & { $client: PGlite }> {
    const client = new PGlite('idb://my-data')

    const drizzleMigrationJournal = await (await fetch('/drizzle/meta/_journal.json')).json()


    const lsMigrationJournal = localStorage.getItem('migrations-run')
    let migrationJournal;
    if (!lsMigrationJournal) {
        migrationJournal = {}
        localStorage.setItem('migrations-run', JSON.stringify(migrationJournal))
    } else {
        migrationJournal = JSON.parse(lsMigrationJournal);
    }
    const migrationNames = drizzleMigrationJournal.entries.map(e => e.tag);
    for (const migration of migrationNames) {
        if (migrationJournal[migration]) {
            console.log('skipping running ', migration, ' because it already ran');
        } else {
            const migrationText = await (await fetch(`/drizzle/${migration}.sql`)).text()
            await client.exec(migrationText);
            migrationJournal[migration] = true;
            localStorage.setItem('migrations-run', JSON.stringify(migrationJournal))
            console.log('Ran migration', migration)
        }
    }

    const db= drizzle(client, {schema: Schema});

    await db.insert(MusclesTable).values(muscles).onConflictDoNothing();
    await db.insert(BodyPartsTable).values(bodyparts).onConflictDoNothing();
    await db.insert(EquipmentTable).values(equipment).onConflictDoNothing();

    const mappedExercises: Array<typeof ExercisesTable.$inferInsert> = exercises.map(ex => {
        return ({
            ...ex,
            targetMuscles: ex.targetMuscles[0],
            equipment: ex.equipments[0],
            bodyParts: ex.bodyParts[0]
        })
    })

    await db.delete(ExercisesTable);

    await db.insert(ExercisesTable).values(mappedExercises);
    return db;
}

// const { pushSchema } = require("drizzle-kit/api") as typeof import("drizzle-kit/api")

async function enableMocking() {
    // const client = new PGlite('idb://my-data')

    // const db = drizzle(client, {schema: Schema});
    return await setupDBAndMigrate();
}


enableMocking().then((db) => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <DatabaseProvider database={db}>
                <App/>
            </DatabaseProvider>
        </StrictMode>,
    )
})

