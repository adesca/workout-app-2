import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RandomExercises} from "./components/randomExercises/RandomExercises.tsx";
import {EquipmentFilter} from "./components/EquipmentFilter.tsx";



function App() {
    const queryClient = new QueryClient()

    return (
        <>
            <QueryClientProvider client={queryClient} >
                <EquipmentFilter />
                <RandomExercises />
            </QueryClientProvider>

        </>
    )
}

export default App
