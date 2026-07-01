import { defineConfig } from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

// Le plugin ffmpeg() active l'export MP4 direct depuis l'éditeur
// (onglet Video Settings → exporter "Video (FFmpeg)").
// FFmpeg est installé automatiquement avec le paquet, rien à installer à la main.
export default defineConfig({
  plugins: [motionCanvas(), ffmpeg()],
});
