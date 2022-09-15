import { defineConfig } from 'vite';
import { resolve } from 'path'  
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'
import { fa } from 'element-plus/es/locale';
export default defineConfig({
	//静态资源服务的文件夹
	publicDir: "public",
	base: './',
	//静态资源处理
	assetsInclude: "",
	//控制台输出的级别 info 、warn、error、silent
	logLevel: "info",
	// 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
	clearScreen: true,
	resolve: {                                       
		alias: {
			'@': resolve(__dirname, 'src')         
		}                                            
	},
	css: {
    preprocessorOptions: {
      scss: {
        // 两种方式都可以
        additionalData: '@import "@/styles/index.scss";'
        // additionalData: '@use "@/styles/index.scss" as *;'
      }
    }
  },
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			imports: ["vue","vue-router", "pinia"],
			resolvers: [ElementPlusResolver()],
			dts: resolve(resolve(__dirname,'src'), "auto-imports.d.ts"),
		}),
		Components({
			resolvers: [ElementPlusResolver()],
			dts: resolve(resolve(__dirname,'src'), "components.d.ts")
		}),
		viteCompression({
			verbose: true,
			disable: false,
			threshold: 10240,
			algorithm: 'gzip',
			ext: '.gz',
		}),
		viteImagemin({
			gifsicle: {
				optimizationLevel: 7,
				interlaced: false
			},
			optipng: {
				optimizationLevel: 7
			},
			mozjpeg: {
				quality: 20
			},
			pngquant: {
				quality: [0.8, 0.9],
				speed: 4
			},
			svgo: {
				plugins: [
					{
						name: 'removeViewBox'
					},
					{
						name: 'removeEmptyAttrs',
						active: false
					}
				]
			}
		})
	],
	optimizeDeps: {
		include: ['schart.js']
	},
  build: {
    outDir: "dist",
    // 9月更新
    assetsDir: "assets", //指定静态资源存放路径
    sourcemap: false, //是否构建source map 文件
		chunkSizeWarningLimit: 1500,
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
		rollupOptions: {
			output: {
				chunkFileNames: 'static/js/[name]-[hash].js',
				entryFileNames: 'static/js/[name]-[hash].js',
				assetFileNames: 'static/[ext]/[name].[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
		}
	},
	server:{
		host: '127.0.0.1',
		port: 3000,
		strictPort: true, // 端口被占用直接退出
		https: false,
		open: false,// 在开发服务器启动时自动在浏览器中打开应用程序
		proxy: {
			'/api': {
					target: 'http://172.16.70.239:30000',
					changeOrigin: true,
					secure: false,
					rewrite: (path) => path.replace(/^\/api/, '')
			}
		},
		hmr:{
			overlay: false // 屏蔽服务器报错
		}
	}
});
