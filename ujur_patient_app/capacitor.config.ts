import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Ujur',
  webDir: 'build',
  plugins: {
    Filesystem: {
      webDir: "www"
    }
  }
};

export default config;
