<template>
  <div id="app">
    <img width="120" src="https://icon-library.com/images/order-icon/order-icon-28.jpg" />
    <div class="grid">
      <OrderCard></OrderCard>
      <OrderCard></OrderCard>
      <OrderCard></OrderCard>
      <OrderCard></OrderCard>
      <OrderCard></OrderCard>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  // Services
  import Api from "@/api/";
  // @Components
  import OrderCard from "@/components/OrderCard.vue";

  @Component({
    components: {
      OrderCard,
    },
  })
  export default class App extends Vue {
    async mounted() {
      console.log(await Api.getAllOrders());
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
