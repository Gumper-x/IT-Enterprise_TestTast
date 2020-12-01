import axios from "axios";
import { Product, Status, Order } from "./dto";

class Api {
  async getAllProducts(): Promise<Product[]> {
    return (await axios.get("products")).data;
  }
  async getAllStatuses(): Promise<Status[]> {
    return (await axios.get("statuses")).data;
  }
  async getAllOrders(): Promise<Order[]> {
    return (await axios.get("orders")).data;
  }
}
export default new Api();
