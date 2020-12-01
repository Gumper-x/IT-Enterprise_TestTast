<template>
  <div class="order-card" shadow="hover">
    <img class="order-card__img" :src="img" alt="Product-preview" />
    <div class="order-card__title">{{ title }}</div>
    <el-tag class="order-card__status" :type="getStatusType">{{ status }}</el-tag>
    <ul class="order-card__spec">
      <li>
        Цена:
        <span>${{ price }}</span>
      </li>
      <li>
        Количевство:
        <span>{{ count }} шт.</span>
      </li>
      <li>
        Сумма:
        <span>${{ getTatalPrice }}</span>
      </li>
    </ul>
    <div class="order-card__operation">
      <el-button class="order-card__edit" size="small" type="info" plain icon="el-icon-edit">Изменить</el-button>
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
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component
  export default class OrderCard extends Vue {
    @Prop({ default: "Отсутствует" }) readonly title!: string;
    @Prop({ default: 0 }) readonly price!: number;
    @Prop({ default: 0 }) readonly count!: number;
    @Prop({ default: "Неизвестно" }) readonly status!: string;
    @Prop({ default: "" }) readonly img!: string;
    get getTatalPrice(): number {
      return this.price * this.count;
    }
    get getStatusType(): string {
      switch (this.status) {
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
      grid-area: edit;
    }
    &__remove {
      grid-area: remove;
    }
  }
</style>
