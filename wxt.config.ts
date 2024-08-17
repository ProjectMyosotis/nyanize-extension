import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifestVersion: 2,
    manifest: {
        "name": "Nyanize Extension",
        "short_name": "Nyanize",
        "version": "3.0.0.1",
        "description": "nyanize all website",
        "browser_action": {
            "default_title": "Nyanize Options",
            "default_icon": {
                "19": "icon/gear19.png",
                "38": "icon/gear38.png"
            },
        },
        "permissions": [
            "storage"
        ]
    }

});
