import * as React from "react";
import {type ChangeEvent, useCallback, useEffect, useState} from "react";

interface Props {
    onCheck(option: string, newValue: boolean): void
}

export function BasicEquipmentFilter({onCheck}: Props) {

    // function handleEquipmentCheck(ev: ChangeEvent<HTMLInputElement>) {
    //     // console.log(ev)
    //     setEquipmentFilter(e => {
    //         const retval = {
    //             ...e,
    //             [ev.target.name]: ev.target.checked
    //         };
    //
    //         const checkedEquipment = Object.entries(equipmentFilter).filter(([, checked]) => {
    //             return checked
    //         }).map(([equipmentName]) => equipmentName)
    //
    //
    //         onEquipmentSelectChange(checkedEquipment)
    //
    //         return retval
    //     })
    //     // setEquipmentFilter(e => ({
    //     //     ...e,
    //     //     [ev.target.name]: ev.target.checked
    //     // }))
    // }

    return <>
        <label className={'pr-2'}>
            <input type={'checkbox'} name={'dumbbell'} onChange={e => onCheck(e.target.name, e.target.checked)}/>
            Dumbbell
        </label>
        <label className={'pr-2'}>
            <input type={'checkbox'} name={'barbell'} onChange={e => onCheck(e.target.name, e.target.checked)}/>Barbell
        </label>
        <label>
            <input type={'checkbox'} name={'body weight'} onChange={e => onCheck(e.target.name, e.target.checked)}/>Body Weight
        </label>
    </>
}

