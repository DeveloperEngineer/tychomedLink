<script setup>
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UserIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])


</script>

<template>
  <aside class="fixed inset-y-0 left-0 bg-white w-64 border-r border-gray-200 z-30">
    <!-- Logo -->
    <router-link to="/" class="flex items-center px-6 py-3 border-b">
      TychomedLink
    </router-link>

    <!-- Navigation -->
    <nav class="mt-6 px-3">
      <div class="space-y-3">
        <!-- Dashboard -->
        <router-link to="/" class="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900">
          <HomeIcon class="w-5 h-5 mr-3" />
          Dashboard
        </router-link>

        <!-- Users -->
        <router-link to="/" class="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900">
          <UsersIcon class="w-5 h-5 mr-3" />
          Users
        </router-link>

        <!-- Tasks -->
        <router-link to="/" class="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900">
          <ClipboardDocumentListIcon class="w-5 h-5 mr-3" />
          Tasks
        </router-link>

        <!-- Reports -->
        <router-link to="/" class="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900">
          <ChartBarIcon class="w-5 h-5 mr-3" />
          Reports
        </router-link>

        <!-- Settings -->
        <router-link to="/" class="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900">
          <Cog6ToothIcon class="w-5 h-5 mr-3" />
          Settings
        </router-link>
      </div>

      <!-- User Profile -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t">
        <div class="flex items-center">
          <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <UserIcon class="w-5 h-5 text-gray-500" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-700">John Doe</p>
            <p class="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </nav>
  </aside>

  <!-- Main Content -->
  <div class="pl-64">
    <slot></slot>
  </div>
</template>
