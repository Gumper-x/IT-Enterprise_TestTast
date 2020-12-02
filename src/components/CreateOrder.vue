<template>
  <div class="create-order" shadow="hover">
    <el-select v-model="productSelected" placeholder="Товар">
      <el-option v-for="product in products" :key="product.id" :label="product.name" :value="product.id"></el-option>
    </el-select>

    <div class="create-order__count">
      Количество:
      <span><el-input-number v-model="productCount" type="number" :min="1" /></span>
    </div>

    <el-button class="order-card__add" size="small" type="success" icon="el-icon-circle-plus-outline" @click="addProduct">
      Добавить
    </el-button>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Vue } from "vue-property-decorator";
  // Vuex
  import ProductModule from "@/store/modules/product";
  // Dto
  import { Product } from "@/dto/api";
  @Component
  export default class OrderCard extends Vue {
    private productSelected = 1;
    private productCount = 1;
    private products: Product[] = ProductModule.products;
    @Emit("submit")
    addProduct() {
      return {
        productId: this.productSelected,
        count: this.productCount,
      };
    }
  }
</script>

<style lang="scss" scoped>
  .create-order {
    padding: 10px;
    border: 1px solid rgba(87, 87, 87, 0.1);
    border-radius: 10px;
    margin: 0.7rem;
    transition: box-shadow 0.2s ease-in-out;
    &:hover {
      box-shadow: 0 0 10px rgba(37, 37, 37, 0.1);
    }
    &__title {
      grid-area: title;
      padding: 6px 8px;
      border-radius: 4px;
      width: 100%;
      background: rgba(153, 153, 153, 0.1);
    }
    &__count {
      margin: 1rem 0;
    }
  }
</style>
