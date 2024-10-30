import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
                'resources/assets/css/nucleo-svg.css',
                'resources/assets/css/soft-ui-dashboard.css?v=1.0.3'
            ],
            refresh: true,
        }),
        react(),
    ],
});
