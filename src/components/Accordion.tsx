import {type ReactNode, useState} from "react";

interface AccordionProps {
    header: ReactNode,
    children: ReactNode,
    footerButtons: Array<{
        text: string,
        onClick: () => void
    }>
}

export function Accordion({header, children, footerButtons}: AccordionProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return <div className={'card'}>
        <header className={'card-header'} onClick={(ev) => {
            // only close and open when clicking the header
            const eventSource = (ev.target as HTMLElement).dataset['location']
            if (eventSource === 'card-header') {
                setIsOpen(o => !o)
            }
        }}>
            <div className="card-header-title" data-location={"card-header"}>{header}</div>
            <button className="card-header-icon" aria-label="more options" data-location={"card-header"}>
                      <span className="icon" data-location={"card-header"}>
                          {!isOpen && <i className="fa fa-angle-down" aria-hidden="true" data-location={"card-header"}/>}
                          {isOpen && <i className="fa fa-angle-up" aria-hidden="true" data-location={"card-header"}/>}
                      </span>
            </button>
        </header>

        <div className={`card-content ${isOpen ? "" : "is-hidden"}`}>
            {children}
        </div>

        <footer className={'card-footer'}>
            {footerButtons.map(f =>
                <div className={'card-footer-item'} onClick={() => f.onClick()}>{f.text}</div>
            )}
        </footer>
    </div>
}