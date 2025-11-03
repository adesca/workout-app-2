import {type ChangeEvent, useRef, useState} from "react";

interface Props <T> {
    search: (input: string) => Promise<T[]>;
    onSelect: (selectedInput: string, data?: T) => void;
    projection: (searchOutput: T) => string;
    initialValue?: string;
}

export function Typeahead<T>({search, onSelect, initialValue, projection}: Props<T>) {
    const ref = useRef<HTMLInputElement | null>(null);
    const [displayedOptions, setDisplayedOptions] = useState<T[]>([])


    function runSearch(ev: ChangeEvent<HTMLInputElement>) {
        search(ev.target.value).then(
            (result) => {
                setDisplayedOptions(result.slice(0, 5))
            }, () => {
            }
        )
    }

    function handleOptionClick(selectedText: string, optionData?: T) {
        if (ref.current) {
            ref.current.value = selectedText;
        }
        setDisplayedOptions([]);
        onSelect(selectedText, optionData)
    }

    const displayedOptionsHtml = displayedOptions.map(option => {
        const text = projection(option)
        return <div key={JSON.stringify(option)}
                    onClick={() => handleOptionClick(text, option)}
                    className={'dropdown-item'}>{text}</div>
    })

    return <div className={`dropdown ${displayedOptions.length > 0 ? 'is-active' : ''}`}>
        <div className={''}>
            <input className={'input'} type={'text'} onInput={runSearch} onClick={(e) => {console.log('clicked', e)}} ref={ref} defaultValue={initialValue}/>

        </div>
        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
            <div className="dropdown-content">
                <div key={'literal'} className={'dropdown-item'}
                     onClick={() => handleOptionClick(ref.current?.value || "")}>"{ref.current?.value}"
                </div>
                <hr className="dropdown-divider"/>
                {displayedOptionsHtml}

                <a href="#" className="dropdown-item"> More </a>
            </div>
        </div>
    </div>
}