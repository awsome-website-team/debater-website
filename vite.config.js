import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 1. 导入我们新安装的 vite-plugin-imagemin

export default defineConfig({
  plugins: [vue(),],
  
  // --- 其他配置保持不变 ---
  server: { watch: { usePolling: true } },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  base: 'https://static.xmuidebate.cn/', 
  build: { assetsDir: 'assets' }
})