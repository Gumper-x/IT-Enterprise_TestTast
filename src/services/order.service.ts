import Api from "@/api/";
// Dto
import { Order } from "@/dto/api";

class OrderService {
  async getAllOrders() {
    return await Api.getAllOrders();
  }
  removeOrderById(id: number): Promise<Order | string> {
    return Api.removeOrder(id);
  }
  createOrder(value: Order): Promise<Order> {
    return Api.createOrder(value);
  }
}
export default new OrderService();
