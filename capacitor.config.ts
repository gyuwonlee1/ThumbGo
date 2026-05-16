import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.thumblab.tester",
  appName: "ThumbLab Tester",
  webDir: "out",
  server: {
    androidScheme: "https"
  }
};

export default config;
