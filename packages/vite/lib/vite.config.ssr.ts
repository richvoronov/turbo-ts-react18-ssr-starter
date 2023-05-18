import { defineConfig, mergeConfig } from 'vite';
import { viteConfig } from './vite.config.ts';

export const viteSsrConfig = mergeConfig(viteConfig, defineConfig({
  build: {
    outDir: 'dist/server',
    ssr: 'src/entryServer.tsx',
  },
  publicDir: false,
}));
