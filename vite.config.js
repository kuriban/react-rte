import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { rmSync } from 'fs';

// 🧹 очищаем lib перед сборкой (аналог rimraf)
rmSync('lib', { recursive: true, force: true });

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@babel/plugin-transform-flow-strip-types'],
      },
    }),
  ],
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      globalModulePaths: [/\.global\.css$/],
    },
  },
  publicDir: 'assets',
  
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.(jsx)$/,
  },
  
  build: {
    sourcemap: true,
    outDir: 'lib',
    target: 'es2018',
    lib: {
      entry: path.resolve(__dirname, 'src/RichTextEditor.jsx'),
      name: 'ReactRTE',
      formats: ['es', 'cjs'], // можно добавить ESM-сборку
      fileName: (format) => (format === 'es' ? 'react-rte.esm.js' : 'react-rte.js'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'draft-js', 'immutable'],
      output: {
        entryFileNames: 'react-rte.js',
        exports: 'named',
      },
    },
  },
});
