<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDataMatrixStore } from '@/stores/dataMatrixStore.js'
import { useUserStore } from '@/stores/userStore.js'

const route = useRoute()
const dataMatrixStore = useDataMatrixStore()
const userStore = useUserStore()

onMounted(async () => {
  await dataMatrixStore.fetchTasks()
  if (route.params.userId) {
    await userStore.fetchUserById(route.params.userId)
  }
  // console.log(route.params.userId)
})
</script>

<template>
  <div class="p-4 md:p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-800">
          {{ userStore.currentUser?.name }} - Matrix Details
        </h1>
        <router-link
            to="/"
            class="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Back
        </router-link>
      </div>
    </div>

    <!-- Matrix Data -->
    <div v-if="dataMatrixStore.isLoading" class="text-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
    </div>
    <div v-else-if="dataMatrixStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ dataMatrixStore.error }}
    </div>
    <div v-else>
      <div v-for="(taskData, taskKey) in dataMatrixStore.tasks[0]?.Tasks" :key="taskKey" class="mb-8">
        <div class="text-xl font-semibold text-blue-600 mb-4">{{ taskKey }}</div>
        <div class="text-sm text-gray-600 mb-3">
          Total Plays: {{ taskData.Task_Play_Count }}
        </div>

        <!-- Data Points Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div v-for="(point, pointKey) in taskData.Data_Points"
               :key="pointKey"
               class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
            <div class="font-medium text-blue-600 border-b pb-2 mb-3">Trial {{ pointKey }}</div>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between items-center py-1 border-b border-gray-50">
                <span class="text-gray-600">Level</span>
                <span class="font-medium">{{ point.Level }}</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-gray-50">
                <span class="text-gray-600">Accuracy</span>
                <span class="font-medium">{{ point.Steps_Accuracy }}%</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-gray-50">
                <span class="text-gray-600">Hints</span>
                <span class="font-medium">{{ point.Hints_Needed }}</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-gray-50">
                <span class="text-gray-600">Completion Time</span>
                <span class="font-medium">{{ point.Completion_Time }}</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-gray-50">
                <span class="text-gray-600">Retry Rate</span>
                <span class="font-medium">{{ point.Retry_Rate }}</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-gray-50">
                <span class="text-gray-600">Reaction Time</span>
                <span class="font-medium">{{ point.Reaction_Time }}</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-gray-50">
                <span class="text-gray-600">Error Recovery</span>
                <span class="font-medium">{{ point.Error_Recovery_Time }}</span>
              </div>
              <div class="flex justify-between items-center py-1">
                <span class="text-gray-600">Drop Off Step</span>
                <span class="font-medium">{{ point.Drop_Off_Step }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!dataMatrixStore.tasks.length" class="text-gray-500 text-sm">
        No data found.
      </div>
    </div>
  </div>
</template>