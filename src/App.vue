<template>
  <div id="app">
    <img width="120" src="https://icon-library.com/images/order-icon/order-icon-28.jpg" />
    <div class="grid" @click="handleStatusId">
      <OrderCard
        v-for="order in orders"
        :img="handleProductImg(order.productId)"
        :title="handleProductTitle(order.productId)"
        :price="handleProductPrice(order.productId)"
        :count="order.count"
        :status="handleStatusId(order.statusId)"
        :key="order.id"
        @remove="removeOrderById(order.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  // Services
  import StatusService from "@/services/status.service";
  import ProductService from "@/services/product.service";
  import OrderService from "@/services/order.service";
  // Dto
  import { Order } from "@/dto/api";
  // @Components
  import OrderCard from "@/components/OrderCard.vue";

  @Component({
    components: {
      OrderCard,
    },
  })
  export default class App extends Vue {
    private orders: Order[] = [];
    async mounted() {
      await StatusService.init();
      await ProductService.init();
      this.orders = await OrderService.getAllOrders();
    }
    handleStatusId(id: number) {
      return StatusService.getStatusById(id);
    }
    handleProductImg(id: number) {
      return ProductService.getProductById(id).photoUrl;
    }
    handleProductTitle(id: number) {
      return ProductService.getProductById(id).name;
    }
    handleProductPrice(id: number) {
      return ProductService.getProductById(id).price;
    }
    removeOrderById(id: number) {
      console.log(id);

      return ProductService.getProductById(id).price;
    }
  }
</script>

<style lang="scss">
  #app {
    text-align: center;
    color: #2c3e50;
    margin-top: 1rem;
  }
  .grid {
    max-width: 700px;
    margin: 0 auto;
    margin-top: 1rem;
  }
</style>
