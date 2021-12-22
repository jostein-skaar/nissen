import { VitePWA } from 'vite-plugin-pwa';

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/**.{json,png}'],
      manifest: false,
    }),
  ],
};
