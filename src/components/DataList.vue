<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import UserForm from '@/components/users/UserForm.vue'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2'
import {
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline'

const toast = useToast()
const userStore = useUserStore()
const showForm = ref(false)
const editingUser = ref(null)

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
      title: 'Emin misiniz?',
      text: `${user.name} isimli kullanıcıyı silmek istediğinize emin misiniz?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, Sil',
      cancelButtonText: 'İptal',
      background: '#fff',
      borderRadius: '0.5rem',
      customClass: {
        popup: 'rounded-lg',
        title: 'text-lg font-bold text-gray-800',
        htmlContainer: 'text-gray-600'
      }
    })

    if (result.isConfirmed) {
      await userStore.deleteUser(user.id)

      Swal.fire({
        title: 'Silindi!',
        text: 'Kullanıcı başarıyla silindi.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#fff',
        borderRadius: '0.5rem',
        customClass: {
          popup: 'rounded-lg'
        }
      })
    }
  } catch (error) {
    toast.error("Silme işlemi başarısız: " + error.message)
  }
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Üst Başlık ve Ekleme Butonu -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Kullanıcı Yönetimi</h1>
      <button
          @click="showForm = true; editingUser = null"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors duration-200"
      >
        <UserPlusIcon class="w-5 h-5" />
        <span>Yeni Kullanıcı Ekle</span>
      </button>
    </div>

    <!-- Loading Durumu -->
    <div v-if="userStore.isLoading" class="text-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
    </div>

    <!-- Error Durumu -->
    <div v-else-if="userStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <strong class="font-bold">Hata!</strong>
      <span class="block sm:inline"> {{ userStore.error }}</span>
    </div>

    <!-- Kullanıcı Listesi -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Kullanıcı
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            İşlemler
          </th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="user in userStore.users" :key="user.id" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {{ user.name.charAt(0).toUpperCase() }}
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">
                  {{ user.name }}
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ user.email }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right">
            <div class="flex items-center justify-end gap-3">
              <button
                  @click="handleEdit(user)"
                  class="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded-full transition-colors duration-200"
                  title="Düzenle"
              >
                <PencilSquareIcon class="w-5 h-5" />
              </button>
              <button
                  @click="handleDelete(user)"
                  class="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded-full transition-colors duration-200"
                  title="Sil"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
        <!-- Veri yoksa gösterilecek mesaj -->
        <tr v-if="userStore.users.length === 0">
          <td colspan="3" class="px-6 py-4 text-center text-gray-500">
            Henüz kullanıcı bulunmamaktadır.
          </td>
        </tr>
        </tbody>
      </table>
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
