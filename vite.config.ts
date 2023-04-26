import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const pathSrc = path.resolve(__dirname, "src")
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
      eslintrc: {
        enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false 
        filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
      },
      resolvers: [ElementPlusResolver()],
      vueTemplate: true, // 是否在 vue 模板中自动导入
      dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(pathSrc, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
    }),
  ],
  //解决“vite use `--host` to expose”
  base: './',	//不加打包后白屏
  server: {
    host: '0.0.0.0',
    // port: 8080,      
    open: true, // 运行时是否自动打开浏览器
    // proxy: {
    //   '/api': {
    //     target: 'your https address',
    //     changeOrigin: true,
    //     rewrite: (path: string) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  resolve: {
    //别名配置，引用src路径下的东西可以通过@如：import Layout from '@/layout/index.vue'
    alias: {
      "@": pathSrc,
    }
  }
})
