import store from "@/store";
import { VuexModule, Module, Mutation, getModule, Action } from "vuex-module-decorators";
// Dto
import { Product } from "@/dto/api";
// Api
import Api from "@/api/";

@Module({ namespaced: true, name: "Products", store, dynamic: true })
class Products extends VuexModule {
  public productMap = new Map();
  public products: Product[] = [];

  @Mutation
  private SET_PRODUCT_MAP(product: Product) {
    this.productMap.set(product.id, product);
  }
  @Mutation
  private SET_PRODUCTS(products: Product[]) {
    this.products = products;
  }
  @Action
  async initProduct() {
    const ArrayProduct = await Api.getAllProducts();
    this.SET_PRODUCTS(ArrayProduct);
    for (const product of ArrayProduct) {
      this.SET_PRODUCT_MAP(product);
    }
  }
  get getProductById() {
    return (id: number): Product => {
      return this.productMap.get(id);
    };
  }
}
const ProductModule = getModule(Products);
export default ProductModule;
