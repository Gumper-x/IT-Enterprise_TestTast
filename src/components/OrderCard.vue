<template>
  <div class="order-card">
    <img class="order-card__img" :src="getProduct.photoUrl" alt="Product-preview" />
    <div class="order-card__title">
      <el-select v-if="editable" v-model="form.productId" placeholder="Товар">
        <el-option v-for="product in products" :key="product.id" :label="product.name" :value="product.id"></el-option>
      </el-select>
      <template v-else>
        {{ getProduct.name }}
      </template>
    </div>
    <el-select v-if="editable" v-model="form.statusId" placeholder="Товар">
      <el-option v-for="status in statuses" :key="status.id" :label="status.name" :value="status.id"></el-option>
    </el-select>
    <el-tag v-else class="order-card__status" :type="getStatusType">{{ getStatus }}</el-tag>
    <ul class="order-card__spec">
      <li>
        Цена:
        <span>${{ getProduct.price }}</span>
      </li>
      <li>
        Количевство:
        <span>
          <el-input-number v-if="editable" v-model="form.count" type="number" :min="1" />
          <template v-else>{{ count }} шт.</template>
        </span>
      </li>
      <li>
        Сумма:
        <span>${{ getTatalPrice }}</span>
      </li>
    </ul>
    <div class="order-card__operation">
      <el-button v-if="editable" class="order-card__edit" size="small" type="success" icon="el-icon-check" @click="submitChanges">
        Сохранить
      </el-button>
      <el-button v-else class="order-card__edit" size="small" type="info" plain icon="el-icon-edit" @click="toggleEditeble">
        Изменить
      </el-button>
      <el-popconfirm
        confirm-button-text="Да"
        cancel-button-text="Нет"
        icon="el-icon-delete"
        icon-color="red"
        title="Подтвердите удаление заказа"
        @confirm="$emit('remove')"
      >
        <el-button class="order-card__remove" type="danger" slot="reference" size="small">Удалить</el-button>
      </el-popconfirm>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Emit, Vue } from "vue-property-decorator";
  // Vuex
  import ProductModule from "@/store/modules/product";
  import StatusModule from "@/store/modules/status";
  // Dto
  import { Product, Status } from "@/dto/api";

  @Component
  export default class OrderCard extends Vue {
    @Prop({ default: 0 }) readonly count!: number;
    @Prop({ required: true }) readonly statusId!: number;
    @Prop({ required: true }) readonly productId!: number;

    private editable = false;
    private products: Product[] = ProductModule.products;
    private statuses: Status[] = StatusModule.statuses;
    private form = {
      productId: this.productId,
      statusId: this.statusId,
      count: this.count,
    };

    get getProduct(): Product {
      return ProductModule.getProductById(this.productId);
    }
    get getStatus(): string {
      return StatusModule.getStatusById(this.statusId);
    }
    get getTatalPrice(): number {
      return this.getProduct.price * this.count;
    }
    get getStatusType(): string {
      switch (this.getStatus) {
        case "Новый":
          return "danger";
        case "Подтвержден":
          return "warning";
        case "Отгрузка":
          return "warning";
        case "Обработка":
          return "primary";
        case "Доставка":
          return "success";
        case "Выполнен":
          return "success";
        default:
          return "info";
      }
    }
    toggleEditeble() {
      this.editable = !this.editable;
    }
    @Emit("changes")
    submitChanges() {
      this.editable = false;
      return this.form;
    }
  }
</script>

<style lang="scss" scoped>
  .order-card {
    display: grid;
    grid-template-areas:
      "img img title title title status"
      "img img spec spec . ."
      "img img spec spec operation operation";
    grid-template-rows: 40px 1fr 40px;
    align-items: center;
    justify-items: center;
    grid-auto-rows: 100px;
    padding: 10px;
    border: 1px solid rgba(87, 87, 87, 0.1);
    border-radius: 10px;
    margin: 0.7rem;
    transition: box-shadow 0.2s ease-in-out;
    &:hover {
      box-shadow: 0 0 10px rgba(37, 37, 37, 0.1);
    }
    &__img {
      grid-area: img;
      width: 100%;
      max-width: 135px;
    }
    &__title {
      grid-area: title;
      padding: 6px 8px;
      border-radius: 4px;
      width: 100%;
      background: rgba(153, 153, 153, 0.1);
    }
    &__status {
      grid-area: status;
    }
    &__spec {
      grid-area: spec;
      padding: 0.5rem;
      padding-top: 1rem;
      width: 100%;
      li {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        margin: 0.6rem 0;
        width: 100%;
      }
    }
    &__operation {
      grid-area: operation;
      justify-self: end;
      margin-right: 10px;
    }
    &__edit {
      margin-right: 6px;
    }
    &__remove {
      grid-area: remove;
    }
  }
</style>
