import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {useState} from "react";

const links = [{route: '/',  text: 'Home'}, {route: '/muscles', text: 'Muscle Visualizer'}, {route: '/workout-tracker', text: 'Workout Tracker'}]
const navbarItems = links.map(({route, text}) => <Link key={route} to={route} className="navbar-item">
    {text}
</Link>)

const RootLayout = () => {
    const [navbarIsOpen, setNavbarIsOpen] = useState<boolean>(true);
    console.log('nav is open', navbarIsOpen)

    return (
        <div>
            <div className={`card `}>
                <aside className="menu">
                    <ul className={`menu-list ${navbarIsOpen ? "" : "is-hidden"}`}>
                        {navbarItems}
                    </ul>
                    <p className="menu-label" onClick={() => setNavbarIsOpen(e => !e)}>Navigation</p>

                </aside>
            </div>



            {/*<nav className="navbar mb-5" role="navigation" aria-label="main navigation">*/}
            {/*    <div className={`navbar-item has-dropdown is-active`} onClick={() => setNavbarIsOpen(e => !e)}>*/}
            {/*        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"*/}
            {/*           data-target="navbarBasicExample">*/}
            {/*            <span aria-hidden="true"></span>*/}
            {/*            <span aria-hidden="true"></span>*/}
            {/*            <span aria-hidden="true"></span>*/}
            {/*            <span aria-hidden="true"></span>*/}
            {/*        </a>*/}

            {/*        <div className="navbar-dropdown">*/}
            {/*            asdf*/}
            {/*            /!*{navbarItems}*!/*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    /!*<div id="navbarBasicExample" className="navbar-menu">*!/*/}
            {/*    /!*    <div className="navbar-start">*!/*/}
            {/*    /!*        {navbarItems}*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</nav>*/}


            <Outlet/>
            <TanStackRouterDevtools/>
        </div>
    )
}

export const Route = createRootRoute({component: RootLayout})