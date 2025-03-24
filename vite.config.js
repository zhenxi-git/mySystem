import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router", "vue-i18n",
        //import {default as axios} from "axios" ====>import axios from "axios"
        { "axios": [
          ['default', 'axios']
        ] },
        {
          'xlsx': [
            'read',
            'write',
            "writeFile",
            "writeFileXLSX",
            'utils' // 按需导入关键方法
          ]
        }
      ],//自动导入
      dirs: ['./src/utils']//配置本地目录的自动引入
     
    }),
    Components({
      resolvers: [ElementPlusResolver(),
        //如何自定义resolver来支持自己开发的组件
        // (componentsName) => {
        //   if (componentsName.indexOf("My") !== -1) {
        //     return {
        //       "name": componentsName,
        //       from:"组件库名称",
        // sideEffects: "样式",
        //     };
        //   }
        // }
      ],
      dirs: ['.src/components'] //配置本地目录的组件的自动引入
    }),
    // visualizer({
    //   open: true,
    //   gzipSize: true
    // })
  ],
  resolve: {
    alias: {
      '@': "./src"
    },
  },
  base:"./",
  build:{
   outDir:"dist",
   assetsDir:"static",
  //  sourcemap:process.env.NODE_ENV!=='production',
  //  minify:"terser",
   terserOptions:{
    compress:{
      drop_console:true,
      drop_debugger:true
    }
   },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0]
          }
        }
      }
    }
  },
  server: {
    //解决跨域
    // proxy:{
    //   '/admin':{ //拦截路径
    //     target:""， //跳转新的地址
    //     changeOrigin:true, //解决跨域开启

    //   }

    // }
  }
});
