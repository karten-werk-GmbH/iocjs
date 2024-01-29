import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/IocContainer.ts"),
      name: "iocjs",
      fileName: "iocjs",
    },
  },
  plugins: [dts({ include: ["./src/IocContainer.ts"], outDir: "dist" })],
});
