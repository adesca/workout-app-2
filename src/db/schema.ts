import {json, pgTable, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const ExercisesTable = pgTable('exercises', {
    exerciseId: varchar().primaryKey(),
    equipment: varchar().notNull(), // can't be null cause it was added via migration
    name: varchar().notNull(),
    gifUrl: varchar().notNull(),
    instructions: json().$type<string[]>(),
    targetMuscles: varchar().notNull(),
    bodyParts: varchar(),
    secondaryMuscles: varchar().array().notNull()
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


export const Schema = {
    ExercisesTable, MusclesTable, BodyPartsTable, EquipmentTable, ExerciseRelations,
    MusclesRelations
}