// src/components/layout/Sidebar.vue
<script setup>
import { ref } from 'vue'
const isSidebarOpen = ref(true)

const emit = defineEmits(['toggle'])
</script>

<template>
  <div :class="[isSidebarOpen ? 'w-64' : 'w-20', 'bg-white shadow-lg transition-all duration-300']">
    <div class="p-4 border-b">
      <h2 class="text-2xl font-bold text-blue-600">TychomedLink</h2>
    </div>

    <nav class="mt-6">
      <div class="px-4">
        <a href="#" class="flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span :class="[isSidebarOpen ? 'ml-3' : 'hidden']">Dashboard</span>
        </a>
      </div>

      <div class="px-4 mt-4">
        <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span :class="[isSidebarOpen ? 'ml-3' : 'hidden']">Kullanıcılar</span>
        </a>
      </div>

      <div class="px-4 mt-4">
        <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span :class="[isSidebarOpen ? 'ml-3' : 'hidden']">Raporlar</span>
        </a>
      </div>
    </nav>

    <!-- Toggle Button -->
    <div class="absolute bottom-4 left-4">
      <button @click="emit('toggle')" class="text-gray-600 hover:text-gray-800">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>
</template>
