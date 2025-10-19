import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RandomExercises} from "./components/randomExercises/RandomExercises.tsx";



function App() {
    const queryClient = new QueryClient()

    return (
        <>
            <QueryClientProvider client={queryClient} >
                <RandomExercises />
            </QueryClientProvider>

        </>
    )
}

export default App
