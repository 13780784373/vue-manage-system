import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import { usePermissStore } from '@/store/permiss'
const Home = () => import ("@/views/home.vue")

export const routes:RouteRecordRaw[] = [
    { path: '/', redirect: '/dashboard' }, 
    {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "Odometer", permiss: '1' },
        component: Home,
        children: [
            {
                path: "",
                name: "dashboard",
                meta: { title: '系统首页', icon: "Setting", permiss: '1' },
                component: () => import ("@/views/dashboard.vue")
            }
        ]
    },
    {
        path: "/table",
        name: "basetable",
        meta: { permiss: '2' },
        component: Home,
        children: [
            {
                path: "",
                name: "basetable",
                meta: { title: '表格', icon: "Setting", permiss: '1', },
                component: () => import ("@/views/table.vue")
            }
        ]
    },
    {
        path: "/charts",
        name: "basecharts",
        meta: { permiss: '11' },
        component: Home,
        children: [
            {
                path: "",
                name: "basecharts",
                meta: { title: '图表', icon: "Setting", permiss: '1', },
                component: () => import ("@/views/charts.vue")
            }
        ]
    },
    {
        path: "/permission",
        name: "permission",
        meta: {  permiss: '13' },
        component: Home,
        children: [
            {
                path: "",
                name: "permission",
                meta: { title: '权限管理', icon: "Setting", permiss: '1', },
                component: () => import ("@/views/permission.vue")
            }
        ]
    },
    {
        path: "/form",
        name: "form",
        meta: { title: '表单', icon: "Setting", permiss: '1' },
        component: Home,
        children: [
            {
                path: "",
                name: "baseform",
                meta: { title: '基础表单', permiss: '1', },
                component: () => import ("@/views/form.vue")
            },
            {
                path: "upload",
                name: "upload",
                meta: { title: '文件上传', permiss: '6' },
                component: () => import ("@/views/upload.vue")
            },
            {
                path: "edit",
                name: "edit",
                meta: { title: '编辑器', permiss: '6' },
                component: () => import ("@/views/edit.vue"),
                children: [
                    {
                        path: '',
                        name: 'editor',
                        meta: { title: '富文本编辑器', permiss: '8' },
                        component: () => import ('@/views/editor.vue')
                    },
                    {
                        path: 'markdown',
                        name: 'markdown',
                        meta: { title: 'markdown编辑器', permiss: '9' },
                        component: () => import ('@/views/markdown.vue')
                    }
                ]
            }
  
        ]
    },
    {
        path: "/icon",
        name: "icon",
        meta: {permiss: '10' },
        component: Home,
        children: [
            {
                path: "",
                name: "icon",
                meta: { title: 'icon图标', icon: "Setting", permiss: '3', },
                component: () => import ("@/views/icon.vue")
            }
        ]
    },
    {
        path: "/tabs",
        name: "tabs",
        meta: { permiss: '3' },
        component: Home,
        children: [
            {
                path: "",
                name: "tabs",
                meta: { title: 'tab标签', icon: "Setting", permiss: '3', },
                component: () => import ("@/views/tabs.vue")
            }
        ]
    },
    {
        path: "/test",
        name: "test",
        meta: { permiss: '3' },
        component: Home,
        children: [
            {
                path: "",
                name: "test",
                meta: { title: '测试', icon: "Setting", permiss: '3', },
                component: () => import ("@/views/test.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        meta: { title: '登录', hidden: true },
        component: () => import ("@/views/login.vue")
    },
    {
        path: '/403',
        name: '403',
        meta: { title: '没有权限', hidden: true },
        component: () => import ('@/views/403.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

export default router;