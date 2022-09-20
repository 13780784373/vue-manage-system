<template>
  <div>
    姓名: {{ test.name }}<br>
    <el-button @click="changeName">修改</el-button>
  </div>
</template>
<script setup lang="ts" >
  import { testStore } from '@/store/test'
  const test = testStore()
  const changeName = () => {
    // test.name = '李白'
    test.chnageName('李白')
  }
  
</script>