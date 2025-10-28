import {type ChangeEvent, type SetStateAction, useRef, useState} from "react";

interface Props {
    search: (input: string) => Promise<string[]>;
    onSelect: (selectedInput: string) => void;
}

export function Typeahead({search, onSelect}: Props) {
    const ref = useRef<HTMLInputElement | null>(null);
    const [displayedOptions, setDisplayedOptions] = useState<string[]>([])


    function runSearch(ev: ChangeEvent<HTMLInputElement>) {
        search(ev.target.value).then(
            (result: string[]) => {
                // console.log('results', result)
                setDisplayedOptions(result)
            }, () => {}
        )
    }

    function handleOptionClick(option: string) {
        setDisplayedOptions([]);
        onSelect(option)
    }

    return <div className={`dropdown ${displayedOptions.length > 0 ? 'is-active' : ''}`}>
        <div>
            <input onInput={runSearch} ref={ref}/>
        </div>
        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
            <div className="dropdown-content">
                <div key={'literal'} className={'dropdown-item'}
                     onClick={() => handleOptionClick(ref.current?.value || "")}>"{ref.current?.value}"</div>
                <hr className="dropdown-divider"/>
                {displayedOptions.map(option => <div key={option} onClick={() => handleOptionClick(option)}
                                                     className={'dropdown-item'}>{option}</div>)}

                <a href="#" className="dropdown-item"> More </a>
            </div>
        </div>
    </div>
}