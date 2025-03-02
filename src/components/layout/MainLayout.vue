<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-100">
    <!-- Overlay -->
    <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
        @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <div
        :class="[
        'fixed md:relative z-30 transform transition-transform duration-300 ease-in-out h-full',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        'w-64 md:w-64'
      ]"
    >
      <Sidebar
          :is-open="isSidebarOpen"
          @toggle="toggleSidebar"
      />
    </div>

    <!-- Main Content -->
    <div class="flex-1 md:ml-0">
      <!-- Header -->
      <div class="bg-white shadow-sm md:hidden">
        <button
            @click="toggleSidebar"
            class="p-4 text-gray-600 hover:text-gray-800"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-x-hidden overflow-y-auto">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
