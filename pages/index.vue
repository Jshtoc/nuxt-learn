<!-- eslint-disable no-console -->
<template>
  <div class="app">
    <main>
      <div>
        <SearchInput
          v-model="searchKeyword"
          :search-keyword="searchKeyword"
          @search="searchProducts()"
        ></SearchInput>
      </div>
      <ul>
        <li v-for="product in products" :key="product.id" class="item flex" @click="moveToDetailPage(product.id)">
          <img class="product-image" :src="product.imageUrl" :alt="product.name" />
          <p>{{ product.name }}</p>
          <span>￦{{ product.price }}</span>
        </li>
      </ul>
      <div class="cart-wrapper">
        <button class="btn" @click="moveToCartpage">장바구니 바로가기</button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import SearchInput from '@/components/SearchInput.vue';
import { fetchProductsByKeyword } from '~/api';

export default {
  components: { SearchInput },

  async asyncData() {
    const response = await axios.get('http://localhost:3000/products');
    const products = response.data.map(item => ({
      ...item,
      imageUrl: `${item.imageUrl}?random=${Math.random()}`
    }));
    return { products }
  },
  data: () => ({
    searchKeyword: '',
  }),

  methods: {
    moveToDetailPage(id) {
      this.$router.push(`detail/${id}`)
    },
    async searchProducts() {
      const response = await fetchProductsByKeyword(this.searchKeyword);
      // eslint-disable-next-line no-console
      console.log(response.data);
      this.products = response.data.map(item => ({
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`
      }));
    },
    moveToCartpage() {
      this.$router.push('/cart')
    }
  },
  // data: () => ({
  //   products : []
  // }),
  // async created() {
  //   const response = await axios.get('http://localhost:3000/products');
  //   // eslint-disable-next-line no-console
  //   console.log(response);
  //   this.products = response.data
  // }
};
</script>



<style scoped>
p{
  margin: 0;
  padding: 0;
}
.flex {
  display: flex;
  justify-content: center;
}
.item {
  display: inline-block;
  width: 400px;
  height: 300px;
  text-align: center;
  margin: 0 0.5rem;
  cursor: pointer;
}
.product-image {
  width: 400px;
  height: 250px;
}
.app {
  position: relative;
}
.cart-wrapper {
  position: sticky;
  float: right;
  bottom: 50px;
  right: 50px;
}
.cart-wrapper .btn {
  display: inline-block;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
}
</style>