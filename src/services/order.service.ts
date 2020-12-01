import axios from "axios";
import { Product } from "./order";

class OrderService {
  getAllProducts(): Promise<Product[]> {
    return axios.get("products");
  }
}
export default new OrderService();
