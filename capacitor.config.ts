import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ekeeper',
  webDir: 'dist',
  server: {
    cleartext: true, // Allow HTTP
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
