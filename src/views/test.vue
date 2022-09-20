<template>
  <div>
    姓名: {{ test.name }}<br>
    <el-button @click="changeName">修改</el-button>
    <ul>
      <li @click="haha('TabA')">AAAA</li>
      <li @click="haha('TabB')">BBBB</li>
    </ul>
    <keep-alive>
      <component :is="CurrentCompoent[com]"></component>
    </keep-alive>
  </div>
</template>
<script setup lang="ts" >
  import { testStore } from '@/store/test'
  import { defineAsyncComponent, markRaw, reactive, ref } from 'vue';
  const CurrentCompoent:any = reactive({
    TabA: markRaw(defineAsyncComponent(() => import('@/components/TabA.vue'))),
    TabB: markRaw(defineAsyncComponent(() => import('@/components/TabB.vue')))
  })
  const test = testStore()
  const com = ref('TabA')
  const changeName = () => {
    // test.name = '李白'
    test.chnageName('李白')
  }
  const haha = (val:string) => {
    com.value = val
  }
  
</script>

<style lang="scss" scoped>
  ul  {
    display: flex;
    li {
      display: inline-block;
      width: 100px;
      height: 20px;
      list-style: none;
      cursor: pointer;
    }
  }
</style>