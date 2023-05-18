import react from '@vitejs/plugin-react-swc';
import { defineConfig, splitVendorChunkPlugin } from 'vite';

export const viteConfig = defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
  ],
  envPrefix: 'REACT_APP_',
  build: {
    minify: true,
    outDir: 'dist/client',
    reportCompressedSize: false,
    sourcemap: false,
    ssrManifest: true,
  },
  define: {
    'process.env': (
      Object.keys(process.env).reduce((accumulator: any, key: string) => {
        if (key.startsWith('REACT_APP_')) {
          accumulator[key] = process.env[key];
        }

        return accumulator;
      }, {})
    )
  },
});