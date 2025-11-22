import {Accordion} from "../../components/Accordion.tsx";
import {useReducer, useState} from "react";
import * as React from "react";


const LOCALSTORAGE_KEY = 'workout-tracker-state/warmup-accordion'
export type Actions = {
    type: 'add step',
    newStep: { text: string, type: 'link' | 'text' }
} | {
    type: 'remove step',
    stepIndex: number
}

interface WarmupState {
    steps: Array<{ text: string, type: 'link' | 'text' }>

}

function reducer(state: WarmupState, action: Actions) {
    const workingState = structuredClone(state)

    switch (action.type) {
        case 'add step': {
            const {text, type} = action.newStep;

            let cleanedUpContent = text
            if (type === 'link') {
                if (!cleanedUpContent.startsWith('http://') || !cleanedUpContent.startsWith('https://')) {
                    cleanedUpContent = `https://${cleanedUpContent}`
                }
            }

            workingState.steps = [...workingState.steps, {text: cleanedUpContent, type}]
            break;
        }
        case 'remove step':
            workingState.steps.splice(action.stepIndex)

            break;
        default:
            throw new Error("Unknown action " + JSON.stringify(action))
    }

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(workingState))

    return workingState;
}

function useWarmupSteps() {
    const maybeState = localStorage.getItem(LOCALSTORAGE_KEY);
    let initialState: WarmupState;
    if (maybeState) {
        initialState = JSON.parse(maybeState)
    } else {
        initialState = {steps: []}
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return {
        state,
        addStep: (newStep: { text: string, type: 'link' | 'text' }) => {
            dispatch({type: 'add step', newStep})
        },
        removeStep: (stepIndex: number) => {
            dispatch({type: 'remove step', stepIndex})
        }
    }
}

export function WarmupAccordion() {
    const [content, setContent] = useState<string>("");
    const {state: {steps}, addStep, removeStep} = useWarmupSteps();


    function stepHandler(type: 'link' | 'text') {
        addStep({text: content, type})
        setContent("")
    }

    return <Accordion header={"Warmup"} footerButtons={[]}>
        Warmup steps:
        <ol>
            {steps.map(((step, index) => {
                const inner = step.type === 'text' ? step.text : <a href={step.text} target={"_blank"}>{step.text}</a>

                return <li className={'has-text-left'} key={`${index}-${step.text}`}>
                    {inner}
                    <button onClick={() => removeStep(index)} className={'is-pulled-right'}><span className={'icon is-small is-right'}><i className="fas fa-minus" aria-hidden="true"></i></span></button>
                </li>
            }))}
        </ol>
        <textarea value={content} onInput={e => setContent(e.currentTarget.value)} className="textarea"
                  placeholder="A step in your warmup would be..."></textarea>

        <div className="field has-addons is-justify-content-center">
            <p className={'control'}>
                <button onClick={() => stepHandler('text')} className="button">
                    <span>Add text</span>
                </button>
            </p>
            <p className={'control'}>
                <button onClick={() => stepHandler('link')} className="button">
                    <span>Add link</span>
                </button>
            </p>

        </div>
    </Accordion>
}