import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

const svgrOptions = {
  // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include.
  include: '**/*.svg?react',
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(svgrOptions)],
  server: { host: true },
});
