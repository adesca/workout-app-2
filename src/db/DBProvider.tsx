import {createContext, type ReactNode, useContext} from "react";
import type {PgliteDatabase} from "drizzle-orm/pglite/driver";
import type {Schema} from "./schema.ts";
import type {PGlite} from "@electric-sql/pglite";

const DatabaseContext = createContext<(PgliteDatabase<typeof Schema> & { $client: PGlite }) | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useDatabase() {
    const database = useContext(DatabaseContext);

    if (!database) {
        throw new Error("useDatabase must be used within a database context")
    }

    return database;
}

export function DatabaseProvider({children, database}: { children: ReactNode, database:  PgliteDatabase<typeof Schema> & { $client: PGlite }}) {
    return <DatabaseContext value={database} >
        {children}
    </DatabaseContext>
}