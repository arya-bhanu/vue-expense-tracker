import { useAuthStore } from '@/stores/supabase-client'
import { ref } from 'vue'

export default () => {
  const user_id = ref('')
  const currency = ref()
  const registerd_user_id = ref('')
  const useAuth = useAuthStore()

  async function processData() {
    try {
      const { data, error } = await useAuth.getUser()
      if (!data.user?.id || error) {
        throw new Error('user data not found' || error)
      }
      const { data: dataRegister, error: errorRegister } = await useAuth.checkRegisteredUser(
        data.user.id
      )
      if (!dataRegister || dataRegister.length === 0 || errorRegister) {
        throw new Error('User is not registered' || errorRegister)
      }
      user_id.value = data.user.id
      registerd_user_id.value = dataRegister[0].id
      currency.value = dataRegister[0].currency
    } catch (err) {
      console.error(err)
    }
  }
  processData()
  return { user_id, currency, registerd_user_id }
}
