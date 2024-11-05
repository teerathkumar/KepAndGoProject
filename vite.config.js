import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
                'resources/assets/css/nucleo-icons.css',
                'resources/assets/css/nucleo-svg.css',
                'resources/assets/css/soft-ui-dashboard.css',
                'resources/assets/js/core/popper.min.js',
                'resources/assets/js/core/bootstrap.min.js',
                'resources/assets/js/plugins/perfect-scrollbar.min.js',
                'resources/assets/js/plugins/smooth-scrollbar.min.js',
                'resources/assets/js/plugins/fullcalendar.min.js',
                'resources/assets/js/plugins/chartjs.min.js',
                'resources/assets/js/soft-ui-dashboard.min.js',
                'resources/assets/img/logo-ct.png'
            ],
            refresh: true,
        }),
        react(),
    ],
});
