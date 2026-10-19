function addToCart(cart, product, quantity) { 
  if(quantity <= 0) throw new RangeError('Не принимает нулевое количество');
  
  const productInCart = cart.find((item) => item.id === product.id);
  if(productInCart) {
    if((productInCart.quantity + quantity) > productInCart.stock) throw new RangeError('Не позволяет добавить больше товара, чем есть на складе');
  } else {
    if(quantity > product.stock) throw new RangeError('Не позволяет добавить больше товара, чем есть на складе');
    return [...cart, {...product, quantity: quantity}];
  }

  return cart.map(item => {
    if(item.id === product.id) {
      return { ...item, quantity: item.quantity + quantity };
    }
    return item;
  });
}

function changeQuantity(cart, id, quantity) { 
  if(quantity <= 0) throw new RangeError('Не принимает нулевое количество');

  const productInCart = cart.find((item) => item.id === id);
  if(!productInCart) return cart;
  if(quantity > productInCart.stock) throw new RangeError('Не позволяет указать количество больше остатка');

  return cart.map((item) => {
    if(item.id === id) {
      return {...item, quantity: quantity};
    }

    return item;
  });
}

function removeFromCart(cart, id) { 
  return cart.filter(item => {
    return item.id !== id;
  })
}

function calculateCartSubtotal(cart) { 
  return cart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity * currentItem.price;
  }, 0);
}

function calculateOrderTotal(cart, promoValue) { 
  const subtotal = calculateCartSubtotal(cart);
  const discount = (promoValue === 'SAVE10' && subtotal >= 20000) ? 0.1 : 0;
  const delivery = (subtotal < 50000) ? 30000 : 0;
  return {
    subtotal: subtotal,
    discount: subtotal * discount,
    delivery: delivery,
    total: subtotal - subtotal * discount + delivery
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
