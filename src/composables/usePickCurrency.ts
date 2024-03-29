import { Currency } from '@/enums'
import { computed } from 'vue'

const usePickCurrency = (currency: Currency) => {
  const currencySymbol = computed(() => {
    switch (currency) {
      case Currency.IDR:
        return 'Rp.'
      case Currency.USD:
        return '$'
      default:
        return 'Rp.'
    }
  })
  return currencySymbol
}

export default usePickCurrency
