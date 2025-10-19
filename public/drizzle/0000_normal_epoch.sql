CREATE TABLE "bodyparts" (
	"name" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "equipment" (
	"name" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercises" (
	"exerciseId" varchar PRIMARY KEY NOT NULL,
	"equipment" varchar,
	"name" varchar NOT NULL,
	"gifUrl" varchar NOT NULL,
	"instructions" json,
	"targetMuscles" varchar,
	"bodyParts" varchar,
	"secondaryMuscles" varchar[]
);
--> statement-breakpoint
CREATE TABLE "muscles" (
	"name" varchar PRIMARY KEY NOT NULL
);
