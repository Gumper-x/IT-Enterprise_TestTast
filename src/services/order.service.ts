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
}
export default new OrderService();
