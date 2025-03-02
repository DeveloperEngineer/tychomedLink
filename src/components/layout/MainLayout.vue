<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar @toggle="toggleSidebar" />

    <div class="flex-1 overflow-x-hidden overflow-y-auto">
      <slot></slot>
    </div>
  </div>
</template>
