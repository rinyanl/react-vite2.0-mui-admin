import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const { resolve } = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// 环境配置
let NODE_ENV = process.env.NODE_ENV || 'development';
let envFiles = [`.env.${NODE_ENV}`];

// 将配置添加到  process.env
for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

export default defineConfig({
    plugins: [react()],
    base: '/',
    server: {
        host: '0.0.0.0',
        port: process.env.VITE_APP_PORT,
        // proxy: {
        //     '/api': {
        //         target: 'http://127.0.0.1/',
        //         changeOrigin: true,
        //         rewrite: path => path.replace(/^\/api/, ''),
        //     },
        // },
    },
    build: {
        target: 'modules',
        outDir: 'dist',
        minify: 'terser', // 混淆器，terser构建后文件体积更小
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // 路径别名
        },
    },
});
