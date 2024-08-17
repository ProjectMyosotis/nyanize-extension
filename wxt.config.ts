import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifestVersion: 3,
  manifest: {
    name: "Nyanize Extension",
    short_name: "Nyanize",
    version: "3.0.0.1",
    description: "nyanize all website",
    icons: {
        16: "/icon/gear16.png",
        19: "/icon/gear19.png",
        38: "/icon/gear38.png",
        48: "/icon/gear48.png",
        128: "/icon/gear128.png",
    },
    action: {
      default_title: "Nyanize Options",
      default_icon: {
        "16": "icon/gear16.png",
        "19": "icon/gear19.png",
        "38": "icon/gear38.png",
        "48": "icon/gear48.png",
      },
    },
    permissions: ["storage"],
  },
});
