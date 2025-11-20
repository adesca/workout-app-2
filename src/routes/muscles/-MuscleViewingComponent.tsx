import Body, {type ExtendedBodyPart, type Slug} from "@mjcdev/react-body-highlighter";
import type {SelectedExerciseState} from "./-Muscles.models.ts";
import { ExerciseMusclesToSVGBodyPartMap} from "./-Muscles.data.ts";

interface MuscleViewingComponentProps {
    selectedExercises: SelectedExerciseState
}

const muscleIntensityColors = ['#70adff', '#3bbcff', '#00c8ff', '#9a9aff', '#c481fd', '#e564de', '#fc43b3', '#ff2082', '#ff194d']
export function MuscleViewingComponent({selectedExercises}: MuscleViewingComponentProps) {

    const targetMuscles = Object.entries(selectedExercises)
        .filter(([, exerciseDetails]) => exerciseDetails !== undefined)
        .map(([, exerciseDetails]) => {
            return (exerciseDetails as SelectedExerciseState[string])?.targetMuscles
        })

    const secondaryMuscles = Object.entries(selectedExercises)
        .filter(([, exerciseDetails]) => exerciseDetails !== undefined)
        .flatMap(([, exerciseDetails]) => {
            return (exerciseDetails as SelectedExerciseState[string])?.secondaryMuscles || []
        })

    const bodyparts = Object.entries(selectedExercises)
        .filter(([, exerciseDetails]) => exerciseDetails !== undefined)
        .map(([, exerciseDetails]) => {
            return (exerciseDetails as SelectedExerciseState[string])?.bodyParts
        })

    const muscleCounts: Record<string, number> = {}
    targetMuscles.forEach(muscle => {
        const slugs = ExerciseMusclesToSVGBodyPartMap[muscle!.toLowerCase()]
        slugs.forEach(slug => {
            const temp = muscleCounts[slug] || 0;
            muscleCounts[slug] = temp + 1
        })
    })
    secondaryMuscles.forEach(muscle => {
        const slugs = ExerciseMusclesToSVGBodyPartMap[muscle!.toLowerCase()]
        slugs.forEach(slug => {
            const temp = muscleCounts[slug] || 0;
            muscleCounts[slug] = temp + .5
        })
    })
    bodyparts.forEach(bodyPart => {
        if (bodyPart) {
            const slugs = ExerciseMusclesToSVGBodyPartMap[bodyPart!.toLowerCase()]
            slugs.forEach(slug => {
                const temp = muscleCounts[slug] || 0;
                muscleCounts[slug] = temp + .5
            })
        }
    })
    const highlightedBodyParts = Object.entries(muscleCounts).map(([muscle, count]) => {

        return {slug: muscle, intensity: Math.min(Math.ceil(count), muscleIntensityColors.length) } as ExtendedBodyPart
    })
    console.log('highlighted', highlightedBodyParts)

    return <div className={'column'}>
        <Body data={highlightedBodyParts} side={'front'} colors={muscleIntensityColors}
              onBodyPartClick={(b,s) => {
            console.log('(front) body part', b, 'side', s)
        }}/>
        <Body data={highlightedBodyParts} side={'back'} colors={muscleIntensityColors}
              onBodyPartClick={(b,s) => {
            console.log('body part', b, 'side', s)
        }}/>
    </div>
}