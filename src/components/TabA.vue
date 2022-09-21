<template>
  AAA
</template>

<script setup lang="ts">
  onMounted(() => {
    console.log('加载')
  })
  onActivated(() => {
    console.log('激活')
  })
  onDeactivated(() => {
    console.log('离开')
  })
</script>