import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
});
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: "autoUpdate",
//       manifest: {
//         name: "Mi negocio.com",
//         short_name: "Mi Negocio",
//         description: "Mi aplicación como Progressive Web App",
//         theme_color: "#000000",
//         background_color: "#ffffff",
//         display: "standalone",
//         start_url: "/",
//         icons: [
//           {
//             src: "/icons/icon-192x192.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "/icons/icon-512x512.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//         ],
//       },
//       workbox: {
//         runtimeCaching: [
//           {
//             urlPattern: ({ request }) => request.destination === "image",
//             handler: "CacheFirst",
//             options: {
//               cacheName: "images-cache",
//               expiration: {
//                 maxEntries: 10,
//                 maxAgeSeconds: 60 * 60 * 24 * 30,
//               },
//             },
//           },
//         ],
//       },
//     }),
//   ],
//   server: {
//     host: "0.0.0.0",
//   },
// });
