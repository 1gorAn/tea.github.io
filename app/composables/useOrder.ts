import { ref } from 'vue'

interface OrderDetails {
  recipientName: string
  phone: string
  totalPrice: number
  items: any[]
}

const currentOrder = ref<OrderDetails | null>(null)

export const useOrder = () => {
  const setOrderDetails = (details: OrderDetails) => {
    currentOrder.value = details
  }

  const getOrderDetails = () => {
    return currentOrder.value
  }

  const clearOrder = () => {
    currentOrder.value = null
  }

  return {
    setOrderDetails,
    getOrderDetails,
    clearOrder
  }
} 