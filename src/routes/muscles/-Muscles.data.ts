import type {Slug} from "@mjcdev/react-body-highlighter";


const rawMuscleData = [
    {
        "SVG body part": "trapezius",
        "Muscle 1": "Shoulders",
        "Muscle 2": "Back",
        "Muscle 3": "upper back",
        "Muscle 4": "traps",
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "triceps",
        "Muscle 1": "triceps",
        "Muscle 2": "upper arms",
        "Muscle 3": "shoulders",
        "Muscle 4": null,
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "forearm",
        "Muscle 1": "Lower arms",
        "Muscle 2": "forearms",
        "Muscle 3": "wrists",
        "Muscle 4": "wrist extensors",
        "Muscle 5": "wrist flexors",
        "Muscle 6": "brachialis",
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "adductors",
        "Muscle 1": "inner thighs",
        "Muscle 2": "upper legs",
        "Muscle 3": "groin",
        "Muscle 4": null,
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "calves",
        "Muscle 1": "Calves",
        "Muscle 2": "Soleus",
        "Muscle 3": "Lower legs",
        "Muscle 4": "Ankle",
        "Muscle 5": "Knees",
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "hair",
        "Muscle 1": null,
        "Muscle 2": null,
        "Muscle 3": null,
        "Muscle 4": null,
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "neck",
        "Muscle 1": "sternocleidomastoid",
        "Muscle 2": "levator scapulae",
        "Muscle 3": "trapezius",
        "Muscle 4": "shoulders",
        "Muscle 5": "neck",
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "deltoids",
        "Muscle 1": "Shoulders",
        "Muscle 2": "Delts",
        "Muscle 3": "rotator cuff",
        "Muscle 4": "deltoids",
        "Muscle 5": "rear deltoids",
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "hands",
        "Muscle 1": "wrists",
        "Muscle 2": "hands",
        "Muscle 3": "grip muscles",
        "Muscle 4": null,
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "feet",
        "Muscle 1": "feet",
        "Muscle 2": "lower legs",
        "Muscle 3": "soleus",
        "Muscle 4": null,
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "head",
        "Muscle 1": "sternocleidomastoid",
        "Muscle 2": "levator scapulae",
        "Muscle 3": "trapezius",
        "Muscle 4": null,
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "ankles",
        "Muscle 1": "ankles",
        "Muscle 2": "calves",
        "Muscle 3": "soleus",
        "Muscle 4": "lower legs",
        "Muscle 5": "feet",
        "Muscle 6": "ankle stabilizers",
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "tibialis",
        "Muscle 1": "shin",
        "Muscle 2": "lower legs",
        "Muscle 3": "ankles",
        "Muscle 4": "knees",
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "obliques",
        "Muscle 1": "Abs",
        "Muscle 2": "Waist",
        "Muscle 3": "Obliques",
        "Muscle 4": "serratus anterior",
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "chest",
        "Muscle 1": "pectorals",
        "Muscle 2": "shoulders",
        "Muscle 3": "chest",
        "Muscle 4": "upper chest",
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "biceps",
        "Muscle 1": "upper arms",
        "Muscle 2": "biceps",
        "Muscle 3": "shoulders",
        "Muscle 4": null,
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "abs",
        "Muscle 1": "Abdominals",
        "Muscle 2": "waist",
        "Muscle 3": "core",
        "Muscle 4": "abs",
        "Muscle 5": "lower abs",
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "quadriceps",
        "Muscle 1": "quadriceps",
        "Muscle 2": "upper leg",
        "Muscle 3": "knees",
        "Muscle 4": "Hip flexors",
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "knees",
        "Muscle 1": "shins",
        "Muscle 2": "lower legs",
        "Muscle 3": "upper legs",
        "Muscle 4": "hamstring",
        "Muscle 5": "quads",
        "Muscle 6": "calves",
        "Muscle 7": "adductors",
        "Muscle 8": "hip flexors"
    },
    {
        "SVG body part": "upper-back",
        "Muscle 1": "upper back",
        "Muscle 2": "trapezius",
        "Muscle 3": "lats",
        "Muscle 4": "rhomboids",
        "Muscle 5": "spine",
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "lower-back",
        "Muscle 1": "lower back",
        "Muscle 2": "obliques",
        "Muscle 3": "latissimus dorsi",
        "Muscle 4": "spine",
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "hamstring",
        "Muscle 1": "hamstrings",
        "Muscle 2": "upper legs",
        "Muscle 3": "knees",
        "Muscle 4": "hips",
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    },
    {
        "SVG body part": "gluteal",
        "Muscle 1": "glutes",
        "Muscle 2": "hips",
        "Muscle 3": "abductors",
        "Muscle 4": null,
        "Muscle 5": null,
        "Muscle 6": null,
        "Muscle 7": null,
        "Muscle 8": null
    }
] as const

export const ExerciseMusclesToSVGBodyPartMap: Record<string, Slug[]> = {}
export const BodyPartMuscleMap = Object.fromEntries(rawMuscleData
    .map(data => {
        const bodyPart = data["SVG body part"];
        const muscles = Object.entries(data)
            .filter(([key, value]) => key.startsWith("Muscle") && value !== null)
            .map(([, value]) => value as string)

        muscles.forEach(muscle => {
            const temp = ExerciseMusclesToSVGBodyPartMap[muscle] || [];
            temp.push(bodyPart);
            ExerciseMusclesToSVGBodyPartMap[muscle.toLowerCase()] = temp;
        })

        return [bodyPart, muscles]
    }))

export const transposedMap: Record<string, string[] | undefined> = {}
 Object.entries(BodyPartMuscleMap).forEach(([bodyPart, muscles]) => {
    muscles.forEach(muscle => {
        const entry = transposedMap[muscle] || []
        entry.push(bodyPart)
        transposedMap[muscle] = entry;
    })
})

import MusclesJson from '../../db/data/muscles.json';
import BodyPartsJson from '../../db/data/bodyparts.json';

console.log(ExerciseMusclesToSVGBodyPartMap)
function validateMapping() {
    const  musclesWithoutAnSVG = MusclesJson.map(muscle => muscle.name)
        .filter(muscleName => muscleName !== 'cardiovascular system')
        .filter(muscleName => !ExerciseMusclesToSVGBodyPartMap[muscleName])

    const bodyPartsWithoutAnSVG = BodyPartsJson.map(bp => bp.name)
        .filter(bpName => bpName !== 'cardio')
        .filter(bpName => !ExerciseMusclesToSVGBodyPartMap[bpName])

    const slugBodyParts = ["abs", "adductors", "ankles", "biceps", "calves", "chest", "deltoids", "deltoids", "feet", "forearm", "gluteal", "hamstring", "hands", "hair", "head", "knees", "lower-back", "neck", "obliques", "quadriceps", "tibialis", "trapezius", "triceps", "upper-back"]

    // const musclesThatsNotAnSVGBodyPart = MusclesJson.map(muscle => muscle.name)
    //     .filter(muscleName => !slugBodyParts.includes(muscleName))

    // console.log('muscles that are not an svg body part', musclesThatsNotAnSVGBodyPart)
    console.log('muscles without an svg', musclesWithoutAnSVG, 'bp without one', bodyPartsWithoutAnSVG)

    return musclesWithoutAnSVG.length === 0 && bodyPartsWithoutAnSVG.length === 0;
}

validateMapping();
