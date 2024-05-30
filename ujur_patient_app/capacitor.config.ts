import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'npm install @capacitor/ios @capacitor/android',
  webDir: 'build',
  server: {
    androidScheme: 'http'
  },
  plugins: {
    Filesystem: {
      webDir: "www"
    },
        Razorpay: {
      key: 'rzp_live_6Q4vEajbmruIsE'
    }
  }
};

export default config;
