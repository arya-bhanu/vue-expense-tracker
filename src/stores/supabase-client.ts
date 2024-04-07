import type { Currency } from '@/enums'
import { supabase } from '@/lib/supabaseClient'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const signInUser = async () => {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${import.meta.env.VITE_URL_CLIENT}/registration`
      }
    })
    return { error, data }
  }

  const getUser = async () => {
    const { error, data } = await supabase.auth.getUser()
    return { error, data }
  }

  const registerUser = async (userId: string, currency: Currency) => {
    const { data, error } = await supabase.from('user_data').insert({ user_id: userId, currency })
    return { data, error }
  }

  const checkRegisteredUser = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_data')
      .select('currency, id')
      .eq('user_id', userId)
    return { data, error }
  }

  return { signInUser, getUser, registerUser, checkRegisteredUser }
})

export const useStorageStore = defineStore('storage', () => {
  const uploadImage = async (path: string, fileBody: File) => {
    const { data, error } = await supabase.storage
      .from('expenses-image')
      .upload(path, fileBody, { contentType: 'image/*' })
    return { data, error }
  }
  const getSignedUrl = async (path: string) => {
    const { data, error } = await supabase.storage
      .from('expenses-image')
      .createSignedUrl(path, 60 * 60 * 24)
    return { data, error }
  }
  return { uploadImage, getSignedUrl }
})

export const useTransactionStore = defineStore('transaction', () => {
  const updateTransaction = async (
    id: number,
    titleTransaction: string,
    amount: number,
    expensesType: string,
    imgUrl?: string
  ) => {
    const { error } = await supabase
      .from('transaction_user')
      .update({
        title_transaction: titleTransaction,
        amount,
        expenses_type: expensesType,
        img_url: imgUrl
      })
      .eq('id', id)
    return error
  }
  const createTransaction = async (
    userDataId: number,
    titleTransaction: string,
    amount: number,
    expensesType: string,
    imgUrl?: string
  ) => {
    const { error } = await supabase.from('transaction_user').insert({
      user_data_id: userDataId,
      title_transaction: titleTransaction,
      amount,
      expenses_type: expensesType,
      img_url: imgUrl
    })
    return error
  }
  const selectAllTransaction = async (userRegisteredId: number) => {
    const { data: rowTransaction, error: errorTransaction } = await supabase
      .from('transaction_user')
      .select()
      .eq('user_data_id', userRegisteredId)

    const { data: sumTransaction, error: errorSumTransaction } = await supabase.rpc(
      'sum_amount_transaction',
      {
        id_input: userRegisteredId
      }
    )
    return { rowTransaction, errorTransaction, sumTransaction, errorSumTransaction }
  }
  return { createTransaction, selectAllTransaction, updateTransaction }
})
