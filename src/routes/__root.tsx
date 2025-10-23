import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
    <>
        <nav className="navbar mb-5" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/" className="navbar-item">
                        Home
                    </Link>

                    <Link to="/muscles" className="navbar-item">
                        Muscle visualizer
                    </Link>
                </div>
            </div>
        </nav>


        <Outlet/>
        <TanStackRouterDevtools/>
    </>
)

export const Route = createRootRoute({component: RootLayout})