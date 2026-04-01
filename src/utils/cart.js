import api from "../services/api";

const triggerCartUpdate = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getGuestCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

const saveGuestCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  triggerCartUpdate();
};

export const getCart = async () => {
  const user = getCurrentUser();

  if (!user) {
    return getGuestCart();
  }

  const response = await api.get(`/cart/${user.id}`);

  return response.data
    .filter((item) => item.product)
    .map((item) => ({
      cart_item_id: item.id,
      ...item.product,
      quantity: item.quantity,
    }));
};

export const addToCart = async (product, quantity = 1) => {
  const user = getCurrentUser();

  if (!user) {
    const cart = getGuestCart();
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    saveGuestCart(cart);
    return;
  }

  await api.post("/cart", {
    user_id: user.id,
    product_id: product.id,
    quantity,
  });

  triggerCartUpdate();
};

export const removeFromCart = async (id) => {
  const user = getCurrentUser();

  if (!user) {
    const cart = getGuestCart().filter((item) => item.id !== id);
    saveGuestCart(cart);
    return;
  }

  await api.delete(`/cart/${id}`);
  triggerCartUpdate();
};

export const updateQuantity = async (id, quantity) => {
  if (quantity < 1) return;

  const user = getCurrentUser();

  if (!user) {
    const cart = getGuestCart()
      .map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item,
      )
      .filter((item) => item.quantity > 0);

    saveGuestCart(cart);
    return;
  }

  await api.put(`/cart/${id}`, { quantity });
  triggerCartUpdate();
};

export const clearCart = async () => {
  const user = getCurrentUser();

  if (!user) {
    localStorage.removeItem("cart");
    triggerCartUpdate();
    return;
  }

  await api.delete(`/cart/clear/${user.id}`);
  triggerCartUpdate();
};