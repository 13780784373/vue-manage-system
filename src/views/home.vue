<template>
	<v-header />
	<v-sidebar />
	<div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
		<v-tags></v-tags>
		<div class="content">
			<router-view v-slot="{ Component }">
				<transition name="move" mode="out-in">
					<keep-alive :include="tags.nameList">
						<component :is="Component" :key="route.name" />
					</keep-alive>
				</transition>
			</router-view>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useSidebarStore } from '@/store/modules/sidebar';
import { useTagsStore } from '@/store/modules/tags';
import vHeader from '@/components/header.vue';
import vSidebar from '@/components/SideBar/index.vue';
import vTags from '@/components/tags.vue';

const sidebar = useSidebarStore();
const tags = useTagsStore();
const route = useRoute()
</script>
