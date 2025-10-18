ALTER TABLE "exercise_to_secondary_muscles" DROP CONSTRAINT "exercise_to_secondary_muscles_exerciseId_exercises_exerciseId_fk";
--> statement-breakpoint
ALTER TABLE "exercise_to_secondary_muscles" DROP CONSTRAINT "exercise_to_secondary_muscles_secondaryMuscleId_muscles_name_fk";
--> statement-breakpoint
ALTER TABLE "exercise_to_secondary_muscles" ADD CONSTRAINT "exercise_to_secondary_muscles_exerciseId_exercises_exerciseId_fk" FOREIGN KEY ("exerciseId") REFERENCES "public"."exercises"("exerciseId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_to_secondary_muscles" ADD CONSTRAINT "exercise_to_secondary_muscles_secondaryMuscleId_muscles_name_fk" FOREIGN KEY ("secondaryMuscleId") REFERENCES "public"."muscles"("name") ON DELETE set null ON UPDATE no action;