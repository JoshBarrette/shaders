import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "watch-frag-files",
      handleHotUpdate({ file, server }) {
        if (
          file.endsWith(".frag") ||
          file.endsWith(".vert") ||
          file.endsWith(".comp")
        ) {
          server.ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      },
    },
  ],
});
