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
	"name" varchar NOT NULL,
	"gifUrl" varchar NOT NULL,
	"instructions" json
);
--> statement-breakpoint
CREATE TABLE "muscles" (
	"name" varchar PRIMARY KEY NOT NULL
);
