<template>
  <div class="order-card" shadow="hover">
    <img
      class="order-card__img"
      src="https://www.apple.com/v/iphone/compare/n/images/overview/all_models_iphone11_pro__ejujupnldouq_large.jpg"
      alt="Product-preview"
    />
    <div class="order-card__title">iPhone 11 Pro Max</div>
    <el-tag class="order-card__status" type="success">Потверждён</el-tag>
    <ul class="order-card__spec">
      <li>
        Цена:
        <span>200</span>
      </li>
      <li>
        Количевство:
        <span>5 шт.</span>
      </li>
      <li>
        Сумма:
        <span>$1500</span>
      </li>
    </ul>
    <div class="order-card__operation">
      <el-button class="order-card__edit" size="small">Изменить</el-button>
      <el-button class="order-card__remove" type="danger" size="small">Удалить</el-button>
    </div>
  </div>
</template>

<script>
  export default {};
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
      max-width: 140px;
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
