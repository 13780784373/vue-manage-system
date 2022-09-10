import { defineConfig } from 'vite';
import { resolve } from 'path'  
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
	// //静态资源服务的文件夹
	// publicDir: "public",
	// base: './',
	// //静态资源处理
	// assetsInclude: "",
	// //控制台输出的级别 info 、warn、error、silent
	// logLevel: "info",
	// // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
	// clearScreen: true,
	resolve: {                                       
		alias: {
			'@': resolve(__dirname, 'src')         
		}                                            
	},
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			imports: ["vue"],
			resolvers: [ElementPlusResolver()],
			dts: resolve(resolve(__dirname,'src'), "auto-imports.d.ts"),
		}),
		Components({
			resolvers: [ElementPlusResolver()],
			dts: resolve(resolve(__dirname,'src'), "components.d.ts")
		})
	],
	optimizeDeps: {
		include: ['schart.js']
	},
	server:{
		host: '127.0.0.1',
		//port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
		port: 3000,
		strictPort: true, // 端口被占用直接退出
		https: false,
		open: false,// 在开发服务器启动时自动在浏览器中打开应用程序
		proxy: {
			'^/api': {
					target: '',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, '')
			}
		},
		hmr:{
			// overlay: false // 屏蔽服务器报错
		}
	}
});
