import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const signInUser = async () => {
    const { error, data } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    return { error, data }
  }
  const getUser = async () => {
    const { error, data } = await supabase.auth.getUser()
    return { error, data }
  }
  return { signInUser, getUser }
})

export const useStorageStore = defineStore('storage', () => {
  const uploadImage = async (path: string, fileBody: any) => {
    const { data, error } = await supabase.storage
      .from('expenses-image')
      .upload(path, fileBody, { contentType: 'image/*' })
    return { data, error }
  }
  return { uploadImage }
})
