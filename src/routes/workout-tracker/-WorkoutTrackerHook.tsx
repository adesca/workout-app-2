import {useReducer} from "react";

type WorkoutTrackerDataState = Record<string, {
    sets: Array<{ setNumber: number, weight: string, reps: string }>
} | undefined>

type Actions = {
    type: 'update-rep',
    setIndex: number, exerciseName: string, newReps: string
} | {
    type: 'update-weight',
    setIndex: number, exerciseName: string, newWeight: string
} | { type: 'add-exercise', exerciseName: string } | {
    type: 'rename-exercise',
    exerciseName: string,
    newExerciseName: string
}

function reducer(state: WorkoutTrackerDataState, action: Actions) {
    const workingState = structuredClone(state)

    switch (action.type) {
        case "update-rep": {
            const exercise = workingState[action.exerciseName]
            if (exercise === undefined) {
                break;
            }
            exercise.sets[action.setIndex].reps = action.newReps
            break;
        }
        case "update-weight": {
            const exercise = workingState[action.exerciseName]
            if (exercise === undefined) {
                break;
            }
            exercise.sets[action.setIndex].weight = action.newWeight
            break;
        }
        case 'add-exercise':
            workingState[action.exerciseName] = {
                sets: [{setNumber: 1, weight: '', reps: ''}, {setNumber: 2, weight: '', reps: ''}, {
                    setNumber: 3,
                    weight: '',
                    reps: ''
                }]
            }
            break;
        case 'rename-exercise':
            workingState[action.newExerciseName] = workingState[action.exerciseName]
            workingState[action.exerciseName] = undefined;
            break;
        default:
            throw new Error("Unknown action " + JSON.stringify(action))
    }

    localStorage.setItem('workout-tracker-state', JSON.stringify(workingState))

    return workingState;
}

export function useWorkoutTrackerData() {
    const maybeState = localStorage.getItem('workout-tracker-state');
    let initialState: WorkoutTrackerDataState;
    if (maybeState) {
        initialState = JSON.parse(maybeState)
    } else {
        initialState = {}
    }

    const [state, dispatch] = useReducer(reducer, initialState)


    return {state, dispatch}
}