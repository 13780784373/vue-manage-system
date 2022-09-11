<template>
	<div class="sidebar">
		<el-menu
			class="sidebar-el-menu"
			:default-active="activeMenu"
			:collapse="sidebar.collapse"
			background-color="#324157"
			text-color="#bfcbd9"
			active-text-color="#20a0ff"
			unique-opened
			router
		>
			<SidebarItem
				v-for="route in routes"
				:key="route.path"
				:item="route"
				:base-path="route.path"
				:is-collapse="sidebar.collapse"
			/>
		</el-menu>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SidebarItem from './SidebarItem.vue'
import { useSidebarStore } from '@/store/sidebar';
import { useRoute } from 'vue-router';
import { routes } from "@/router";

const route = useRoute();
const sidebar = useSidebarStore()
const activeMenu = computed(() => {
	const { meta, path } = route
	if (meta !== null || meta !== undefined) {
		if (meta.activeMenu) {
			return meta.activeMenu as string
		}
	}
	return path
})
</script>

<style scoped>
.sidebar {
	display: block;
	position: absolute;
	left: 0;
	top: 70px;
	bottom: 0;
	overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
	width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
	width: 250px;
}
.sidebar > ul {
	height: 100%;
}

</style>
