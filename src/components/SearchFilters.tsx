import {useBodyParts, useEquipment, useSearchExercises} from "../queries.ts";
import {useState} from "react";
import {ExerciseResults} from "./ExerciseResults.tsx";
import {useQueryClient} from "@tanstack/react-query";

export function SearchFilters() {
    const queryClient = useQueryClient()
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
    const [selectedBodyParts, setSelectedBodyParts] = useState<string>("")

    const {isLoading: isLoadingEquipment, isSuccess: equipmentSearchIsSuccess, data: equipment} = useEquipment();
    const {isLoading: isLoadingBodyParts, isSuccess: bodyPartsSearchIsSuccess, data: bodyparts} = useBodyParts();

    const {isLoading: isLoadingSearchResults, isSuccess: searchResultsIsSuccess, data: searchResults} = useSearchExercises({
        equipment: selectedEquipment, bodyParts: selectedBodyParts
    })

    console.log('search results', searchResultsIsSuccess, searchResults)



    function processEquipmentEvent(optionCollection: HTMLCollectionOf<HTMLOptionElement>) {
        const selectedOptions: string[] = [];
        for (const option of optionCollection) {
            selectedOptions.push(option.value)
        }

        setSelectedEquipment(selectedOptions)
    }

    async function search() {
        console.log('searching for', selectedEquipment, selectedBodyParts)
        await queryClient.fetchQuery({queryKey: ['search-exercises', selectedBodyParts, selectedEquipment]})
    }

    return <>
        <div>
            <div className={'field'}>
                <label className={'label'}>Equipment</label>
                <div className={`select ${isLoadingEquipment ? 'is-loading' : ''} is-multiple`}>
                    <select multiple onChange={e => processEquipmentEvent(e.target.selectedOptions)}>
                        {equipmentSearchIsSuccess && equipment.map(e => <option key={e.name}
                                                                                value={e.name}>{e.name}</option>)}
                    </select>
                </div>
                <p className={'help'}>Select equipment to filter by</p>
            </div>

            <div className={'field'}>
                <label className={'label'}>Body parts</label>
                <div className={`select ${isLoadingBodyParts ? 'is-loading' : ''}`}>
                    <select onChange={e => setSelectedBodyParts(e.target.selectedOptions.item(0)!.value)}>
                        {bodyPartsSearchIsSuccess && bodyparts.map(b => <option key={b.name}
                                                                                value={b.name}>{b.name}</option>)}
                    </select>
                </div>
                <p className={'help'}>What body part do you want to hit?</p>
            </div>

            <button onClick={search}>Search</button>
        </div>

        {searchResultsIsSuccess && <ExerciseResults exercises={searchResults} />}

    </>
}