<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import { useToast } from 'vue-toastification'

const toast = useToast()
const userStore = useUserStore()

const props = defineProps({
  isEdit: Boolean,
  userData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close'])

const form = ref({
  name: props.userData?.name || '',
  email: props.userData?.email || ''
})

const errors = ref({
  name: '',
  email: ''
})

const isLoading = ref(false)

const validateName = () => {
  if (!form.value.name) {
    errors.value.name = 'Ad Soyad alanı zorunludur'
    return false
  }
  if (form.value.name.length < 3) {
    errors.value.name = 'Ad Soyad en az 3 karakter olmalıdır'
    return false
  }
  errors.value.name = ''
  return true
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email) {
    errors.value.email = 'Email alanı zorunludur'
    return false
  }
  if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Geçerli bir email adresi giriniz'
    return false
  }
  errors.value.email = ''
  return true
}

const isFormValid = computed(() => {
  return validateName() && validateEmail()
})

const handleSubmit = async () => {
  if (!isFormValid.value) {
    validateName()
    validateEmail()
    toast.error("Lütfen form alanlarını kontrol ediniz!")
    return
  }

  try {
    isLoading.value = true
    if (props.isEdit) {
      await userStore.updateUser(props.userData.id, {
        name: form.value.name,
        email: form.value.email
      })
      toast.success("Kullanıcı başarıyla güncellendi!")
    } else {
      await userStore.addUser({
        name: form.value.name,
        email: form.value.email
      })
      toast.success("Kullanıcı başarıyla eklendi!")
    }
    emit('close')
  } catch (error) {
    toast.error("Bir hata oluştu: " + error.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4 z-50">
    <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
      <!-- Modal Başlık -->
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ isEdit ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle' }}
        </h2>
        <button
            @click="emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Ad Soyad Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ad Soyad
          </label>
          <input
              type="text"
              v-model="form.name"
              @blur="validateName"
              :class="[
              'w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all duration-200',
              errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            ]"
              placeholder="John Doe"
          >
          <p v-if="errors.name" class="mt-1 text-sm text-red-600">
            {{ errors.name }}
          </p>
        </div>

        <!-- Email Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
              type="email"
              v-model="form.email"
              @blur="validateEmail"
              :class="[
              'w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all duration-200',
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            ]"
              placeholder="ornek@email.com"
          >
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">
            {{ errors.email }}
          </p>
        </div>

        <!-- Form Butonları -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
              type="button"
              @click="emit('close')"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            İptal
          </button>
          <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              :class="[
              'px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200',
              isLoading || !isFormValid
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
            ]"
          >
            <span v-if="isLoading">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Kaydediliyor...
            </span>
            <span v-else>
              {{ isEdit ? 'Güncelle' : 'Kaydet' }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
