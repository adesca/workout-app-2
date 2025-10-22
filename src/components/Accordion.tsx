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
        <header className={'card-header'} onClick={() => {
            setIsOpen(o => !o)
        }}>
            <p className="card-header-title">{header}</p>
            <button className="card-header-icon" aria-label="more options">
                      <span className="icon">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
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