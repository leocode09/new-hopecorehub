
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c974d77c52a24ff6901d79dcc1ee224a',
  appName: 'HopeCore Hub',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://c974d77c-52a2-4ff6-901d-79dcc1ee224a.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#9E78E9",
      showSpinner: false
    }
  }
};

export default config;
