import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tanstackRouter from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
    base: '/workout-app-2',
    plugins: [
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true
        }),
        react()
    ],
    optimizeDeps: {
        exclude: ['@electric-sql/pglite']
    }
})
