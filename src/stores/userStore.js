import {defineStore} from "pinia";
import {ref} from "vue";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config.js'

export const useUserStore = defineStore('user', () => {
    const users = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'users'))
            users.value = querySnapshot.docs.map(doc => ({
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

    // Kullanıcı ekle
    const addUser = async (userData) => {
        isLoading.value = true
        error.value = null
        try {
            const docRef = await addDoc(collection(db, 'users'), userData)
            await fetchUsers()
            return docRef.id
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const updateUser = async (userId, userData) => {
        isLoading.value = true
        error.value = null
        try {
            await updateDoc(doc(db, 'users', userId), userData)
            await fetchUsers()
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const deleteUser = async (userId) => {
        isLoading.value = true
        error.value = null
        try {
            await deleteDoc(doc(db, 'users', userId))
            await fetchUsers()
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return {
        users,
        isLoading,
        error,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser
    }
})
