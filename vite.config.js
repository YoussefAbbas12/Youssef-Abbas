import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 5000,
  },

  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',

    // Increase chunk size warning limit (heavy 3D libs)
    chunkSizeWarningLimit: 1500,

    // Use terser for production minification (removes dead code aggressively)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,    // Remove all console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,             // Two passes for better compression
      },
      mangle: {
        safari10: true,        // Fix Safari 10 bug
      },
      format: {
        comments: false,       // Remove all comments from output
      }
    },

    rollupOptions: {
      output: {
        // Organize output files properly
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          if (/\.(png|jpe?g|gif|webp|svg|ico)$/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.(woff2?|ttf|otf|eot)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          if (/\.css$/i.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },

        // Aggressive code splitting for optimal caching
        manualChunks(id) {
          // React core (changes rarely → long cache life)
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }

          // React Router
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }

          // Animation libraries
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }

          // Three.js core (very heavy, separate chunk)
          if (id.includes('node_modules/three/')) {
            return 'vendor-three';
          }

          // React Three Fiber ecosystem
          if (
            id.includes('node_modules/@react-three/fiber') ||
            id.includes('node_modules/@react-three/drei') ||
            id.includes('node_modules/@react-three/rapier')
          ) {
            return 'vendor-r3f';
          }

          // Spline (very heavy, load last)
          if (
            id.includes('node_modules/@splinetool/react-spline') ||
            id.includes('node_modules/@splinetool/runtime')
          ) {
            return 'vendor-spline';
          }

          // Mesh utilities
          if (id.includes('node_modules/meshline')) {
            return 'vendor-meshline';
          }

          // UI utilities & icons
          if (
            id.includes('node_modules/react-icons') ||
            id.includes('node_modules/lucide-react')
          ) {
            return 'vendor-icons';
          }

          if (
            id.includes('node_modules/clsx') ||
            id.includes('node_modules/tailwind-merge')
          ) {
            return 'vendor-utils';
          }

          // Supabase
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase';
          }
        },
      },
    },

    // Generate source maps only in dev (not production)
    sourcemap: false,

    // CSS code splitting for better caching
    cssCodeSplit: true,
  },

  // Pre-bundle frequently used dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'three',
      'clsx',
      'tailwind-merge',
    ],
    exclude: [
      '@splinetool/runtime', // Exclude heavy runtime from pre-bundling
    ],
  },

  // Improve resolve performance
  resolve: {
    alias: {
      // Ensures React is always the same instance
      'react': 'react',
    },
  },
})
