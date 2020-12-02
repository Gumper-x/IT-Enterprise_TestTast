<template>
  <div id="app">
    <img width="120" src="https://icon-library.com/images/order-icon/order-icon-28.jpg" />
    <div class="grid">
      <OrderCard
        v-for="order in orders"
        :productId="order.productId"
        :count="order.count"
        :statusId="order.statusId"
        :key="order.id"
        @changes="handleChangeOrder($event, order.id)"
        @remove="removeOrderById(order.id)"
      />
    </div>
    <BaseModal v-if="orderModal" title="Создание Заказа" @close="toggleOrderModal">
      <CreateOrder @submit="createProduct" />
    </BaseModal>
    <el-button class="create-button" type="primary" @click="toggleOrderModal">Добавить Заказ</el-button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  // Vuex
  import ProductModule from "@/store/modules/product";
  import StatusModule from "@/store/modules/status";
  // Services
  import OrderService from "@/services/order.service";
  // Dto
  import { Order } from "@/dto/api";
  // Components
  import OrderCard from "@/components/OrderCard.vue";
  import CreateOrder from "@/components/CreateOrder.vue";
  import BaseModal from "@/components/UI-Kit/BaseModal.vue";

  @Component({
    components: {
      OrderCard,
      CreateOrder,
      BaseModal,
    },
  })
  export default class App extends Vue {
    private orders: Order[] = [];
    private orderModal = false;
    async mounted() {
      // init Products
      await ProductModule.initProduct();
      await StatusModule.initProduct();
      // init Service
      this.orders = await OrderService.getAllOrders();
    }
    // Toggle Modal
    toggleOrderModal() {
      this.orderModal = !this.orderModal;
    }
    // Create Order
    createProduct(value: Order) {
      OrderService.createOrder(value).then((res) => {
        this.toggleOrderModal();
        this.orders.push(res);
      });
    }
    // Remove Order
    async removeOrderById(id: number) {
      await OrderService.removeOrderById(id);
      this.orders = this.orders.filter((item) => {
        return item.id !== id;
      });
    }
    handleChangeOrder(value: Order, orderId: number) {
      const dataOrder = {
        ...value,
        id: orderId,
      };
      OrderService.updateOrder(dataOrder).then((res) => {
        const foundIndex = this.orders.findIndex((item) => item.id == res.id);
        this.$set(this.orders, foundIndex, res);
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
