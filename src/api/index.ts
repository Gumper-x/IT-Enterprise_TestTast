import axios from "axios";
import { Product, Status, Order } from "@/dto/api";

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
  async removeOrder(id: number): Promise<Order | string> {
    return (await axios.post(`orders/delete/${id}`)).data;
  }
  async createOrder(value: Order): Promise<Order> {
    return (await axios.post("orders/add", value)).data;
  }
  async updateOrder(value: Order): Promise<Order> {
    return (await axios.post("orders/update", value)).data;
  }
}
export default new Api();
