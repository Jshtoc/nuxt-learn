import { fetchCartItems } from "~/api";

// constants
export const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS';

export const state = () => ({
  cartItems: [],
})

export const mutations = {
  addItemToCart(state, cartItem) {
    const newCartItem = {
      ...cartItem,
      imageUrl: `${cartItem.imageUrl}?random=${Math.random()}`
    }
    // 배열이기 때문에 push
    state.cartItems.push(newCartItem)
  },
  setCartItems(state, cartItems) {
    state.cartItems = cartItems
  },
  clearCartItems(state) {
    state.cartItems = []
  }
}



export const actions = {
  async [FETCH_CART_ITEMS]({ commit }) {
    const { data } = await fetchCartItems();
    // eslint-disable-next-line no-console
    commit('setCartItems', data.map(item => ({
      ...item,
      imageUrl: `${item.imageUrl}?random=${Math.random()}`
    })))
  },
  async nuxtServerInit(storeContext, nuxtContext) {
    const { data } = await fetchCartItems();
    // eslint-disable-next-line no-console
    storeContext.commit('setCartItems', data.map(item => ({
      ...item,
      imageUrl: `${item.imageUrl}?random=${Math.random()}`
    })))
  }
}