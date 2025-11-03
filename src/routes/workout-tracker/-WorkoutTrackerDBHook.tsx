import {useDatabase} from "../../db/DBProvider.tsx";
import {and, eq, like} from "drizzle-orm";
import {ExercisesTable} from "../../db/schema.ts";
import {or} from "drizzle-orm/sql/expressions/conditions";
import {useQuery} from "@tanstack/react-query";
import {createQueryKeys} from "@barehera/query-key-factory";


const DBSearch = createQueryKeys('db', {
    exercises: () => ({
        queryKey: null,
        queryFn: () => {}
    })
})

export function useDBSearch(selectedEquipment: Record<string, boolean>) {
    const db = useDatabase();
    const checkedEquipment = Object.entries(selectedEquipment).filter(([, checked]) => {
        return checked
    }).map(([equipmentName]) => equipmentName)
        .map(eName => eq(ExercisesTable.equipment, eName))

    const dbQuery = (userInput: string) => db.selectDistinctOn([ExercisesTable.exerciseId], {
        exerciseName: ExercisesTable.name,
        equipment: ExercisesTable.equipment
    }).from(ExercisesTable)
        .where(
            and(
                like(ExercisesTable.name, `%${userInput}%`),
                or(...checkedEquipment)
            )
        );

    const query = (userInput: string) => {
        const dbQuery = db.selectDistinctOn([ExercisesTable.exerciseId], {
            exerciseName: ExercisesTable.name,
            equipment: ExercisesTable.equipment
        }).from(ExercisesTable)
            .where(
                and(
                    like(ExercisesTable.name, `%${userInput}%`),
                    or(...checkedEquipment)
                )
            );

        return {
            queryKey: ['workout-tracker', 'search-exercises'],
            queryFn: () => dbQuery
        }

    }


    return {
        query,
        queryResult: (input: string) => query(input)
    }
}