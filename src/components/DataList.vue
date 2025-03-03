<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import {useDataMatrixStore} from "@/stores/dataMatrixStore.js";
import UserForm from '@/components/users/UserForm.vue'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2'
import {
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline'
import {useRouter} from "vue-router";


const toast = useToast()
const showForm = ref(false)
const editingUser = ref(null)
const userStore = useUserStore()
const dataMatrixStore = useDataMatrixStore()
const router = useRouter()

onMounted(() => {
  userStore.fetchUsers()
})

const handleEdit = (user) => {
  editingUser.value = user
  showForm.value = true
}

const handleDelete = async (user) => {
  try {
    const result = await Swal.fire({
      title: 'Delete User',
      text: `Are you sure you want to delete the user named ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      await userStore.deleteUser(user.id)
      toast.success('User deleted successfully')
    }
  } catch (error) {
    toast.error("Delete operation failed: " + error.message)
  }
}

const selectedUser = ref(null)
const showDataMatrix = ref(false)

const handleUserClick = (user) => {
  router.push(`/user-matrix/${user.id}`)
  // console.log(router)
}

</script>

<template>
  <div class="p-4 md:p-6 bg-gray-50 min-h-screen">
    <!-- Üst başlık ve buton -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <h1 class="text-xl md:text-2xl font-bold text-gray-800">User Management</h1>
      <button
          @click="showForm = true; editingUser = null"
          class="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors duration-200"
      >
        <UserPlusIcon class="w-5 h-5" />
        <span>Add New User</span>
      </button>
    </div>

    <!-- Loading Durumu -->
    <div v-if="userStore.isLoading" class="text-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
    </div>

    <!-- Error Durumu -->
    <div v-else-if="userStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline"> {{ userStore.error }}</span>
    </div>

    <!-- Kullanıcı Listesi -->
    <div v-if="userStore.users.length === 0" class="col-span-full text-center py-8 text-gray-500">
      No users found.
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="user in userStore.users"
           :key="user.id"
           @click="handleUserClick(user)"
           class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
            {{ user.name.charAt(0).toUpperCase() }}
          </div>
          <div class="ml-4">
            <div class="text-lg font-medium text-gray-900">{{ user.name }}</div>
            <div class="text-sm text-gray-500">{{ user.email }}</div>
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <button
              @click.stop="handleEdit(user)"
              class="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors duration-200"
              title="Edit"
          >
            <PencilSquareIcon class="w-4 h-4 mr-1" />
            Edit
          </button>
          <button
              @click.stop="handleDelete(user)"
              class="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors duration-200"
              title="Delete"
          >
            <TrashIcon class="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Kullanıcı Form Modal -->
    <UserForm
        v-if="showForm"
        :is-edit="!!editingUser"
        :user-data="editingUser"
        @close="showForm = false"
    />
  </div>
</template>
