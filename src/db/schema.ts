import {json, pgTable, primaryKey, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const ExercisesTable = pgTable('exercises', {
    exerciseId: varchar().primaryKey(),
    equipment: varchar(), // can't be null cause it was added via migration
    name: varchar().notNull(),
    gifUrl: varchar().notNull(),
    instructions: json().$type<string[]>(),
    targetMuscles: varchar().references(() => MusclesTable.name)
})

export const MusclesTable = pgTable('muscles', {
    name: varchar().primaryKey()
})

export const BodyPartsTable = pgTable('bodyparts', {
    name: varchar().primaryKey()
})

export const EquipmentTable = pgTable('equipment', {
    name: varchar().primaryKey()
})

export const ExerciseRelations = relations(ExercisesTable, ({one, many}) => ({
    targetMuscles: one(MusclesTable, {
        fields: [ExercisesTable.targetMuscles],
        references: [MusclesTable.name]
    }),
    exerciseToSecondaryMuscles: many(MusclesTable),
    equipments: one(EquipmentTable),
    bodyParts: one(BodyPartsTable)
}))

export const MusclesRelations = relations(MusclesTable, ({many}) => ({
    exerciseToSecondaryMuscles: many(ExercisesTable)
}))

export const ExerciseToSecondaryMusclesTable = pgTable(
    'exercise_to_secondary_muscles', {
        exerciseId: varchar().notNull().references(() => ExercisesTable.exerciseId, {onDelete: 'cascade'}),
        secondaryMuscleId: varchar().notNull().references(() => MusclesTable.name, {onDelete: 'set null'})
    },
    (t) => [primaryKey({columns: [t.exerciseId, t.secondaryMuscleId]})]
)

export const exerciseToSecondaryMuscleRelations = relations(ExerciseToSecondaryMusclesTable, ({one}) => ({
    exercise: one(ExercisesTable, {fields: [ExerciseToSecondaryMusclesTable.exerciseId], references: [ExercisesTable.exerciseId]}),
    secondaryMuscle: one(MusclesTable, {fields: [ExerciseToSecondaryMusclesTable.secondaryMuscleId], references: [MusclesTable.name]})
}))

export const Schema = {
    ExercisesTable, MusclesTable, BodyPartsTable, EquipmentTable, ExerciseRelations,
    ExerciseToSecondaryMusclesTable,
    exerciseToSecondaryMuscleRelations,
    MusclesRelations
}