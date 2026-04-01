import api from "../services/api";

const triggerWishlistUpdate = () => {
  window.dispatchEvent(new Event("wishlistUpdated"));
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getWishlist = async () => {
  const user = getCurrentUser();

  if (!user) return [];

  const response = await api.get(`/wishlist/${user.id}`);
  return response.data.map((item) => item.product).filter(Boolean);
};

export const isInWishlist = async (productId) => {
  const wishlist = await getWishlist();
  return wishlist.some((item) => item.id === productId);
};

export const toggleWishlist = async (product) => {
  const user = getCurrentUser();

  if (!user) {
    throw new Error("Please login first");
  }

  const exists = await isInWishlist(product.id);

  if (exists) {
    await api.delete("/wishlist", {
      data: {
        user_id: user.id,
        product_id: product.id,
      },
    });
  } else {
    await api.post("/wishlist", {
      user_id: user.id,
      product_id: product.id,
    });
  }

  triggerWishlistUpdate();
  return !exists;
};

export const removeFromWishlist = async (productId) => {
  const user = getCurrentUser();

  if (!user) return;

  await api.delete("/wishlist", {
    data: {
      user_id: user.id,
      product_id: productId,
    },
  });

  triggerWishlistUpdate();
};

export const clearWishlist = () => {
  triggerWishlistUpdate();
};