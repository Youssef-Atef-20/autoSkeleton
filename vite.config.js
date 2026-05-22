import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],

    build: {
        lib: {
            entry: "src/index.js",

            name: "AutoSkeleton",

            formats: ["es"],

            fileName: () => "index.js"
        },

        rollupOptions: {
            external: ["react", "react-dom"],

            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM"
                },

                assetFileNames: assetInfo => {
                    if (assetInfo.name === "style.css") {
                        return "autoskeleton.css";
                    }

                    return assetInfo.name;
                }
            }
        }
    }
});