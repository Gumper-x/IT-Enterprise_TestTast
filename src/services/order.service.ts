import Api from "@/api/";
// Dto
import { Order } from "@/dto/api";

class OrderService {
  async getAllOrders() {
    // const ArrayOrder = await Api.getAllOrders();
    // const ArrayOrderSliced = ArrayOrder.slice(0, 4);
    // console.log(ArrayOrderSliced);
    return await Api.getAllOrders();
  }
}
export default new OrderService();
