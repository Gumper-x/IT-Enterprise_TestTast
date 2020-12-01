import Api from "@/api/";
// Dto
import { Product } from "@/dto/api";

class ProductService {
  private productMap = new Map();

  async init(): Promise<void> {
    const ArrayProduct = await Api.getAllProducts();
    for (const product of ArrayProduct) {
      this.productMap.set(product.id, product);
    }
  }
  getProductById(id: number): Product {
    return this.productMap.get(id);
  }
}
export default new ProductService();
