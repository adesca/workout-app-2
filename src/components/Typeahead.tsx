import {type ChangeEvent, type SetStateAction, useRef, useState} from "react";

interface Props {
    search: (input: string) => Promise<string[]>;
    onSelect: (selectedInput: string) => void;
    initialValue?: string;
}

export function Typeahead({search, onSelect, initialValue}: Props) {
    const ref = useRef<HTMLInputElement | null>(null);
    const [displayedOptions, setDisplayedOptions] = useState<string[]>([])


    function runSearch(ev: ChangeEvent<HTMLInputElement>) {
        search(ev.target.value).then(
            (result: string[]) => {
                // console.log('results', result)
                setDisplayedOptions(result.slice(0, 5))
            }, () => {
            }
        )
    }

    function handleOptionClick(option: string, ev: { preventDefault: () => void }) {
        if (ref.current) {
            ref.current.value = option;
        }
        setDisplayedOptions([]);
        onSelect(option)
    }

    function clearInput() {
        console.log('ghere')
        if (ref.current) {
            ref.current.value = "";
        }
        setDisplayedOptions([]);

    }

    return <div className={`dropdown ${displayedOptions.length > 0 ? 'is-active' : ''}`}>
        <div className={''}>
            <input className={'input'} type={'text'} onInput={runSearch} onClick={(e) => {console.log('clicked', e)}} ref={ref} defaultValue={initialValue}/>

            {/*<span className="icon is-small">*/}
            {/*  <i className="fa-solid fa-xmark" onClick={clearInput}></i>*/}
            {/*</span>*/}

        </div>
        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
            <div className="dropdown-content">
                <div key={'literal'} className={'dropdown-item'}
                     onClick={(e) => handleOptionClick(ref.current?.value || "", e)}>"{ref.current?.value}"
                </div>
                <hr className="dropdown-divider"/>
                {displayedOptions.map(option => <div key={option} onClick={(e) => handleOptionClick(option, e)}
                                                     className={'dropdown-item'}>{option}</div>)}

                <a href="#" className="dropdown-item"> More </a>
            </div>
        </div>
    </div>
}