
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c974d77c52a24ff6901d79dcc1ee224a',
  appName: 'HopeCore Hub',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#9E78E9",
      showSpinner: false
    }
  }
};

export default config;
