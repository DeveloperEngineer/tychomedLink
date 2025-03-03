import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, getDocs, doc } from 'firebase/firestore'
import { db } from '@/firebase/config.js'

export const useDataMatrixStore = defineStore('dataMatrix', () => {
    const tasks = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const fetchTasks = async () => {
        isLoading.value = true
        error.value = null
        try {
            const querySnapshot = await getDocs(collection(db, 'Data Matrix'))
            tasks.value = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            isLoading.value = false
        }
    }



    return {
        tasks,
        isLoading,
        error,
        fetchTasks
    }
})