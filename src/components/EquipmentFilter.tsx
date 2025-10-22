import {useEquipment} from "../queries.ts";
import {Accordion} from "./Accordion.tsx";

export function EquipmentFilter() {
    const {status, data} = useEquipment()


    if (status === 'pending') {
        return "loading..."
    } else if (status === 'error') {
        return 'error'
    }

    return <>
        <h1 className={'title'}>What machines/equipment do you have?</h1>

        <Accordion header={"Equipment"} footerButtons={[]}>
            <fieldset>
                <div className={'grid'}>
                    {data.map(eq => <div className={'cell'}>
                        <label className={'checkbox'}>
                            <input type={'checkbox'}/> {eq.name}
                        </label>
                    </div>)}
                </div>
            </fieldset>

        </Accordion>

    </>
}