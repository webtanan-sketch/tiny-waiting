import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist-module',
    emptyOutDir: true,
    lib: {
      entry: resolve(import.meta.dirname, 'src/module/index.ts'),
      formats: ['es'],
      fileName: () => 'tiny-waiting.js',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'lucide-react'],
    },
  },
});
