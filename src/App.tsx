import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SearchFilters} from "./components/SearchFilters.tsx";



function App() {
    const queryClient = new QueryClient()

    return (
        <>
            <QueryClientProvider client={queryClient} >
                <SearchFilters />
            </QueryClientProvider>

        </>
    )
}

export default App
