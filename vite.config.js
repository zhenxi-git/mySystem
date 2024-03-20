import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server:{
    //解决跨域
    // proxy:{
    //   '/admin':{ //拦截路径
    //     target:""， //跳转新的地址
    //     changeOrigin:true, //解决跨域开启

    //   }

    // }
  }
});
