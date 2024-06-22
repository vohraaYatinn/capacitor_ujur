import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'UJUR',
  webDir: 'build',
  plugins: {
    Filesystem: {
      webDir: "www"
    },
    ScreenOrientation: {
      orientation: 'portrait'
    }
  }
};

export default config;
