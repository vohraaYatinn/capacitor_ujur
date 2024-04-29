import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'npm install @capacitor/ios @capacitor/android',
  webDir: 'build',
  server: {
    androidScheme: 'http'
  }
};

export default config;
