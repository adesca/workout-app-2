import {useEquipment} from "./queries.ts";

export function SearchFilters() {
    const {isSuccess, data, status, isError, error} = useEquipment();
    console.log(status);
    if (isSuccess) {
        console.log(JSON.stringify(data))
    } else if(isError) {
        console.log(error)
    }
    // console.log(equipment);

    return <>
    </>
}