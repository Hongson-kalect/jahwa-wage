import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

dotenv.config(); // load env vars from .env

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    SECRET_KEY: `"${process.env.REACT_APP_SECRET_KEY}"`, // wrapping in "" since it's a string
  },
});
