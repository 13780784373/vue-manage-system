<template>A</template>
<script setup lang="ts">
onActivated(() => {
  console.log('激活')
})
onDeactivated(() => {
  console.log('离开')
})
</script>