export const useCart = () => {
  const cart = useState('cart', () => new Map<number, number>())

  const addToCart = (productId: number, quantity: number = 1) => {
    const currentQuantity = cart.value.get(productId) || 0
    cart.value.set(productId, currentQuantity + quantity)
  }

  const removeFromCart = (productId: number, quantity: number = 1) => {
    const currentQuantity = cart.value.get(productId) || 0
    const newQuantity = currentQuantity - quantity
    
    if (newQuantity <= 0) {
      cart.value.delete(productId)
    } else {
      cart.value.set(productId, newQuantity)
    }
  }

  const getCartItemQuantity = (productId: number) => {
    return cart.value.get(productId) || 0
  }

  const getTotalItems = () => {
    let total = 0
    for (const quantity of cart.value.values()) {
      total += quantity
    }
    return total
  }

  const clearCart = () => {
    cart.value.clear()
  }

  const getCartItems = () => {
    return Array.from(cart.value.entries()).map(([productId, quantity]) => ({
      productId,
      quantity
    }))
  }

  return {
    cart: readonly(cart),
    addToCart,
    removeFromCart,
    getCartItemQuantity,
    getTotalItems,
    clearCart,
    getCartItems
  }
} 