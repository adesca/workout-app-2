interface Props {
    onCheck(option: string, newValue: boolean): void
}

export function BasicEquipmentFilter({onCheck}: Props) {

    return <>
        <div>
            <label className={'label'}>What equipment do you have?</label>
        </div>
        <div className={'checkboxes pb-2'}>
            <label className={'pr-2 checkbox label'}>
                <input type={'checkbox'} name={'dumbbell'}
                       onChange={e => onCheck(e.target.name, e.target.checked)}/> Dumbbell
            </label>
            <label className={'pr-2 checkbox label'}>
                <input type={'checkbox'} name={'barbell'}
                       onChange={e => onCheck(e.target.name, e.target.checked)}/> Barbell
            </label>
            <label className={'checkbox label'}>
                <input type={'checkbox'} name={'body weight'}
                       onChange={e => onCheck(e.target.name, e.target.checked)}/> Body Weight
            </label>
        </div>
    </>
}

