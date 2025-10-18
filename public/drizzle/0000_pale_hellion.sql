CREATE TABLE "bodyparts" (
	"name" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "equipment" (
	"name" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercise_to_secondary_muscles" (
	"exerciseId" varchar NOT NULL,
	"secondaryMuscleId" varchar NOT NULL,
	CONSTRAINT "exercise_to_secondary_muscles_exerciseId_secondaryMuscleId_pk" PRIMARY KEY("exerciseId","secondaryMuscleId")
);
--> statement-breakpoint
CREATE TABLE "exercises" (
	"exerciseId" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"gifUrl" varchar NOT NULL,
	"instructions" json,
	"targetMuscles" varchar
);
--> statement-breakpoint
CREATE TABLE "muscles" (
	"name" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "exercise_to_secondary_muscles" ADD CONSTRAINT "exercise_to_secondary_muscles_exerciseId_exercises_exerciseId_fk" FOREIGN KEY ("exerciseId") REFERENCES "public"."exercises"("exerciseId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_to_secondary_muscles" ADD CONSTRAINT "exercise_to_secondary_muscles_secondaryMuscleId_muscles_name_fk" FOREIGN KEY ("secondaryMuscleId") REFERENCES "public"."muscles"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_targetMuscles_muscles_name_fk" FOREIGN KEY ("targetMuscles") REFERENCES "public"."muscles"("name") ON DELETE no action ON UPDATE no action;