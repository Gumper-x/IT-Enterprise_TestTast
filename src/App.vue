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
    <BaseModal v-if="orderModal" @close="toggleOrderModal">
      dfdf
    </BaseModal>
    <el-button class="create-button" type="primary" @click="toggleOrderModal">Добавить Заказ</el-button>
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
  // Components
  import OrderCard from "@/components/OrderCard.vue";
  import BaseModal from "@/components/UI-Kit/BaseModal.vue";

  @Component({
    components: {
      OrderCard,
      BaseModal,
    },
  })
  export default class App extends Vue {
    private orders: Order[] = [];
    private orderModal = false;
    async mounted() {
      await StatusService.init();
      await ProductService.init();
      this.orders = await OrderService.getAllOrders();
    }
    toggleOrderModal() {
      this.orderModal = !this.orderModal;
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
    async removeOrderById(id: number) {
      await OrderService.removeOrderById(id);
      this.orders = this.orders.filter((item) => {
        return item.id !== id;
      });
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
  .create-button {
    position: fixed;
    right: 2.5vh;
    bottom: 2vh;
  }
</style>
