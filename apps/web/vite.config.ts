import { defineConfig, mergeConfig } from 'vite';
// https://github.com/vitejs/vite/issues/5370
import { viteConfig } from '../../packages/vite'

export default mergeConfig(viteConfig, defineConfig({}));