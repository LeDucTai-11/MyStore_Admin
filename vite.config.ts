import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import checker from 'vite-plugin-checker';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      enableBuild: false,
    }),
  ],
  resolve: {
    alias: {
      '@components': pathResolve('src/modules/components'),
      '@shared': pathResolve('src/modules/shared'),
      '@appConfig': pathResolve('src/appConfig'),
      '@redux': pathResolve('src/redux'),
      '@queries': pathResolve('src/queries'),
      // '@modules': pathResolve('src/modules'),
      src: pathResolve('src'),
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  base: '/',
});
