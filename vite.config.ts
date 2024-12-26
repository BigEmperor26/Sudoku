import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ command, mode }) => {
  return {
      plugins: [
        react(),
        svgr({ include: '**/*.svg'})
      ],
      resolve: {
        root: './src',
        optimizeDeps: {
          link: ['crm-ui'],
        },
        alias: {
          'crm-ui': path.resolve(__dirname, '../crm-ui/src/index.ts'),
          'assets': path.resolve(__dirname, '../crm-ui/src/assets'),
          'stories': path.resolve(__dirname, '../crm-ui/src/stories'),
          'themes': path.resolve(__dirname, '../crm-ui/src/themes'),
          'ui-utils': path.resolve(__dirname, '../crm-ui/src/ui-utils'),
          'api': path.resolve(__dirname, 'src/api'),
          'common': path.resolve(__dirname, 'src/common'),
          'components': path.resolve(__dirname, 'src/components'),
          'pages': path.resolve(__dirname, 'src/pages'),
          'routes': path.resolve(__dirname, 'src/routes'),
          'socket': path.resolve(__dirname, 'src/socket'),
          'store': path.resolve(__dirname, 'src/store'),
          'translations': path.resolve(__dirname, 'src/translations'),
          'user': path.resolve(__dirname, 'src/user'),
          'utils': path.resolve(__dirname, 'src/utils'),
        }
      }
  };
});