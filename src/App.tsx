import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RandomExercises} from "./components/randomExercises/RandomExercises.tsx";
import {EquipmentFilter} from "./components/EquipmentFilter.tsx";
import { RouterProvider, createRouter } from '@tanstack/react-router'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })
// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

function App() {
    const queryClient = new QueryClient()

    return (
        <>
            <QueryClientProvider client={queryClient} >
                <RouterProvider router={router} />
                {/*<EquipmentFilter />*/}
                {/*<RandomExercises />*/}
            </QueryClientProvider>

        </>
    )
}

export default App
