<!--
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-25 11:34:20
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-27 19:17:44
-->

<template>
  <a
    v-if="isExternal(to)"
    :href="to"
    target="_blank"
    rel="noopener"
  >
    <slot />
  </a>
  <div
    v-else
    @click="push"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate'
import { useRouter } from 'vue-router'
  const props = defineProps({
    to: {
      type: String,
      required: true
    }
  })
  const router = useRouter()
    const push = () => {
      // console.log(props.to)
      router.push(props.to).catch((err) => {
        console.log(err)
      })
    }

</script>
