import store from "@/store";
import { VuexModule, Module, Mutation, getModule, Action } from "vuex-module-decorators";
// Dto
import { Product } from "@/dto/api";
// Api
import Api from "@/api/";

@Module({ namespaced: true, name: "Products", store, dynamic: true })
class Products extends VuexModule {
  public productMap = new Map();

  @Mutation
  private SET_PRODUCT_MAP(product: Product) {
    this.productMap.set(product.id, product);
  }
  @Action
  async initProduct() {
    const ArrayProduct = await Api.getAllProducts();
    for (const product of ArrayProduct) {
      this.SET_PRODUCT_MAP(product);
    }
  }
  get getProductById() {
    return (id: number) => {
      return this.productMap.get(id);
    };
  }
}
const ProductModule = getModule(Products);
export default ProductModule;
