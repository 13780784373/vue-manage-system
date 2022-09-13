<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <SidebarItemLink
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
          <el-icon v-if="theOnlyOneChild.meta.icon">
            <component :is="theOnlyOneChild.meta.icon" />
          </el-icon>
          <template #title>{{ theOnlyOneChild.meta.title }}</template>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{item.meta.title}}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
// import { PropType } from 'vue'
// import { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
  const props = defineProps({
    item: {
      // type: Object as PropType<RouteRecordRaw>,
      type: Object,
      required: true
    },
    isCollapse: {
      type: Boolean,
      required: false
    },
    basePath: {
      type: String,
      required: true
    }
  })
  const alwaysShowRootMenu = computed(() => {
      if (props.item.meta && props.item.meta.alwaysShow) {
        return true
      } else {
        return false
      }
    })

    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item: any) => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    })

    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) {
        return null
      }
      if (props.item.children) {
        for (const child of props.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // If there is no children, return itself with path removed,
      // because this.basePath already conatins item's path information
      return { ...props.item, path: '' }
    })
   
    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return routePath ? `${props.basePath}/${routePath}` : props.basePath
    }
</script>
<style>
    /*隐藏文字*/
  .el-menu--collapse .el-sub-menu__title span{
    display: none !important;
  }

  /*隐藏 > */
  .el-menu--collapse .el-sub-menu__title .el-submenu__icon-arrow {
    display: none;
  }
</style>